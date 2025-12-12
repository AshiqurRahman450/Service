"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
const AMOUNT_PAISA = 99 * 100; // ₹99

export default function PaymentPage() {
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [readyForPayment, setReadyForPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("payment_user_info");
      if (saved) {
        const p = JSON.parse(saved);
        setName(p.name || "");
        setEmail(p.email || "");
        setPhone(p.phone || "");
      }
    } catch (e) {
      console.warn("localStorage read failed", e);
    }
  }, []);

  const validate = () => {
    const e: any = {};
    if (!name.trim()) e.name = "Please enter name";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter valid email";
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/\D/g, ""))) e.phone = "Enter valid 10-digit phone";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

 const saveAndContinue = async (ev?: React.FormEvent<HTMLFormElement>) => {
  ev?.preventDefault();
  if (!validate()) return;

  try {
    await addDoc(collection(db, "users"), {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
await addDoc(collection(db, "users"), {
  name: name.trim(),
  email: email.trim(),
  phone: phone.trim(),
});
    setShowModal(false);
    setReadyForPayment(true);
  } catch (error) {
    console.error("Firestore save error:", error);
    setShowModal(false);
    setReadyForPayment(true);
  }
};

  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      if (typeof window === "undefined") return reject("window undefined");
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = RAZORPAY_SCRIPT;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });

  const startPayment = async () => {
    setLoading(true);
    try {
      // 1) Ensure public key exists
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!PUBLIC_KEY) {
        alert("Public Razorpay key is missing. Add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env.local and restart dev server.");
        console.error("Missing NEXT_PUBLIC_RAZORPAY_KEY_ID");
        setLoading(false);
        return;
      }

      // 2) Load SDK
      await loadRazorpayScript().catch((err) => {
        console.error("Razorpay load error:", err);
        throw err;
      });

      // 3) Create order on server
      const createRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: AMOUNT_PAISA,
          currency: "INR",
          receipt: `workshop_receipt_${Date.now()}`,
          notes: { plan: "workshop", user_email: email, user_phone: phone },
        }),
      });

      const orderJson = await createRes.json();
      if (!createRes.ok) {
        console.error("Create order failed:", orderJson);
        alert("Unable to create order. Check console for details.");
        setLoading(false);
        return;
      }

      // 4) Configure Razorpay
      const options: any = {
        key: PUBLIC_KEY,
        amount: orderJson.amount,
        currency: orderJson.currency,
        name: "Your Workshop",
        description: "₹99 Workshop — One-time",
        order_id: orderJson.id,
        handler: async function (response: any) {
          // call server to verify
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verify = await verifyRes.json();
            if (verifyRes.ok && verify.ok) {
              alert("Payment successful and verified ✅");
              // redirect or update UI here
              // window.location.href = "/thank-you";
            } else {
              alert("Payment verification failed. Contact support.");
              console.error("verify result:", verify);
            }
          } catch (err) {
            console.error("verify error", err);
            alert("Error verifying payment. Check console.");
          }
        },
        prefill: { name, email, contact: phone },
        theme: { color: "#065F46" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (resp: any) {
        console.error("Payment failed event:", resp);
        alert("Payment failed. Please try another method.");
      });

      rzp.open();
    } catch (err: any) {
      console.error("startPayment error:", err);
      if (err && err.message) alert(err.message);
      else alert("Unable to start payment. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010E0A] flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-[#071D16] p-6 border border-white/10 text-white shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-3">Payment</h1>
        <p className="text-center text-white/80 mb-6">You are registering for the <strong>₹99 Workshop</strong>.</p>

        {!readyForPayment && (
          <div className="flex flex-col gap-4">
            <p className="text-white/80 text-sm">Please fill contact details to continue.</p>
            <button onClick={() => setShowModal(true)} className="w-full rounded-md bg-gradient-to-b from-[#22C58E] to-[#065F46] py-3 font-bold text-black">
              Enter Details
            </button>
          </div>
        )}

        {readyForPayment && (
          <div className="mt-6">
            <div className="rounded-lg bg-[rgba(255,255,255,0.03)] p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-white/80">Workshop</div>
                  <div className="text-lg font-semibold">₹99</div>
                </div>
                <div className="text-right text-sm text-white/70">One-time</div>
              </div>

              <button disabled={loading} onClick={startPayment} className="w-full rounded-md bg-gradient-to-b from-[#22C58E] to-[#065F46] py-3 font-bold text-black">
                {loading ? "Processing..." : "Pay ₹99"}
              </button>
            </div>

            <div className="mt-4 text-xs text-white/60">We will use your contact details for booking confirmation and receipts.</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <form onSubmit={saveAndContinue} className="relative z-10 w-full max-w-md rounded-2xl bg-[#071D16] p-6 border border-white/10 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Enter your details</h2>
            <p className="text-sm text-white/80 mb-4">We will use these to send your receipt.</p>

            <label className="block mb-3">
              <span className="text-sm text-white/80">Full name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className={`mt-2 w-full rounded-lg bg-[#0b1714] px-3 py-2 text-white placeholder:text-white/40 border ${(errors.name ? "border-red-500" : "border-transparent")}`} placeholder="John Doe" />
              {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
            </label>

            <label className="block mb-3">
              <span className="text-sm text-white/80">Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-2 w-full rounded-lg bg-[#0b1714] px-3 py-2 text-white placeholder:text-white/40 border ${(errors.email ? "border-red-500" : "border-transparent")}`} placeholder="you@example.com" inputMode="email" />
              {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
            </label>

            <label className="block mb-4">
              <span className="text-sm text-white/80">Phone</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className={`mt-2 w-full rounded-lg bg-[#0b1714] px-3 py-2 text-white placeholder:text-white/40 border ${(errors.phone ? "border-red-500" : "border-transparent")}`} placeholder="10-digit mobile number" inputMode="tel" maxLength={13} />
              {errors.phone && <div className="text-xs text-red-400 mt-1">{errors.phone}</div>}
            </label>

            <div className="flex items-center gap-3">
              <button type="submit" className="flex-1 rounded-md bg-gradient-to-b from-[#22C58E] to-[#065F46] py-2 font-bold text-black">Next</button>
              <button type="button" onClick={() => setShowModal(false)} className="rounded-md border border-white/10 px-4 py-2 text-white/80">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
