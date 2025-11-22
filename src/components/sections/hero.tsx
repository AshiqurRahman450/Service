"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TimeLeft {
  minutes: number;
  seconds: number;
}

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ minutes: 2, seconds: 54 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          return { minutes: 2, seconds: 54 };
        }

        let newSeconds = prevTime.seconds - 1;
        let newMinutes = prevTime.minutes;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        return { minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const padTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <section
      className="relative overflow-hidden bg-[#010E0A] text-white"
    >
      {/* Global soft blend on top — helps merge with section above */}
     

      <div className="mx-auto max-w-[1180px] px-5 pt-12 pb-16 text-center md:px-10 lg:pt-12 lg:pb-20 xl:px-0">
        {/* Rating */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-lg bg-[rgba(5,150,105,0.12)] px-2 py-3 lg:px-3">
  <div className="flex items-center gap-[3px]">
    {[...Array(5)].map((_, i) => (
      <Image
        key={i}
        src="https://hubble.cdn.chittiapp.com/cdn_uploads/a0605aa0-6b6a-11f0-bf6c-e151f03705cf_star-emerald-600.svg"
        alt="star"
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
      />
    ))}
  </div>
  <p className="text-sm font-normal text-white lg:text-base leading-none">
    14K+ reviews (4.9 of 5)
  </p>
</div>


        {/* Subhead */}
        <p className="mt-4 text-base font-medium uppercase leading-7 tracking-[0.36px] text-emerald-500 md:text-lg lg:mt-5">
          Your Breakthrough Starts Here
        </p>

        {/* Heading */}
        <h1 className="mt-2 text-[26px] font-bold leading-9 text-white sm:text-[32px] lg:mt-2 lg:text-[50px] lg:leading-[54px]">
          Learn What It Takes to Become a Digital <br className="hidden md:block" />
          <span className="text-emerald-400">Marketer in Just 3 Hours!</span>
        </h1>

        {/* Content */}
        <div className="mt-8 flex flex-col items-center gap-10 md:flex-row md:justify-center lg:mt-12 xl:gap-10">
          {/* Left Image */}
          <div className="flex w-full flex-col items-center sm:w-auto md:w-[50%]">
  <Image
    src="/bro.jpg"
    alt="spark logo"
    width={280}
    height={280}
    className="h-[200px] w-[200px] sm:h-[220px] sm:w-[220px] md:h-[240px] md:w-[240px] lg:h-[280px] lg:w-[280px]
               rounded-full object-cover border border-emerald-400 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
  />
            <p className="mt-2 text-sm font-semibold leading-5 text-emerald-400 lg:mt-3">
              4+ Years of Experience
            </p>
            <p className="text-2xl mt-1 font-semibold leading-8 text-white">Mr Spark</p>
            <p className="text-base mt-1 font-normal leading-6 text-white/60">Founder of Crew</p>
          </div>

          {/* Right Info */}
          <div className="w-full md:w-[50%] xl:w-[40%]">
            <div className="grid w-full grid-cols-2 gap-3 lg:gap-5">
              {/* Date */}
              <div className="col-span-2 bg-[linear-gradient(145deg,#0F2921_0%,#08130F_100%)]
 rounded-xl border border-white/25 px-4 py-3 lg:px-5 lg:py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-[50px] w-12 flex-col items-center justify-center overflow-hidden rounded-lg border border-emerald-700 bg-emerald-700">
                    <div className="py-0.5 text-xs font-semibold uppercase leading-4 text-white">Sun</div>
                    <div className="w-full bg-white text-center text-lg font-bold leading-7 text-neutral-800">
                      19
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="text-lg font-semibold leading-7 text-white">Sunday, 19 Oct 2025</div>
                    <div className="text-base font-normal leading-6 text-white/90">10:00 AM IST</div>
                  </div>
                </div>
              </div>

              {/* Mode */}
              <div className="flex flex-col gap-0.5 rounded-xl bg-[linear-gradient(145deg,#0F2921_0%,#08130F_100%)]
 border border-white/25 px-4 py-3 lg:px-5 lg:py-4">
                <p className="text-sm font-normal leading-5 text-white/80">Mode</p>
                <p className="text-lg font-semibold leading-7 text-white">Online</p>
              </div>

              {/* Language */}
              <div className="flex flex-col gap-0.5 rounded-xl bg-[linear-gradient(145deg,#0F2921_0%,#08130F_100%)]
 border border-white/25 px-4 py-3 lg:px-5 lg:py-4">
                <p className="text-sm font-normal leading-5 text-white/80">Language</p>
                <p className="text-lg font-semibold leading-7 text-white">Tamil</p>
              </div>
            </div>

            {/* Register Button */}
            <div className="hidden md:block">
              <button
                className="relative mt-8 flex w-full justify-center items-center overflow-hidden rounded-[10px]
                bg-gradient-to-b from-[#22C58E] to-[#065F46] px-6 py-3
                font-bold text-lg text-white shadow-[0_4px_8px_rgba(0,0,0,0.3)]
                transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
              >
                <span className="relative z-10 flex items-center gap-1">
                  <span>Register Now for</span>
                  <s className="mx-1 text-white/80">₹499</s>
                  <span className="text-2xl font-extrabold">₹99</span>
                </span>

                {/* Shine effect */}
                <span className="absolute inset-0 overflow-hidden rounded-[10px] pointer-events-none">
                  <span
                    className="absolute top-[-10%] left-[-20%] h-[120%] w-[6%] rotate-[25deg]
                    bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[4px]
                    animate-shine-smooth"
                  ></span>
                </span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-white/80 lg:mt-5">
                <span>Offer ends in</span>
                <span className="text-white font-semibold">
                  {padTime(timeLeft.minutes)}:{padTime(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to blend into next section */}
    
    </section>
  );
};

export default HeroSection;
