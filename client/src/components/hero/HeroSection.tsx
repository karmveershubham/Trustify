// import { motion } from "framer-motion";
// import TextEffect from "./Effect";



export default function HeroSection() {
  return (
   <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-blue-50 mt-32">
      <h1 className="text-5xl font-bold text-gray-900 leading-tight typing-animation">
        Buy & Sell Safely Within Your<span className="text-blue-500 animate-bounce"> Trusted Network</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Join our trusted marketplace where you can trade safely with your contacts.
        Build your network, make secure transactions, and discover great deals within
        your existing relationships.
      </p>
    </section>
  );
}
