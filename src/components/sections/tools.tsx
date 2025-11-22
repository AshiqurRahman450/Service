"use client";

import Image from "next/image"; // keep if you use local images elsewhere
import React from "react";

interface Tool {
  name: string;
  logo: string;
  alt: string;
  isSvg: boolean;
}

const tools: Tool[] = [
  {
    name: "Google Ads",
    logo:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/svgs/23499230-6df3-11f0-87e3-c3cec9b31d15_google-ads-6.svg",
    alt: "Google Ads logo",
    isSvg: true,
  },
  {
    name: "Search Console",
    logo:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0b31d15_google-search-console-7.svg",
    alt: "Google Search Console logo",
    isSvg: true,
  },
  {
    name: "ChatGPT",
    logo:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/svgs/234b66f0-6df3-11f0-87e3-c3cec9b31d15_chatgpt-8.svg",
    alt: "ChatGPT logo",
    isSvg: true,
  },
  {
    name: "Google Analytics",
    logo:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/svgs/2346ac00-6df3-11f0-b3e7-339aceda12f6_google-analytics-9.svg",
    alt: "Google Analytics logo",
    isSvg: true,
  },
  {
    name: "Meta",
    logo:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/svgs/23479660-6df3-11f0-87e3-c3cec9b31d15_meta-10.svg",
    alt: "Meta logo",
    isSvg: true,
  },
  {
    name: "SEO",
    logo:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/1a313b80-6df3-11f0-b3e7-339aceda12f6_seo_min-3.webp",
    alt: "SEO icon",
    isSvg: false,
  },
  {
    name: "Canva",
    logo:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/1a327400-6df3-11f0-b3e7-339aceda12f6_canva_min-4.webp",
    alt: "Canva logo",
    isSvg: false,
  },
];

const ToolCard = ({ tool }: { tool: Tool }) => (
  <div
    className="
      relative flex flex-col items-center justify-center gap-3
      w-[200px] h-[110px] md:w-[210px]
      rounded-2xl
      bg-[linear-gradient(180deg,#11221C_0%,#0B1714_100%)]
      border border-[#1C2924]
      shadow-[0_2px_10px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]
      transition-all duration-300
      hover:shadow-[0_3px_14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]
      p-3 flex-shrink-0
    "
  >
    <div className="relative z-10 flex flex-col items-center">
      {/* Use <img> for remote assets to avoid next/image width/host checks */}
      <img
        src={tool.logo}
        alt={tool.alt}
        className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
        loading="lazy"
      />
      <p className="text-sm font-medium leading-5 tracking-[0.28px] text-[rgba(255,255,255,0.9)] mt-2">
        {tool.name}
      </p>
    </div>
  </div>
);

const ToolsSection = () => {
  const firstRow = tools.slice(0, 4);
  const secondRow = tools.slice(4);
  const firstRowDup = [...firstRow, ...firstRow];
  const secondRowDup = [...secondRow, ...secondRow];

  return (
    <section className="relative overflow-hidden bg-[#010E0A] text-white">
      <div className="container mx-auto px-5 py-11 md:px-10 lg:py-20 xl:max-w-[1180px] xl:px-0 relative z-10">
        <h2 className="mb-9 text-3xl font-bold leading-9 text-center text-white lg:text-5xl lg:leading-[48px] xl:text-[42px] xl:leading-[60px] lg:mb-14">
          Tools You Will Learn
        </h2>

          {/* Mobile marquee (seamless continuous) */}
        <div className="md:hidden space-y-4">
          <div className="marquee">
            <div className="marquee-track marquee-left">
              {firstRowDup.map((t, i) => (
                <div key={`f-${i}`} className="marquee-item">
                  <ToolCard tool={t} />
                </div>
              ))}
            </div>
          </div>

          <div className="marquee">
            <div className="marquee-track marquee-right">
              {secondRowDup.map((t, i) => (
                <div key={`s-${i}`} className="marquee-item">
                  <ToolCard tool={t} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop (static) */}
        <div className="hidden md:block">
          <div className="flex justify-center gap-5 flex-wrap mb-5">
            {firstRow.map((tool) => (
              <div key={tool.name}>
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-5 flex-wrap">
            {secondRow.map((tool) => (
              <div key={tool.name}>
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
