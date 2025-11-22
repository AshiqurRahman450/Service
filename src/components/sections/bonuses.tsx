"use client";

import * as React from "react";
import Image from "next/image";

const bonuses = [
  {
    label: "Bonus 1",
    title: "Unlock Extra Knowledge with Our E-Book.",
    type: "EBOOK",
    imageSrc:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/edccf3f0-6d3d-11f0-9b1f-096d38b63715_bonus-pdf_min-7.webp",
    imageAlt: "E-Book bonus graphic",
    price: "₹1,000",
  },
  {
    label: "Bonus 2",
    title: "Upskill with Confidence – Certification Included.",
    type: "CERTIFICATE",
    imageSrc:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/a79d4000-6d2a-11f0-b62a-d1c04c560a01_bonus-certificate_min-8.webp",
    imageAlt: "Certificate bonus graphic",
    price: "₹5,000",
  },
  {
    label: "Bonus 3",
    title: "Blueprint for powerful presentation",
    type: "BLUEPRINT",
    imageSrc:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/a79d6710-6d2a-11f0-9b1f-096d38b63715_bonus-presentation_min-9.webp",
    imageAlt: "Presentation blueprint bonus graphic",
    price: "₹5,000",
  },
];

const freeGiftBadgeUrl =
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/svgs/26764da0-6b6d-11f0-b3a6-57b8fa68490e_free-gift-badge-13.svg";

