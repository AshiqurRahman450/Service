// src/app/api/razorpay/create-order/route.js
/// Temp debug — remove after use
const kid = process.env.RAZORPAY_KEY_ID || "";
const ksec = process.env.RAZORPAY_KEY_SECRET || "";
console.log("[env-debug] key_id:", kid ? `${kid.slice(0,6)}...${kid.slice(-4)}` : "MISSING");
console.log("[env-debug] key_secret:", ksec ? `len=${ksec.length}, ${ksec.slice(0,4)}...${ksec.slice(-4)}` : "MISSING");


import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    console.log("[create-order] body:", body);

    const amount = Number(body?.amount ?? 99 * 100);
    if (!amount || Number.isNaN(amount) || amount <= 0) {
      console.warn("[create-order] invalid amount:", body?.amount);
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.error("[create-order] missing RAZORPAY_KEY_ID/SECRET in env");
      return NextResponse.json({ error: "Server misconfiguration: missing keys" }, { status: 500 });
    }

    const razor = new Razorpay({ key_id, key_secret });

    const options = {
      amount,
      currency: body?.currency || "INR",
      receipt: body?.receipt || `rcpt_${Date.now()}`,
      payment_capture: 1,
      notes: body?.notes || {},
    };

    console.log("[create-order] options:", options);

    const order = await razor.orders.create(options);
    console.log("[create-order] order:", order && order.id);

    return NextResponse.json(order);
  } catch (err) {
    console.error("[create-order] error:", err && (err.stack || err));
    const message = (err && err.error && err.error.description) || (err && err.message) || "Order creation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
