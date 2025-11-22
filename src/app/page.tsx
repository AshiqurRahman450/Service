"use client";

import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import ProblemsSection from "@/components/sections/problems";
import SolutionsSection from "@/components/sections/solutions";
import VideoCta from "@/components/sections/video-cta";
import ToolsSection from "@/components/sections/tools";
import ComparisonSection from "@/components/sections/comparison";
import BonusesSection from "@/components/sections/bonuses";
import BeforeAfter from "@/components/sections/before-after";
import CertificationSection from "@/components/sections/certification";
import GuaranteeSection from "@/components/sections/guarantee";
import FaqSection from "@/components/sections/faq";
import FloatingCta from "@/components/sections/floating-cta";

export default function Home() { 
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main>
        <HeroSection />
        <ProblemsSection />
        <SolutionsSection />
        <VideoCta />
        <ToolsSection />
        <ComparisonSection />
        <BonusesSection />
        <BeforeAfter />
        <CertificationSection />
        <GuaranteeSection />
        <FaqSection />
        <FloatingCta />
      </main>
    </div>
  );
}