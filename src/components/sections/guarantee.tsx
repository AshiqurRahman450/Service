"use client";

import Image from "next/image";

const GuaranteeSection = () => {
  return (
    <section className="bg-[#010E0A] text-center py-20 px-6">
      {/* Top small green text */}
      <p className="text-[#00C67F] text-lg font-medium mb-3">
        Still not sure?
      </p>

      {/* Main heading */}
      <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-15">
        100% Satisfaction Guaranteed
      </h2>

      {/* Guarantee Badge */}
      <div className="flex justify-center mb-12">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/29b39e50-6b6d-11f0-b3a6-57b8fa68490e_100percent-guaranteed_min-13.webp?"
          alt="100% Satisfaction Guaranteed badge"
          width={600}
          height={180}
          className="w-[480px] md:w-[580px] object-contain mx-auto"
        />
      </div>

      {/* Heading above video */}
      <h3 className="text-white font-extrabold text-5xl md:text-5xl mb-14 mt-25">
        Book Your Spot Now!
      </h3>

      {/* Video box */}
      <div className="flex justify-center">
        <div className="w-[90%] md:w-[600px] aspect-video rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.4)]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
            title="Workshop Preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
