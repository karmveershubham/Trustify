"use client";
import { motion } from "framer-motion";
import TextEffect from "./Effect";



export default function HeroSection() {
  return (
    <motion.section  
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center py-16 px-6 bg-[#FEFBEF] pt-28">
      <h1 className="text-6xl md:text-8xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
        Trustify
      </h1>

      <TextEffect/>

      <p className="sm:text-sm md:text-base mt-4  text-gray-600 max-w-2xl">
        Join our trusted marketplace where you can trade safely with your contacts.
        Build your network, make secure transactions, and discover great deals within
        your existing relationships.
      </p>
    </motion.section>
  );
}
