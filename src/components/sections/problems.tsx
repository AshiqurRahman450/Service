"use client";

import React from "react";
import { motion } from "framer-motion";

const problemsData = [
  {
    title: "Business Owners",
    description:
      "Start running ads that actually convert - with the help of simple AI tools that do the targeting and tracking for you.",
  },
  {
    title: "Working Professionals",
    description:
      "Upgrade your career with AI-powered digital marketing skills that make you irreplaceable in today's job market.",
  },
  {
    title: "Homemakers",
    description: "Earn confidently from home by using beginner-friendly AI tools.",
  },
  {
    title: "Fresh Graduates",
    description:
      "Stand out in job interviews by mastering the exact AI + digital skills companies are hiring for in 2025 and beyond.",
  },
];

const ProblemsSection = () => {
  return (
    <section
      className="relative overflow-hidden px-5 py-11 text-white md:px-10 lg:py-3"
      style={{
        background:
          "radial-gradient(ellipse at 30% center, rgba(0,0,0,1) 0%, rgba(2,14,10,1) 60%, rgba(1,14,10,0.7) 100%)",
      }}
    >
      {/* Top blend using Tailwind-safe gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#010E0A] to-transparent" />

      {/* Section Title */}
      <h2 className="text-center text-3xl font-bold leading-9 lg:text-5xl lg:leading-[48px] xl:text-[52px] xl:leading-[60px]">
        What Will You Get from Our Workshops?
      </h2>

      {/* Cards container */}
      <div className="mx-auto mt-10 lg:mt-16 lg:max-w-[816px] xl:max-w-[900px]">
        <div className="relative">
          {/* Center line (desktop only) */}
          <div className="absolute left-3 h-full w-px bg-white/20 md:left-1/2 md:-translate-x-1/2" />

          {/* Cards list */}
          <div className="flex flex-col gap-10 md:gap-14">
            {problemsData.map((problem, index) => {
              const isEven = index % 2 === 0;

              const cardBase =
                "flex flex-col w-full gap-2 p-5 ml-5 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:w-[calc(46%-1.5rem)]";

              // Mobile: left-to-right red -> black gradient (applies to all cards on mobile)
              // Desktop: apply the original left/right desktop gradient styles via md: classes.
              // Note: Tailwind arbitrary gradient classes are used carefully (no underscores or typos).
              const mobileGradient = "bg-gradient-to-r from-[#7f1d1d] to-[#0b0b0b]";

              // Desktop left / right gradients (kept subtle, applied at md+)
              const desktopLeftGradient =
                "md:-ml-8 md:mr-auto md:bg-[linear-gradient(80deg,rgba(3,18,13,0)_0%,rgba(155,20,25,0.9)_100%)]";
              const desktopRightGradient =
                "md:ml-auto md:mr-0 md:bg-[linear-gradient(121deg,rgba(155,20,25,0.9)_0%,rgba(3,18,13,0)_100%)]";

              const combinedGradient = isEven
                ? `${mobileGradient} ${desktopLeftGradient}`
                : `${mobileGradient} ${desktopRightGradient}`;

              // Framer Motion props: animate once (when it enters view)
              const motionProps = {
                initial: { y: 80, opacity: 0 },
                whileInView: { y: 0, opacity: 1 },
                transition: {
                  type: "spring",
                  stiffness: 70,
                  damping: 18,
                  mass: 0.6,
                  delay: index * 0.08,
                },
                viewport: { once: true, amount: 0.25 },
              };

              return (
                <motion.div key={index} className="relative flex items-start" {...motionProps}>
                  {/* Circle marker */}
                  <div className="sticky top-6 left-0 z-10 transform md:top-12 md:left-1/2 md:-translate-x-1/2">
                    <div className="rounded-full border border-white/20 bg-transparent p-1.5 md:p-2">
                      <div className="h-3 w-3 rounded-full bg-white md:h-4 md:w-4"></div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`${cardBase} ${combinedGradient}`}>
                    <h4 className="text-xl font-bold leading-7">{problem.title}</h4>
                    <p className="text-lg font-normal leading-7 text-white/80">
                      {problem.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom blend */}
       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#010E0A] to-transparent" />
    </section>
  );
};

export default ProblemsSection;
