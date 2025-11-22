"use client";

import React, { useEffect, useRef, useState } from "react";

const VideoCta = () => {
  const stats = [
    { value: 50, label: "Attendees", suffix: "k+" },
    { value: 100, label: "Practical", suffix: "%" },
    { value: 3, label: "Learning", suffix: "Hrs" },
    { value: 4.9, label: "Ratings", suffix: "/5", decimal: true },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          animateCounts();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const animateCounts = () => {
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(
        stats.map((s) => {
          const current = s.value * eased;
          return s.decimal ? parseFloat(current.toFixed(1)) : Math.floor(current);
        })
      );

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const formatNumber = (num: number) => {
    if (Number.isNaN(num)) return "0";
    if (num % 1 !== 0) return num.toFixed(1);
    return num.toLocaleString("en-IN");
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#010E0A] antialiased">
      <div className="px-5 py-11 md:px-10 lg:py-15">
        {/* Header */}
        <div className="mx-auto flex max-w-[1100px] flex-col justify-center gap-2 text-center lg:gap-3">
          <h2 className="text-3xl font-bold leading-[38px] text-white lg:text-5xl lg:leading-[60px]">
            <div>Struggling With</div>
            <div>Marketing?</div>
            <div className="text-emerald-400 whitespace-nowrap">Fix it in our ₹99 Workshop.</div>
          </h2>
          <p className="mt-2 text-lg font-medium text-[rgba(255,255,255,0.80)] lg:text-xl">
            Learn how to fix it
          </p>
        </div>

        {/* Video */}
        <div className="relative mx-auto mt-9 aspect-video overflow-hidden lg:mt-10 lg:rounded-[30px] lg:bg-[rgba(255,255,255,0.10)] lg:p-5 xl:w-[800px]">
          <video
            className="
              w-full h-full object-cover
              rounded-3xl       /* ✅ Rounded both top and bottom corners */
              shadow-[0_6px_25px_rgba(0,0,0,0.3)] /* optional soft depth */
            "
            poster="https://hubble.cdn.chittiapp.com/cdn/2025/7/56cc4e80-6c32-11f0-8d34-07754ad9d03a_business-growth-digital-marketing_720.mp4"
            playsInline
            loop
            muted
            autoPlay
          >
            <source
              src="https://hubble.cdn.chittiapp.com/cdn/2025/7/56cc4e80-6c32-11f0-8d34-07754ad9d03a_business-growth-digital-marketing_720.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* CTA Button */}
        <div className="mt-6 flex justify-center md:mt-8">
          <button
            className="
              relative flex justify-center items-center overflow-hidden rounded-[12px]
              bg-gradient-to-b from-[#22C58E] to-[#065F46]
              px-6 py-3 font-bold text-lg text-white shadow-[0_4px_8px_rgba(0,0,0,0.3)]
              transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)]
              w-[260px] md:w-full lg:w-fit
            "
          >
            <span className="relative z-10">Join the Workshop Now</span>
            <span className="absolute inset-0 overflow-hidden rounded-[12px] pointer-events-none">
              <span
                className="absolute top-[-10%] left-[-20%] h-[120%] w-[6%] rotate-[25deg]
                bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[4px]
                animate-shine-smooth"
              />
            </span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto px-5 pb-20 pt-0 md:px-10 xl:max-w-[1180px] xl:px-0">
        <div className="mx-auto grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="
                rounded-2xl
                bg-[linear-gradient(135deg,#059669_0%,#065F46_50%,#010E0A_100%)]
                shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                px-5 py-4 text-left lg:px-6 lg:py-5
              "
            >
              <div className="flex items-end">
                <div className="text-[40px] font-extrabold leading-[48px] text-white lg:text-[48px]">
                  {formatNumber(counts[i])}
                </div>
                <span className="ml-1 text-2xl font-extrabold leading-8 text-white tracking-[0.5px] lg:text-3xl lg:leading-9">
                  {stat.suffix}
                </span>
              </div>
              <div className="text-base font-medium leading-6 tracking-[0.32px] text-[rgba(255,255,255,0.80)] lg:text-lg lg:leading-7 lg:tracking-[0.36px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCta;
