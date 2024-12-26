import React from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import NeoImage from '../../public/images/feature.png';
import logo from '../../public/icons/logoo.png';
import BlurFade from '@/components/ui/blur-fade';

const Hero: React.FC = () => {
  return (
    <div className=" bg-gradient-to-b from-[#EDF0FD] to-white flex flex-col">
    
      <header className="fixed top-0 left-0 w-full bg-slate-200 bg-opacity-10 z-50  backdrop-blur-2xl flex justify-between items-center p-4 bg-transparent mb-5">
        
        {/* <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"> */}
        <div className="flex items-cente">
          <Image src={logo} alt="Logo" width={48} height={60} />
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 ml-3 p-2 bg-transparent rounded-sm">
            Trustify
          </h1>
        </div>

        
        <div className="hidden sm:flex space-x-4 lg:space-x-6">
          <Link href="/home" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            Home
          </Link>
          <a href="#" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            Products
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            About Us
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            Contact
          </a>
        </div>

     
        <div className="flex space-x-2 sm:space-x-4">
          <Link href="/login" className="bg-green-600 text-white py-2 px-3 sm:px-4 rounded hover:bg-green-700 text-sm sm:text-base">
            Log In
          </Link>
          <Link href="/register" className="bg-blue-600 text-white py-2 px-3 sm:px-4 rounded hover:bg-blue-700 text-sm sm:text-base">
            Get Started
          </Link>
        </div>
      </header>


      <main className="flex flex-col lg:flex-row justify-around items-center mt-12 lg:mt-16 px-4 sm:px-12 lg:px-16">
    
        <div className="max-w-lg p-6 sm:p-8 m-4 text-center lg:text-left">
          <BlurFade delay={0.1} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">Trustify</h1>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 mb-6">Buy Smart, Sell Easy</h2>
          </BlurFade>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 opacity-80 mb-4">
            Trustify is your go-to platform for buying and selling products quickly and safely.
            Enjoy a hassle-free eCommerce experience designed for smart shoppers and sellers.
          </p>

          <div className="flex flex-col space-y-4 sm:space-y-4">
            <p className="text-base sm:text-lg lg:text-xl mb-4">
              <Link href="/register" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
            </p>
            <p className="text-base sm:text-lg lg:text-xl mt-4">
              <Link  href="/login"   className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700">
                Log In
              </Link>
            </p>

          </div>
        </div>

        <div className="max-w-2xl">
          <Image
            src={NeoImage}
            alt="NeoMart Image"
            className="mr-0"
          />
        </div>

      </main>
    </div>
  );
};

export default Hero;
