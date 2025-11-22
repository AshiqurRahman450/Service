// src/app/api/razorpay/verify-payment/route.ts
import { NextResponse } from "next/server";

/** Helper: convert ArrayBuffer -> hex string (lowercase) */
function hexFromBuffer(buf: ArrayBuffer) {
  const u8 = new Uint8Array(buf);
  return Array.from(u8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256HexWebCrypto(secret: string, payload: string) {
  const enc = new TextEncoder();
  const subtle = (globalThis as any).crypto?.subtle as SubtleCrypto | undefined;
  if (!subtle) throw new Error("WebCrypto SubtleCrypto not available");

  const key = await subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await subtle.sign("HMAC", key, enc.encode(payload));
  return hexFromBuffer(sigBuf as ArrayBuffer);
}

/** Node (server) fallback — dynamic import so it works in ESM environments */
async function hmacSha256HexNode(secret: string, payload: string) {
  // dynamic import avoids `require` / CJS vs ESM issues in Next.js
  const nodeCrypto = await import("crypto");
  return nodeCrypto.createHmac("sha256", secret).update(payload).digest("hex");
}

async function computeHmacHex(secret: string, payload: string) {
  // prefer WebCrypto (Edge or Node with globalThis.crypto.subtle)
  try {
    if (typeof (globalThis as any)?.crypto?.subtle !== "undefined") {
      return await hmacSha256HexWebCrypto(secret, payload);
    }
  } catch (e) {
    // fall through to Node fallback
    console.warn("[computeHmacHex] webcrypto path failed, falling back to node crypto:", (e as Error).message);
  }

  // Node fallback
  try {
    return await hmacSha256HexNode(secret, payload);
  } catch (e) {
    throw new Error("No suitable crypto available in this runtime to compute HMAC");
  }
}

export async function POST(req: Request) {
  try {
    // Read raw text body (we need exact raw payload for many signature schemes)
    let rawBody = "";
    try {
      rawBody = await req.text();
    } catch (e) {
      console.error("[verify-payment] unable to read request body:", (e as Error).message);
      return NextResponse.json({ ok: false, message: "Unable to read request body" }, { status: 400 });
    }

    // Try to parse JSON but proceed even if parsing fails (we keep rawBody)
    let body: any = {};
    try {
      if (rawBody) body = JSON.parse(rawBody);
    } catch (parseErr) {
      console.warn("[verify-payment] failed to parse JSON body; using rawBody for debug");
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.warn("[verify-payment] missing fields:", { razorpay_order_id, razorpay_payment_id, razorpay_signature });
      return NextResponse.json({ ok: false, message: "Missing required payment fields" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error("[verify-payment] RAZORPAY_KEY_SECRET not set in env");
      return NextResponse.json({ ok: false, message: "Server misconfiguration" }, { status: 500 });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = await computeHmacHex(secret, payload);

    // compare normalized lowercase hex strings
    if (generatedSignature.toLowerCase() !== String(razorpay_signature).toLowerCase()) {
      console.error("[verify-payment] signature mismatch", {
        generatedSignature,
        incoming: razorpay_signature,
        payload,
      });
      return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 400 });
    }

    console.log("[verify-payment] payment verified:", { razorpay_order_id, razorpay_payment_id });

    // TODO: update DB / send notification (WhatsApp/email) / fulfill order here.

    return NextResponse.json({ ok: true, message: "Payment verified" }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      console.error("[verify-payment] exception:", err.stack || err.message);
    } else {
      console.error("[verify-payment] unknown exception:", err);
    }
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}
