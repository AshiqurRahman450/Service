"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

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
      overflow-hidden
    "
  >
    <div className="relative z-10 flex flex-col items-center">
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

  // refs for marquee tracks
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  const pxPerSecond = 30; // change to speed up/slow down
  const minDurationSec = 3; // minimum safe duration

  // keep refs to active web animations so we can cancel them
  let leftAnimation: Animation | null = null;
  let rightAnimation: Animation | null = null;
  let resizeTimer: number | null = null;

  function ensureDuplicated(trackEl: HTMLDivElement | null) {
    if (!trackEl) return;
    if (trackEl.dataset.duplicated === "true") return;
    const children = Array.from(trackEl.children);
    if (!children.length) return;
    children.forEach((ch) => {
      const clone = ch.cloneNode(true) as HTMLElement;
      trackEl.appendChild(clone);
    });
    trackEl.dataset.duplicated = "true";
  }

  function stopAnimations() {
    if (leftAnimation) { leftAnimation.cancel(); leftAnimation = null; }
    if (rightAnimation) { rightAnimation.cancel(); rightAnimation = null; }
  }

  function createLoopingAnimation(trackEl: HTMLDivElement | null, pxDistance: number, durationSec: number) {
    if (!trackEl) return null;
    // make sure no conflicting CSS animation is running
    trackEl.style.animation = "none";
    // use web animations in pixels: from 0 -> -pxDistance (moves left). We'll adapt direction per track below.
    const keyframes = [
      { transform: "translate3d(0px,0,0)" },
      { transform: `translate3d(${ -Math.round(pxDistance) }px,0,0)` },
    ];
    const anim = trackEl.animate(keyframes, {
      duration: durationSec * 1000,
      iterations: Infinity,
      easing: "linear",
    });
    // ensure running
    anim.play();
    return anim;
  }

  function setupTracks() {
    stopAnimations();

    // LEFT track: move leftwards by one copy width
    ensureDuplicated(leftRef.current);
    ensureDuplicated(rightRef.current);

    // Small guard: if refs not present, skip
    if (!leftRef.current || !rightRef.current) return;

    // compute pixel distance for one copy (total duplicated width / 2)
    const leftTotal = leftRef.current.scrollWidth;
    const rightTotal = rightRef.current.scrollWidth;
    if (!leftTotal || !rightTotal) return;

    const leftOneCopy = leftTotal / 2;
    const rightOneCopy = rightTotal / 2;

    // duration seconds based on pxPerSecond
    const leftDur = Math.max(minDurationSec, leftOneCopy / pxPerSecond);
    const rightDur = Math.max(minDurationSec, rightOneCopy / pxPerSecond);

    // For left-moving row we want items to MOVE LEFT.
    // We will start the track so visually the same as your CSS: set transform to 0 initially.
    // Our web animation will animate from 0 -> -oneCopyPx and loop seamlessly.
    leftRef.current.style.transform = "translate3d(0px,0,0)";
    leftAnimation = createLoopingAnimation(leftRef.current, leftOneCopy, leftDur);

    // For right-moving row we want items to MOVE RIGHT.
    // Instead of making a negative-to-zero keyframe, we can animate from -oneCopy -> 0.
    rightRef.current.style.transform = `translate3d(${-Math.round(rightOneCopy)}px,0,0)`;
    // create animation from -oneCopy -> 0 by inverting keyframes
    if (rightRef.current) {
      // cancel CSS animation on the element
      rightRef.current.style.animation = "none";
      rightAnimation = rightRef.current.animate(
        [
          { transform: `translate3d(${-Math.round(rightOneCopy)}px,0,0)` },
          { transform: "translate3d(0px,0,0)" },
        ],
        { duration: rightDur * 1000, iterations: Infinity, easing: "linear" }
      );
      rightAnimation.play();
    }
  }

  // initial setup
  setupTracks();

  // debounce resize and recalc
  function onResize() {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      setupTracks();
      resizeTimer = null;
    }, 120);
  }
  window.addEventListener("resize", onResize);

  // watch images inside tracks so we recalc when they load
  function watchImages(trackEl: HTMLDivElement | null) {
    if (!trackEl) return;
    const imgs = Array.from(trackEl.querySelectorAll("img"));
    imgs.forEach((img) => {
      if ((img as HTMLImageElement).complete) return;
      const cb = () => {
        setupTracks();
        img.removeEventListener("load", cb);
        img.removeEventListener("error", cb);
      };
      img.addEventListener("load", cb);
      img.addEventListener("error", cb);
    });
  }
  watchImages(leftRef.current);
  watchImages(rightRef.current);

  // observe size changes as a fallback
  const roLeft = leftRef.current ? new ResizeObserver(() => setupTracks()) : null;
  const roRight = rightRef.current ? new ResizeObserver(() => setupTracks()) : null;
  if (roLeft && leftRef.current) roLeft.observe(leftRef.current);
  if (roRight && rightRef.current) roRight.observe(rightRef.current);

  return () => {
    // cleanup
    stopAnimations();
    window.removeEventListener("resize", onResize);
    if (roLeft) roLeft.disconnect();
    if (roRight) roRight.disconnect();
    if (resizeTimer) window.clearTimeout(resizeTimer);
  };
}, []);



  return (
    <section className="relative overflow-hidden bg-[#010E0A] text-white">
      <div className="container mx-auto px-5 py-11 md:px-10 lg:py-20 xl:max-w-[1180px] xl:px-0 relative z-10">
        <h2 className="mb-9 text-3xl font-bold leading-9 text-center text-white lg:text-5xl lg:leading-[48px] xl:text-[42px] xl:leading-[60px] lg:mb-14">
          Tools You Will Learn
        </h2>

        {/* Mobile marquee (seamless continuous) */}
        <div className="md:hidden space-y-4">
          <div className="marquee">
            <div ref={leftRef} className="marquee-track marquee-left">
              {firstRow.map((t, i) => (
                <div key={`f-${i}`} className="marquee-item">
                  <ToolCard tool={t} />
                </div>
              ))}
              {/* If you already had duplicates in markup, this JS will detect and skip adding more.
                  If not, the effect will clone these nodes into the track at runtime. */}
            </div>
          </div>

          <div className="marquee">
            <div ref={rightRef} className="marquee-track marquee-right">
              {secondRow.map((t, i) => (
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
