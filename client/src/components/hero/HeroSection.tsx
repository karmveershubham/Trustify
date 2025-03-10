import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-[#FEFBEF]">
      <h1 className="text-5xl font-bold text-gray-900 leading-tight typing-animation">
        Buy & Sell Safely Within Your<span className="text-orange-500">Trusted Network</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Join our trusted marketplace where you can trade safely with your contacts.
        Build your network, make secure transactions, and discover great deals within
        your existing relationships.
      </p>
    </section>
  );
};

export default Hero;
