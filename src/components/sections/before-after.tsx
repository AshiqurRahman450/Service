"use client";

const beforePoints = [
  "I don't know where to start",
  "I've wasted money on ads",
  "My competitors are ahead",
  "Social media feels like a mystery",
  "I have zero online sales",
  "Content creation is exhausting",
  "I feel stuck and overwhelmed",
];

const afterPoints = [
  "Now I have a clear path to follow",
  "I finally know what works — and why",
  "My ads are bringing real customers",
  "Social media brings consistent income",
  "I'm earning ₹50K+ from home",
  "Content creation is now easy and fun",
  "I feel confident, free, and unstoppable",
];

const BeforeAfter = () => {
  return (
    <section className="relative bg-[#010E0A] px-5 py-16 md:px-10 lg:py-20 text-white">
      <div className="mx-auto max-w-[1180px] text-center relative z-10">
        {/* Title */}
        <h2 className="text-4xl lg:text-6xl font-bold mb-12">Before and After</h2>

        {/* MOBILE: flex-column with equal-height cards | DESKTOP: original two-column grid */}
        <div className="w-full">
          <div
            className="
              flex flex-col gap-8
              lg:grid lg:grid-cols-2 lg:gap-10
            "
          >
            {/* ================= BEFORE CARD ================= */}
            <div
              className="
                rounded-2xl overflow-hidden
                shadow-[0_0_15px_rgba(0,0,0,0.25)]
                bg-[linear-gradient(180deg,#A01E1E_0%,#400F0F_60%,#0E0E0E_100%)]

                /* MOBILE: equal height */
                flex flex-col
                min-h-[460px]  /* ← ensures both cards have the same baseline height */
                lg:min-h-0     /* desktop: let content size as before */
              "
            >
              {/* Header */}
              <div className="bg-[#A92323] py-4 px-6 flex items-center justify-center gap-3">
                <span className="text-2xl">😔</span>
                <h3 className="text-2xl font-semibold">Frustration Before</h3>
              </div>

              {/* Body: flex-1 so it fills the available height on mobile */}
              <div className="py-6 px-8 text-left flex-1 overflow-auto">
                <ul className="flex flex-col gap-4">
                  {beforePoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FF4D4D]">
                        <span className="text-white text-sm leading-none">✕</span>
                      </div>
                      <p className="text-base text-white/90 leading-6">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ================= AFTER CARD ================= */}
            <div
              className="
                rounded-2xl overflow-hidden
                shadow-[0_0_15px_rgba(0,0,0,0.25)]
                bg-[linear-gradient(180deg,#007B4E_0%,#014B31_60%,#0B1714_100%)]

                /* MOBILE: equal height */
                flex flex-col
                min-h-[460px]
                lg:min-h-0
              "
            >
              {/* Header */}
              <div className="bg-[#008352] py-4 px-6 flex items-center justify-center gap-3">
                <span className="text-2xl">🤩</span>
                <h3 className="text-2xl font-semibold">Freedom After</h3>
              </div>

              {/* Body */}
              <div className="py-6 px-8 text-left flex-1 overflow-auto">
                <ul className="flex flex-col gap-4">
                  {afterPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#00C67F]">
                        <span className="text-white text-sm leading-none">✔</span>
                      </div>
                      <p className="text-base text-white/90 leading-6">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade blend */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#010E0A] to-transparent" />
    </section>
  );
};

export default BeforeAfter;
