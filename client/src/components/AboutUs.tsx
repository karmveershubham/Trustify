// components/AboutUs.tsx
import Image from 'next/image';

import IconCloud from "@/components/ui/icon-cloud";


const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export default function AboutUs() {
  return (
    <section id="about" className="w-full py-16 px-8 bg-white">
      <div className="flex flex-col md:flex-row items-center">
     
        <div className="md:w-1/2 mb-8 md:mb-0">
         <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
          <IconCloud iconSlugs={slugs} />
        </div>
        </div>
        
        <div className="md:w-1/2 p-6">
          <h2 className="text-6xl font-bold mb-6 text-left">About NeoMart</h2>
          <p className="text-lg max-w-2xl text-left">
            NeoMart is a marketplace where trust is built through your contacts. Every seller is someone
            within your network, ensuring authenticity and reliability.
          </p>
        </div>
      </div>
    </section>
  );
}
