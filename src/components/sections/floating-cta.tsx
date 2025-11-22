// FloatingCtaBar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TimeLeft {
  minutes: number;
  seconds: number;
}

const INITIAL_TIME: TimeLeft = { minutes: 2, seconds: 54 };

const FloatingCtaBar = () => {
  // Timer state (looping)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(INITIAL_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // if reached zero, restart
        if (prev.minutes === 0 && prev.seconds === 0) {
          return { ...INITIAL_TIME };
        }

        if (prev.seconds > 0) {
          return { minutes: prev.minutes, seconds: prev.seconds - 1 };
        }

        // seconds === 0 and minutes > 0
        return { minutes: prev.minutes - 1, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const padTime = (n: number) => n.toString().padStart(2, "0");

  // Visibility logic (same as you had)
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const target = document.getElementById("final-cta-section");
    const observer = new IntersectionObserver(
      (entries) => setVisible(!entries[0].isIntersecting),
      { threshold: 0.2 }
    );
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-2 left-0 right-0 z-50 flex justify-center px-4"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative w-full max-w-[1200px] px-2 py-1">
        {/* Frosted glass panel */}
        <div
          className="relative rounded-2xl overflow-hidden border border-white/6"
          style={{
            background:
              "linear-gradient(135deg, rgba(6,12,10,0.55), rgba(5,10,8,0.45))",
            boxShadow: "0 0 35px rgba(0,0,0,0.6)",
          }}
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 backdrop-blur-md" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent opacity-30" />
          </div>

          {/* Main content
              - Mobile: stack vertically and hide mentor image (hidden on sm)
              - Desktop (sm+): original two-column layout preserved
          */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 px-4 py-4">
            {/* LEFT: image + text (hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-5">
              <div className="flex-shrink-0">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/0b28a600-6d2b-11f0-9b1f-096d38b63715_mentor-cta_min-14.webp"
                  alt="Mentor"
                  width={70}
                  height={70}
                  className="rounded-full border border-[#00C67F] object-cover w-[70px] h-[70px]"
                />
              </div>

              <div className="flex flex-col text-left">
                <h3 className="text-white text-lg sm:text-xl font-semibold leading-snug">
                  Still confused? You're not alone — Let's fix it together
                </h3>
                <p className="text-white/70 text-sm sm:text-base mt-1">
                  20K+ Students Enrolled
                </p>
              </div>
            </div>

            {/* RIGHT / CENTER: content + button */}
            {/* On mobile this becomes the full-width centered column */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-4 justify-center">
              {/* On mobile: heading centered above the button; on desktop the heading is part of left section */}
              <div className="block sm:hidden text-center px-2">
                <h3 className="text-white text-lg font-semibold leading-snug">
                  Still confused? You're not alone — Let's fix it together
                </h3>
                <p className="text-white/70 text-sm mt-1">20K+ Students Enrolled</p>
              </div>

              <div className="w-full sm:w-auto">
                <button
                onClick={() => window.location.href = "/payment"}
                  className="relative flex items-center justify-center overflow-hidden rounded-[10px]
                bg-gradient-to-b from-[#22C58E] to-[#065F46]
                px-6 py-3
                font-bold text-base sm:text-lg text-white
                shadow-[0_4px_8px_rgba(0,0,0,0.3)]
                transition-all duration-300
                hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)]
                w-full sm:w-auto"
                  aria-label="Register Now"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Register Now for</span>
                    <s className="mx-1 text-white/80">₹499</s>
                    <span className="text-xl sm:text-2xl font-extrabold">₹99</span>
                  </span>

                  {/* Shine effect */}
                  <span className="absolute inset-0 overflow-hidden rounded-[10px] pointer-events-none">
                    <span
                      className="absolute top-[-10%] left-[-20%] h-[120%] w-[6%] rotate-[25deg]
                      bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[4px]
                      animate-shine-smooth"
                    />
                  </span>
                </button>
              </div>

              {/* Timer under the button on mobile, and alongside on desktop */}
              <div className="mt-2  sm:mt-3 flex items-center justify-center gap-2 text-sm font-medium text-white/80">
                <span>Offer ends in</span>
                <span className="text-white font-semibold">
                  {padTime(timeLeft.minutes)}:{padTime(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCtaBar;
