"use client";
// pages/team.js
import Head from 'next/head';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function TeamPage() {
  const webTeam = [
    {
      name: "Shubham Karmveer",
      role: "Full Stack Developer",
      image: "/images/team/shubham.jpg",
      social: {
        linkedin: "https://linkedin.com/in/neilreynolds",
        github: "https://github.com/neilreynolds",
        twitter: "https://twitter.com/neilreynolds"
      }
    },
    {
      name: "Bhawana Kushwaha",
      role: "Full Stack Developer",
      image: "/images/team/bhawana.jpg",
      social: {
        linkedin: "https://linkedin.com/in/bettywilson",
        github: "https://github.com/bettywilson",
        twitter: "https://twitter.com/bettywilson"
      }
    },
    {
      name: "Pratiksha Dixit",
      role: "Frontend Developer",
      image: "/images/team/pratiksha.jpg",
      social: {
        linkedin: "https://linkedin.com/in/martinsmith",
        github: "https://github.com/martinsmith",
        twitter: "https://twitter.com/martinsmith"
      }
    },
    {
      name: "Aniket Chaurasia",
      role: "Backend Developer",
      image: "/images/team/aniket.jpg",
      social: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        github: "https://github.com/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson"
      }
    }
  ];

  const appTeam = [
    {
      name: "Mithilesh Sahu",
      role: "Mobile Lead",
      image: "/images/team/mithilesh.jpg",
      social: {
        linkedin: "https://linkedin.com/in/robturner",
        github: "https://github.com/robturner",
        twitter: "https://twitter.com/robturner"
      }
    },
    {
      name: "Devendra Suthiya",
      role: "iOS Developer",
      image: "/images/team/devendra.jpg",
      social: {
        linkedin: "https://linkedin.com/in/charliegarcia",
        github: "https://github.com/charliegarcia",
        twitter: "https://twitter.com/charliegarcia"
      }
    },
    {
      name: "Kushal Meghwal",
      role: "Android Developer",
      image: "/images/team/kushal.jpg",
      social: {
        linkedin: "https://linkedin.com/in/sophiasvensson",
        github: "https://github.com/sophiasvensson",
        twitter: "https://twitter.com/sophiasvensson"
      }
    },
    {
      name: "Roshan Maharana",
      role: "QA Engineer",
      image: "/images/team/roshan.jpg",
      social: {
        linkedin: "https://linkedin.com/in/aidanscott",
        github: "https://github.com/aidanscott",
        twitter: "https://twitter.com/aidanscott"
      }
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Our Team | Trustify</title>
        <meta name="description" content="Meet our talented development team at Trustify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 fixed w-full top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-orange-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <Link href="/" className="font-bold text-xl text-gray-800">Trustify</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/why-us" className="text-gray-600 hover:text-gray-900">Why us?</Link>
            <Link href="/faqs" className="text-gray-600 hover:text-gray-900">FAQs</Link>
            <Link href="/download" className="text-gray-600 hover:text-gray-900">Download App</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">Log In</Link>
            <Link href="/get-started" className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content - with extra top padding to account for fixed navbar */}
      <main className="container mx-auto px-4 pt-32 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Our Team</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At work or at class talented development team is dedicated to building the future of our project.
          </p>
        </div>

        {/* Web Team Section */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-12 text-center">Web Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {webTeam.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </div>

        {/* App Team Section */}
        <div>
          <h2 className="text-2xl font-bold mb-12 text-center">App Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {appTeam.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Trustify. All rights reserved.</p>
      </footer>
    </div>
  );
}

function TeamMember({ member }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="p-6 text-center">
        {/* Circle image container with colored border on hover */}
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-transparent hover:border-blue-400 transition-colors duration-300">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/api/placeholder/150/150";
            }}
          />
        </div>
        
        {/* Name and Role */}
        <h3 className="font-bold text-xl mb-1">{member.name}</h3>
        <p className="text-gray-500 mb-6">{member.role}</p>
        
        {/* Social Icons */}
        <div className="flex justify-center space-x-4">
          <a 
            href={member.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a 
            href={member.social.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-800 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a 
            href={member.social.twitter} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-blue-400 hover:text-white transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}

// For the circular profile style from the second image
function CircularTeamMember({ member }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg p-8 transition-all duration-300">
      <div className="flex flex-col items-center">
        {/* Purple border circle */}
        <div className="w-32 h-32 rounded-full border-4 border-indigo-400 p-1 mb-4">
          {/* Image inside circle */}
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/api/placeholder/150/150";
              }}
            />
          </div>
        </div>
        
        {/* Name in uppercase */}
        <h3 className="font-bold text-lg uppercase tracking-wider mb-1">{member.name}</h3>
        
        {/* Role in lighter color */}
        <p className="text-indigo-300 text-sm mb-4">{member.role}</p>
        
        {/* Social icons in circles */}
        <div className="flex justify-center space-x-2">
          <a 
            href={member.social.facebook || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            <FaFacebook size={16} />
          </a>
          <a 
            href={member.social.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-300"
          >
            <FaTwitter size={16} />
          </a>
          <a 
            href={member.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-colors duration-300"
          >
            <FaLinkedin size={16} />
          </a>
          <a 
            href={member.social.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-gray-700 hover:bg-gray-700 hover:text-white transition-colors duration-300"
          >
            <FaGithub size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}