export default function BonusesSection() {
  const [index, setIndex] = React.useState(0);
  const total = bonuses.length;

  // handle prev/next with loop
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const goTo = (i: number) => setIndex(i % total);

  // optional: keyboard left/right support (mobile users won't use, desktop unaffected)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // swipe support for mobile
  const touchStartX = React.useRef<number | null>(null);
  const touchDelta = 40; // px threshold

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    /* noop */
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX.current;
    if (diff > touchDelta) prev();
    else if (diff < -touchDelta) next();
    touchStartX.current = null;
  };

  /* Card renderer (keeps your desktop markup; we'll reuse same structure) */
  const Card = ({ bonus }: { bonus: typeof bonuses[number] }) => (
    <div
      className="relative rounded-2xl w-full max-w-[360px] h-[500px]
              border border-[rgba(255,255,255,0.08)]
              bg-[linear-gradient(135deg,#052E26_0%,#031B16_100%)]
              before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.50)] before:rounded-2xl before:z-0
              shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]
              overflow-hidden"
      role="group"
      aria-label={bonus.title}
    >
      {/* Header */}
      <div className="relative z-10 w-full bg-gradient-to-r from-[#065F46] to-[#047857] py-4">
        <p className="text-white font-semibold text-lg tracking-wide">{bonus.label}</p>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-8 flex flex-col items-center justify-start flex-grow h-[calc(100%-140px)]">
        <h3 className="text-white font-bold text-[22px] leading-tight text-center mb-4">
          {bonus.title}
        </h3>
        <p className="text-emerald-300 font-semibold uppercase tracking-widest text-sm mb-6">
          {bonus.type}
        </p>
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={bonus.imageSrc}
            alt={bonus.imageAlt}
            width={240}
            height={180}
            className="w-[240px] h-[180px] object-contain"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-gradient-to-b from-[#0A3A32] to-[#062820] w-full flex items-center justify-between px-6 py-4 border-t border-[rgba(255,255,255,0.08)]">
        <p className="text-[26px] font-bold text-white/80 line-through tracking-wide">{bonus.price}</p>
        <Image src={freeGiftBadgeUrl} alt="Free Gift badge" width={64} height={64} className="w-16 h-15" />
      </div>
    </div>
  );

  return (
    <section className="relative bg-[#010E0A] px-5 py-16 md:px-10 lg:py-10 text-center overflow-hidden">
      {/* Top gradient blend */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-52 bg-[to_top,rgba(1,10,7,1)_0%,rgba(1,10,7,0)_100%)]" />

      <div className="relative z-10 mx-auto xl:max-w-[1180px]">
        <h2 className="text-3xl font-bold leading-9 text-white lg:text-5xl lg:leading-[48px] xl:text-[52px] xl:leading-[60px]">
          Unlock bonuses worth <span className="text-emerald-400">₹11,000</span>
        </h2>
        <p className="mt-4 text-lg font-medium text-[rgba(255,255,255,0.8)] lg:text-xl">
          Attend the workshop to receive exclusive access to our bonuses.
        </p>

        {/* ---------------- MOBILE CAROUSEL (replace grid on mobile) ---------------- */}
        <div className="mt-12 lg:mt-14">
          {/* mobile-only carousel */}
          <div className="md:hidden relative flex flex-col items-center">
            {/* carousel viewport */}
            <div
              className="w-full flex items-center justify-center"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="w-full flex items-center justify-center px-4">
                {/* single visible card */}
                <div className="w-full max-w-[360px]">{/* center */}
                  <Card bonus={bonuses[index]} />
                </div>
              </div>
            </div>

            {/* nav controls (arrows + dots) */}
            <div className="mt-4 mb-2 flex items-center gap-6">
              {/* left arrow */}
              <button
                onClick={prev}
                aria-label="Previous bonus"
                className="flex items-center justify-center w-12 h-12 rounded-lg
                       bg-[linear-gradient(180deg,#065F46_0%,#034433_100%)]
                       shadow-[0_6px_14px_rgba(0,0,0,0.4)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* dots */}
              <div className="flex items-center gap-3">
                {bonuses.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === index ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label={`Go to bonus ${i + 1}`}
                    style={{ boxShadow: i === index ? "0 0 8px rgba(255,255,255,0.25)" : undefined }}
                  />
                ))}
              </div>

              {/* right arrow */}
              <button
                onClick={next}
                aria-label="Next bonus"
                className="flex items-center justify-center w-12 h-12 rounded-lg
                       bg-[linear-gradient(180deg,#065F46_0%,#034433_100%)]
                       shadow-[0_6px_14px_rgba(0,0,0,0.4)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 6L15 12L9 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ---------------- DESKTOP: original grid (unchanged) ---------------- */}
          <div className="hidden md:flex mt-12 lg:mt-14 flex-wrap justify-center gap-6 lg:gap-8">
            {bonuses.map((bonus, index) => (
              <div key={index} className="relative rounded-2xl w-full max-w-[360px] h-[500px]
              border border-[rgba(255,255,255,0.08)]
              bg-[linear-gradient(135deg,#052E26_0%,#031B16_100%)]
              before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.50)] before:rounded-2xl before:z-0
              shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]
              overflow-hidden">
                {/* Header */}
                <div className="relative z-10 w-full bg-gradient-to-r from-[#065F46] to-[#047857] py-4">
                  <p className="text-white font-semibold text-lg tracking-wide">{bonus.label}</p>
                </div>

                {/* Content */}
                <div className="relative z-10 px-6 pt-8 flex flex-col items-center justify-start flex-grow h-[calc(100%-140px)]">
                  <h3 className="text-white font-bold text-[22px] leading-tight text-center mb-4">
                    {bonus.title}
                  </h3>
                  <p className="text-emerald-300 font-semibold uppercase tracking-widest text-sm mb-6">
                    {bonus.type}
                  </p>
                  <div className="flex-1 flex items-center justify-center">
                    <Image
                      src={bonus.imageSrc}
                      alt={bonus.imageAlt}
                      width={240}
                      height={180}
                      className="w-[240px] h-[180px] object-contain"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 bg-gradient-to-b from-[#0A3A32] to-[#062820] w-full flex items-center justify-between px-6 py-4 border-t border-[rgba(255,255,255,0.08)]">
                  <p className="text-[26px] font-bold text-white/80 line-through tracking-wide">{bonus.price}</p>
                  <Image src={freeGiftBadgeUrl} alt="Free Gift badge" width={64} height={64} className="w-16 h-15" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient blend */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-52 bg-[to_top,rgba(1,10,7,1)_0%,rgba(1,10,7,0)_100%)]" />
    </section>
  );
}
