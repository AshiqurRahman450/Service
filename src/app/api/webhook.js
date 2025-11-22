// pages/api/razorpay/webhook.js
import crypto from "crypto";

export const config = {
  api: {
    bodyParser: false, // we need raw body for webhook verification
  },
};

const rawBody = async (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const bodyBuf = await rawBody(req);
    const signature = req.headers["x-razorpay-signature"];
    const webhookSecret = process.env.RZP_WEBHOOK_SECRET;
    const expected = crypto.createHmac("sha256", webhookSecret).update(bodyBuf).digest("hex");

    if (signature !== expected) {
      console.warn("Invalid webhook signature");
      return res.status(400).json({ ok: false, message: "Invalid signature" });
    }

    const payload = JSON.parse(bodyBuf.toString("utf8"));
    // TODO: handle different event types: payment.captured, payment.failed, etc.
    console.log("Razorpay webhook received:", payload.event);

    // Example:
    // if (payload.event === 'payment.captured') { mark order paid in DB }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
