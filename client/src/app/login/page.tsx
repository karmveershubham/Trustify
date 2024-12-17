import React from 'react'
import Image from 'next/image'
import loginImage from '../../../public/images/login.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Header from '../../components/Header'

export default function Signin() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#EDF0FD] to-white'>
      <Header />
      <div className="mt-8 flex justify-center m-10">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex items-center p-8 mx-4">
          {/* Left Section with Image */}
          <div className="w-1/2 flex items-center justify-center">
            <Image src={loginImage} alt="Login" width={400} height={330} />
          </div>

          {/* Right Section with Form */}
          <div className="w-1/2 flex flex-col space-y-6 px-6">
            <h3 className="text-2xl font-bold text-black">Welcome Back</h3>
            <p className="text-sm uppercase tracking-wide text-gray-500">Login to Continue</p>

            {/* Email Input */}
            <label className="text-sm text-black">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="h-11 w-full border border-gray-300 rounded-lg px-3"
            />

            {/* Password Input */}
            <label className="text-sm text-black">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="h-11 w-full border border-gray-300 rounded-lg pl-10"
              />
              <FontAwesomeIcon icon={faLock} className="w-[15.2px] h-[12px] absolute left-3 top-1/2 transform -translate-y-1/2  " />
            </div>

            {/* Login Button */}
            <button className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Link href="/login" className="uppercase text-sm font-medium">
                Login
              </Link>
            </button>

            {/* Signup Link */}
            <div className="flex justify-center">
              <Link href="/register">
                <span className="text-xs uppercase text-gray-500">New User? Signup</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
