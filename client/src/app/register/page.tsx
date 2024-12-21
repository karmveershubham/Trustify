'use client'; 
import React from 'react';
import Image from 'next/image';
import loginImage from '../../../public/images/login.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import HeaderSignLogin from '../../components/Header';

export default function Signup() {
  const handleGoogleSignIn = () => {
    window.location.href = `http://localhost:8080/auth/google`;
  };

  return (
    <div>
      <HeaderSignLogin />
      <div className="mt-3 absolute w-full h-[695.89px] bg-[#FAF9F6] rounded-[20px] flex">
        {/* Left Inner Div */}
        <div className="w-1/2 h-full bg-gray-100 flex items-center justify-center relative">
          <Image
            src={loginImage}
            alt="Login"
            width={401.32}
            height={327.23}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Right Inner Div */}
        <div className="w-1/2 h-full bg-gray-100 flex flex-col items-start justify-start relative p-6">
          <h3 className="font-inter font-bold text-[28px] leading-[34px] text-[#1ABA1A]">
            Register
          </h3>
          <p className="mt-2 font-inter text-[14px] leading-[24px] text-[#999999] uppercase">
            Join us
          </p>

          {/* Name Input */}
          <label className="mt-2 font-inter text-[14px] leading-[21px] text-[#000000]">Your Name</label>
          <input 
            type="text" 
            placeholder="Enter your name" 
            className="mt-2 h-[43px] w-full bg-white border border-[#CCCCCC] rounded-[6px] p-2 pl-3"
          />

          {/* Email Input */}
          <label className="mt-5 font-inter text-[14px] leading-[21px] text-[#000000]">Email Address</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="mt-2 h-[43px] w-full bg-white border border-[#CCCCCC] rounded-[6px] p-2 pl-3"
          />

          {/* Password Input */}
          <label className="mt-5 font-inter text-[14px] leading-[21px] text-[#000000]">Password</label>
          <div className="relative mt-2">
            <input 
              type="password" 
              className="h-[43px] w-full bg-white border border-[#CCCCCC] rounded-[6px] pl-10 pr-3"
            />
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-black">
              <FontAwesomeIcon icon={faLock} className="w-[15.2px] h-[12px]" />
            </div>
          </div>

          {/* Confirm Password Input */}
          <label className="mt-4 font-inter text-[14px] leading-[21px] text-[#000000]">Confirm Password</label>
          <div className="relative mt-2">
            <input 
              type="password" 
              className="h-[43px] w-full bg-white border border-[#CCCCCC] rounded-[6px] pl-10 pr-3"
            />
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-black">
              <FontAwesomeIcon icon={faLock} className="w-[15.2px] h-[12px]" />
            </div>
          </div>

        


          {/* Register Button */}
          <div className="mt-6 w-full">
            <button className="w-full h-[51px] bg-[#1ABA1A] rounded-[10px] flex items-center justify-center hover:bg-[#32CD32] transition-colors duration-300 ease-in-out">
              <span className="font-inter text-[14px] leading-[21px] text-white uppercase">Register</span>
            </button>
          </div>

          {/* "Already user?" Link */}
          <div className="mt-4">
            <Link href="/login">
              <span className="font-inter text-[13px] leading-[20px] text-[#999999] uppercase">
                Already user? LOGIN here
              </span>
            </Link>
          </div>

          {/* OR Line */}
          <div className="mt-6 flex items-center w-full">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
           {/* Google Sign In Button */}
           <div className="mt-6 w-full flex justify-center">
            <button 
              onClick={handleGoogleSignIn} 
              className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <Image 
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                width={24} // Adjust as needed
                height={24} // Adjust as needed
              />
              <span>Sign up with Google</span>
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}
