'use client';
import { useState, useEffect } from "react";
const words = ["Trusted Network", "Friends", "Contacts", "Family"];

export default function Effect() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
    }, 2500); 

    return () => clearInterval(interval);
    }, []);

    return (
        <h1 className="text-2xl md:text-4xl font-bold mt-3 text-gray-900 leading-tight animate-bounce">
            Buy & Sell Safely Within Your{" "}
            <span className="text-orange-500 inline-block">
            {words[index]}
            </span>
        </h1>
    );
}