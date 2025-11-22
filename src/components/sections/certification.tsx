"use client";

import Image from "next/image";

const CertificationSection = () => {
  return (
    <section className="bg-[#010E0A] py-10 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1250px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-16">
        {/* LEFT SECTION */}
        <div className="flex-1 text-white mt-2">
          {/* Title */}
          <h2 className="text-[42px] md:text-[52px] font-extrabold leading-[1.2] mb-5">
            <span className="text-[#00C67F]">Certification</span>{" "}
            <span>That Opens Doors</span>
          </h2>

          {/* Subtext */}
          <p className="text-[18px] text-white/85 mb-10">
            Participation Certificate will be provided.
          </p>

          {/* Bullet Points */}
          <div className="flex flex-col gap-7">
            {/* Point 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#0F2922] p-3.5 rounded-lg flex items-center justify-center shrink-0">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/992/992700.png"
                  alt="Certificate icon"
                  width={26}
                  height={26}
                  className="invert opacity-90"
                />
              </div>
              <p className="text-[17px] leading-[1.8] text-white/90">
                Earn an industry-recognized digital marketing certificate on
                course completion.
              </p>
            </div>

            {/* Point 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-[#0F2922] p-3.5 rounded-lg flex items-center justify-center shrink-0">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt="Crown icon"
                  width={26}
                  height={26}
                  className="invert opacity-90"
                />
              </div>
              <p className="text-[17px] leading-[1.8] text-white/90">
                Showcase your new skills to employers, clients, and your
                professional network.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex-1 flex items-start justify-center">
          <div className="bg-[#0E1F1A] rounded-2xl p-5 lg:p-7 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/34735408-3a48-4ce4-8304-1db8f0cbc244-uptor-in/assets/images/a605e2a0-a129-11f0-8e79-f73c4cacfbd4_11-12.jpg?"
              alt="Certificate"
              width={550}
              height={400}
              className="rounded-xl w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationSection;
