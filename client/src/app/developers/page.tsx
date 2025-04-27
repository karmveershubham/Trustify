"use client";

import Image from "next/image";
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";

type SocialLinks = {
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
};

type TeamMemberType = {
  name: string;
  role: string;
  image: string;
  social: SocialLinks;
};

const webTeam: TeamMemberType[] = [
  {
    name: "Shubham Karmveer",
    role: "Full Stack Developer",
    image: "https://res.cloudinary.com/dvfz67hyi/image/upload/v1745747036/products/mvdida4re2cmhey6ywxl.png",
    social: {
      linkedin: "https://www.linkedin.com/in/shubham-karmveer/",
      github: "https://github.com/karmveershubham",
      twitter: "https://x.com/KarmveerShubham",
    },
  },
  {
    name: "Bhawana Kushwaha",
    role: "Full Stack Developer",
    image: "https://res.cloudinary.com/dvfz67hyi/image/upload/v1745747036/products/mvdida4re2cmhey6ywxl.png",
    social: {
      linkedin: "https://www.linkedin.com/in/bhawanakushwaha/",
      github: "https://github.com/Bhawnakush",
      twitter: "https://twitter.com/BhawanaKushwaha",
    },
  },
  {
    name: "Pratiksha Dixit",
    role: "Frontend Developer",
    image: "https://res.cloudinary.com/dvfz67hyi/image/upload/v1745747036/products/mvdida4re2cmhey6ywxl.png",
    social: {
      linkedin: "https://www.linkedin.com/in/pratikshadixit/",
      github: "https://github.com/d-pratiksha",
      twitter: "https://twitter.com/PratikshaDixit",
    },
  },
  {
    name: "Aniket Chaurasia",
    role: "Backend Developer",
    image: "https://res.cloudinary.com/dvfz67hyi/image/upload/v1745747036/products/mvdida4re2cmhey6ywxl.png",
    social: {
      linkedin: "https://www.linkedin.com/in/aniket-chaurasia-6a79a9175/",
      github: "https://github.com/Aniketchaurasia97",
      twitter: "https://twitter.com/AniketChaurasia",
    },
  },
];

const appTeam: TeamMemberType[] = [
  {
    name: "Mithilesh Sahu",
    role: "Mobile Lead",
    image: "https://res.cloudinary.com/dvfz67hyi/image/upload/v1745747036/products/mvdida4re2cmhey6ywxl.png",
    social: {
      linkedin: "https://www.linkedin.com/in/mithileshsahu/",
      github: "https://github.com/Mithilesh9944",
      twitter: "https://twitter.com/MithileshSahu",
    },
  },
  {
    name: "Devendra Suthiya",
    role: "iOS Developer",
    image: "https://res.cloudinary.com/dvfz67hyi/image/upload/v1745747036/products/mvdida4re2cmhey6ywxl.png",
    social: {
      linkedin: "https://www.linkedin.com/in/devendrasuthiya/",
      github: "https://github.com/DevendraSuthiya",
      twitter: "https://twitter.com/DevendraSuthiya",
    },
  },
  {
    name: "Kushal Meghwal",
    role: "Android Developer",
    image: "https://res.cloudinary.com/dvfz67hyi/image/upload/v1745747036/products/mvdida4re2cmhey6ywxl.png",
    social: {
      linkedin: "https://www.linkedin.com/in/kushalmeghwal/",
      github: "https://github.com/kushalmeghwal",
      twitter: "https://twitter.com/KushalMeghwal",
    },
  },
  {
    name: "Roshan Maharana",
    role: "QA Engineer",
    image: "https://res.cloudinary.com/dvfz67hyi/image/upload/v1745747036/products/mvdida4re2cmhey6ywxl.png",
    social: {
      linkedin: "https://www.linkedin.com/in/roshanmaharana/",
      github: "https://github.com/RoshanMaharana",
      twitter: "https://twitter.com/RoshanMaharana",
    },
  },
];

export default function TeamPage() {
  return (
    <div className="bg-blue-50 min-h-screen">
      <main className="container mx-auto px-4 pt-32 pb-12 mt-5">
        <div className="text-center mb-16">
          <div className="relative max-w-2xl mx-auto bg-blue-50 rounded-xl p-6 ">
            <h1 className="text-4xl font-bold m-4 text-blue-700">Our Team</h1>
            <p className="text-black text-base">
              Meet the talented developers behind Trustify. Our team combines expertise, creativity, and dedication to deliver high-quality solutions and drive innovation forward.
            </p>
          </div>
        </div>

        {/* Web Team Section */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-12 text-center text-blue-600">Web Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {webTeam.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </section>

        {/* App Team Section */}
        <section>
          <h2 className="text-2xl font-bold mb-12 text-center text-blue-600">App Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {appTeam.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}

type TeamMemberProps = {
  member: TeamMemberType;
};

function TeamMember({ member }: TeamMemberProps) {
  // Fallback image if none provided
  const imageSrc =
    member.image && member.image.length > 0
      ? member.image
      : "/kuchbhi";

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="p-6 text-center">
        {/* Circle image container with blue border on hover */}
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-transparent hover:border-blue-500 transition-colors duration-300">
          <Image
            src={imageSrc}
            alt={member.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>

        {/* Name and Role */}
        <h3 className="font-bold text-xl mb-1 text-blue-700">{member.name}</h3>
        <p className="text-black mb-6">{member.role}</p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4">
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-black hover:bg-blue-500 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          )}
          {member.social.github && member.social.github.length > 0 && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-black hover:bg-blue-700 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
          )}
          {member.social.twitter && member.social.twitter.length > 0 && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-black hover:bg-blue-400 hover:text-white transition-colors duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
