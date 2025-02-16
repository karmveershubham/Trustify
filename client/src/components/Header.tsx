import React from 'react'
import logo from '../../public/icons/Preview.png'
import Image from 'next/image'
import Link from 'next/link'
function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-slate-200 bg-opacity-10 z-50  backdrop-blur-2xl flex justify-between items-center p-4 bg-transparent mb-5">
        <div className="flex items-cente">
          <Image src={logo} alt="Logo" width={48} height={60} />
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 ml-3 p-2 bg-transparent rounded-sm">
            Trustify
          </h1>
        </div>
 
        <div className="hidden sm:flex space-x-4 lg:space-x-6">
          <Link href="/product" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            Home
          </Link>
          <a href="/product" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            Products
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
            About Us
          </a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base lg:text-lg">
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
    </>
  )
}

export default Header;
