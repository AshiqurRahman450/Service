"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const faqData = [
  {
    value: "item-1",
    question: "Is this a full digital marketing course?",
    answer:
      "No and that's the point. This ₹99 workshop is your first step into digital marketing. You'll learn what works, what doesn't, and where to focus next without getting overwhelmed.",
  },
  {
    value: "item-2",
    question: "Will I become a pro in one session?",
    answer:
      "Not yet but you'll know exactly how to get there. You'll get clarity, tools, early wins, and the confidence to go deeper with our advanced programs if you choose.",
  },
  {
    value: "item-3",
    question: "What if I want to learn more after this workshop?",
    answer:
      "You can! After the workshop, we'll guide you on the next steps whether it's freelancing, ads, SEO, content creation, or full-stack digital marketing.",
  },
  {
    value: "item-4",
    question:
      "I don't even know where to start. Is this workshop too advanced?",
    answer:
      "No. This is made for total beginners. We explain everything in Tamil, step-by-step and keep it simple. You'll walk away thinking: Now I finally get it.",
  },
  {
    value: "item-5",
    question: "Is this a one-time session or a long program?",
    answer:
      "This is a live, 2-Hours masterclass. No long-term commitment, no confusion — just ₹99 for real clarity. Afterward, you can decide if you want to go deeper.",
  },
  {
    value: "item-6",
    question: "Will I get access to advanced courses later?",
    answer:
      "Yes. Once you complete this session, you’ll have exclusive access to our full learning path including pro-level training, certifications, and income-building strategies.",
  },
];

const FaqSection = () => {
  return (
    <section className="bg-[#010E0A] py-13 lg:py-10 overflow-hidden">
      <div className="container mx-auto max-w-[1180px] px-5 md:px-10 xl:px-0">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white lg:text-5xl">
            Frequently Asked <span className="text-[#00C67F]">Questions</span>
          </h2>
          <p className="mt-3 text-lg text-white/70 lg:text-xl">Anything you need to know?</p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto w-full max-w-[816px]">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.value}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              >
                <AccordionItem
                  value={faq.value}
                  className={`rounded-xl 
                    bg-[linear-gradient(135deg,#059669_0%,#065F46_50%,#010E0A_100%)]
                    shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                    overflow-hidden transition-all duration-300
                    no-border
                  `}
                >
                  <AccordionTrigger
                    className="flex w-full items-center justify-between text-left text-lg font-semibold text-white lg:text-xl p-6 hover:no-underline focus:no-underline [&>svg]:h-5 [&>svg]:w-5 transition-all duration-300 border-none"
                  >
                    {faq.question}
                  </AccordionTrigger>

                  {/* Divider Line */}
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#1D4B38] to-transparent" />

                  <AccordionContent className="px-6 pb-6 pt-4 border-none">
                    <p className="text-base leading-relaxed text-white/80 lg:text-lg">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

{/* ---- CTA Section ---- */}
<div className="mt-18 py-10 mb-40 flex justify-center">
  <div
    className="w-full max-w-[1250px] rounded-2xl text-center px-2 py-10 
      shadow-[0_4px_25px_rgba(0,0,0,0.3)] border border-[#0a2b21]/40 
      relative overflow-hidden"
    style={{
      background:
        "linear-gradient(90deg, #0A1F18 0%, #063228 35%, #063228 65%, #0A1F18 100%)",
    }}
  >
    <h3 className="text-white text-3xl lg:text-6xl font-extrabold mb-6">
      Ready to Level Up? Join Now!
    </h3>

    {/* CTA Button */}
    <div className="flex justify-center">
      <button
        className="relative flex items-center justify-center overflow-hidden rounded-[10px]
        bg-gradient-to-b from-[#1FCB8D] to-[#0A3E2D]
        px-10 py-4 font-bold text-lg text-white
        shadow-[0_4px_8px_rgba(0,0,0,0.3)]
        transition-all duration-300
        hover:shadow-[0_4px_15px_rgba(0,198,127,0.3)]
        hover:scale-[1.03]"
      >
        <span className="relative z-10 flex items-center justify-center">
          Book Your Spot Now
        </span>

        {/* Shine effect */}
        <span className="absolute inset-0 overflow-hidden rounded-[10px] pointer-events-none">
          <span
            className="absolute top-[-10%] left-[-20%] h-[120%] w-[6%] rotate-[25deg]
            bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[4px]
            animate-shine-smooth"
          ></span>
        </span>
      </button>
    </div>

    {/* Rating Section */}
    <div className="mt-6 flex items-center justify-center gap-2">
      <div className="flex items-center gap-[3px]">
        {[...Array(5)].map((_, i) => (
          <Image
            key={i}
            src="https://hubble.cdn.chittiapp.com/cdn_uploads/a0605aa0-6b6a-11f0-bf6c-e151f03705cf_star-emerald-600.svg"
            alt="star"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        ))}
      </div>
      <p className="text-[#b6ffe1] text-base font-semibold leading-6">
        14K+ reviews <span className="text-white/80">(4.9 of 5)</span>
      </p>
    </div>
  </div>


        </div>
      </div>
    </section>
  );
};

export default FaqSection;