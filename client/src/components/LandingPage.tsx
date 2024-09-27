import React from 'react';
import Image from 'next/image'; // Assuming you're using Next.js Image component
import Link from 'next/link';
import NeoImage from '../../public/images/feature.png';
import logo from '../../public/icons/logo.png'

const Landing: React.FC = () => {
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-[#EDF0FD] to-white flex flex-col ">
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 bg-transparent">
        {/* Left Div - Logo */}
        <div className="flex items-center">
          <Image
            src={logo} 
            alt="Logo"
            width={40}  
            height={60}
          />
           <h2 className="text-1xl font-bold text-gray-800 ml-3  p-2 bg-gray-200 rounded-lg">NEOMART</h2>
        </div>

        {/* Middle Div - Navigation */}
        <div className="flex space-x-6">
          <Link href="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
          <a href="#" className="text-gray-700 hover:text-blue-600">Products</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">About Us</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
        </div>

        {/* Right Div - Login & Get Started */}
        <div className="flex space-x-4">
          <Link href="/login" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Log In</Link>
          <Link href="/register" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Get Started</Link>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex justify-around items-center mt-16 px-12 ml-15 mr-15">
        {/* Left Div - Site Info */}
        <div className="max-w-lg p-8 m-4">
          <h1 className="text-7xl font-bold text-gray-800 mb-4">NeoMart</h1> {/* Increased font size for NeoMart */}
          <h2 className="text-3xl text-gray-600 mb-6">Buy Smart, Sell Easy</h2> {/* Increased font size for tagline */}
          <p className="text-md text-gray-600 opacity-70 mb-4"> {/* Smaller text and lower opacity */}
            NeoMart is your go-to platform for buying and selling products quickly and safely.
            Enjoy a hassle-free eCommerce experience designed for smart shoppers and sellers.
          </p>
          <div className="flex flex-col space-y-4">
            <p className="text-lg text-gray-600"><Link href="/register" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Get Started</Link></p>
            <p className="text-lg text-gray-600"><Link href="/login" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Log In</Link></p>
          </div>
        </div>

        {/* Right Div - Image */}
        <div className="max-w-lg">
          <Image
            src={NeoImage}
            alt="NeoMart Image"
            width={550} // Adjusted width to cover more space
            height={400} // Adjusted height for balance
            className="mr-0"
          />
        </div>
      </main>
    </div>
  );
};

export default Landing;
