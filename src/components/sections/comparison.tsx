"use client";

import React from "react";
import Image from "next/image";

const burgerCardData = {
  image:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/551e8aa0-6df7-11f0-87e3-c3cec9b31d15_burger_min-5.webp",
  price: "₹199.00",
  icon:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/svgs/a05d2650-6b6a-11f0-bf6c-e151f03705cf_tick-50percent-11.svg",
  items: [
    'One bite → "Wow!" → 30 minutes later → hungry again 😅',
    "Adds calories, not skills",
    "Instagram photo? Okay. Life impact? Zero.",
    "Money gone, moment gone.",
  ],
};

const workshopCardData = {
  image:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/62090bd0-6c32-11f0-8d34-07754ad9d03a_workshop_min-6.webp",
  price: "₹99.00",
  icon:
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/svgs/a05b2a80-6b6a-11f0-bf6c-e151f03705cf_tick-white-12.svg",
  items: [
    "Learn the right skill",
    "Learn to grow business online",
    "Hands-on practical knowledge",
    "Career & income boost opportunity",
  ],
};

/**
 * MobileCard:
 * - Outer wrapper provides the thin ash border (so the gradient never touches the border and cause bright patch)
 * - Inner box (rounded slightly smaller) contains the gradient and content
 * - Workshop (isWorkshop = true) uses a smooth multi-stop gradient to avoid bright bottom patch
 */
const MobileCard = ({ data, isWorkshop = false }: { data: any; isWorkshop?: boolean }) => {
  // Inner gradient for workshop: smooth stops, avoids a harsh flat bottom
  const workshopGradient =
    "linear-gradient(180deg,#1CC389 0%, #0f8a5f 45%, #07311f 85%, #031710 100%)";
  const burgerGradient = "linear-gradient(180deg,#11221C 0%, #0B1714 100%)";

  return (
    <div
      className="mx-auto w-[328px] max-w-[92%] rounded-2xl overflow-visible"
      /* outer wrapper adds the subtle thin border (keeps it separate from gradient) */
      style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}
    >
      {/* inner rounded box holds the gradient and content; slightly smaller radius so border is visible */}
      <div
        className="rounded-[14px] overflow-hidden mx-0"
        style={{
          background: isWorkshop ? workshopGradient : burgerGradient,
          minHeight: 520,
          padding: "28px 22px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
        }}
      >
        {/* Top image */}
        <div className="flex justify-center">
          <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image src={data.image} alt="card image" fill className="object-contain" />
          </div>
        </div>

        {/* Price centered */}
        <p className="mt-5 text-[34px] leading-9 font-extrabold text-white text-center">
          {data.price}
        </p>

        {/* Items list (left aligned block) */}
        <div className="mt-6 w-full px-1">
          <div className="flex flex-col gap-4">
            {data.items.map((it: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-1">
                  <Image src={data.icon} alt="tick" width={18} height={18} className="object-contain" />
                </div>
                <p
                  className={`text-[15.5px] leading-7 ${isWorkshop ? "text-white" : "text-gray-300"}`}
                  style={{ textAlign: "left" }}
                >
                  {it}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#010E0A] text-white">
      {/* Top/bottom blend (unchanged) */}
      <div className="pointer-events-none absolute inset-x-0 top-auto bottom-0 h-52 bg-[to_top,rgba(1,10,7,1)_0%,rgba(1,10,7,0)_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto text-center px-6 md:px-12 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-12 leading-snug">
          Spend ₹199 on Burger... or ₹99 on your Future?
        </h2>

        {/* MOBILE: burger first, workshop second */}
        <div className="md:hidden flex flex-col gap-6 items-center">
          <MobileCard data={burgerCardData} isWorkshop={false} />
          <MobileCard data={workshopCardData} isWorkshop={true} />
        </div>

        {/* DESKTOP: unchanged original two-column layout */}
        <div className="hidden md:flex flex-row items-stretch justify-between gap-10">
          {/* Burger */}
          <div
            className="relative flex flex-row items-center justify-between rounded-2xl p-8 w-full md:w-1/2
            bg-[linear-gradient(180deg,#11221C_0%,#0B1714_100%)]
            border border-[#1C2924]
            shadow-[0_2px_10px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]
            overflow-hidden"
          >
            <div className="relative z-10 flex flex-col items-center w-[35%]">
              <div className="relative w-40 h-40 mb-4">
                <Image src={burgerCardData.image} alt="Burger" fill className="object-contain" />
              </div>
              <p className="text-3xl font-bold text-white">{burgerCardData.price}</p>
            </div>

            <div className="relative z-10 flex flex-col gap-4 text-left w-[60%]">
              {burgerCardData.items.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <Image src={burgerCardData.icon} alt="Tick" width={20} height={20} className="mt-1" />
                  <p className="text-gray-300 text-base leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Workshop */}
          <div
            className="relative flex flex-row items-center justify-between rounded-2xl p-8 w-full md:w-1/2
            bg-[linear-gradient(180deg,#1CC389_0%,#0B1714_100%)]
            border border-[#1C2924]
            overflow-hidden"
          >
            <div className="relative z-10 flex flex-col items-center w-[35%]">
              <div className="relative w-40 h-40 mb-4">
                <Image src={workshopCardData.image} alt="Workshop" fill className="object-contain" />
              </div>
              <p className="text-3xl font-bold text-white">{workshopCardData.price}</p>
            </div>

            <div className="relative z-10 flex flex-col gap-4 text-left w-[60%]">
              {workshopCardData.items.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <Image src={workshopCardData.icon} alt="Tick" width={20} height={20} className="mt-1" />
                  <p className="text-white text-base leading-6">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom blend */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-[to_top,rgba(1,10,7,1)_0%,rgba(1,10,7,0)_100%)]" />
    </section>
  );
};

export default ComparisonSection;
