import React from "react";

const Header = () => {
  return (
    <header
      className="w-full z-50 bg-[#010E0A] border-b border-white/10 backdrop-blur-sm"
    >
      <div className="container mx-auto flex items-center justify-center py-4 px-5 md:px-10">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl text-center">
          Crew
        </h1>
      </div>
    </header>
  );
};

export default Header;
