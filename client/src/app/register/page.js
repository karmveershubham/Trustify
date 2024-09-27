import React from 'react'
import Image from 'next/image'
import loginImage from '../components/images/login.svg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import HeaderSignLogin from '../components/HeaderSignLogin';
export default function Signup() {
  return (
    <div>
      <HeaderSignLogin/>
    <div className=" mt-3 absolute w-full h-[695.89px] bg-white rounded-[20px] flex">
    {/* Left Inner Div */}
    <div className="w-1/2 h-full bg-gray-100 flex items-center justify-center relative">
        {/* SVG Image centered in the left div */}
        <Image
          src={loginImage}
          alt="Login"
          width={401.32} // Set the width
          height={327.23} // Set the height
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    {/* Right Inner Div */}
    <div className="w-1/2 h-full bg-gray-100 flex flex-col items-start justify-start relative p-6">
        {/* Heading for Register aligned to the left */}
        <h3 className="w-auto h-auto 
                      font-inter font-bold text-[28px] leading-[34px] 
                      text-[#1ABA1A]">
          Register
        </h3>
        <p className="mt-2 font-inter font-normal text-[14px] leading-[24px] text-[#999999] 
                      letter-spacing-[2px] uppercase">
          Join us
        </p>
         {/* Your Name Label below "Join us" */}
         <label className="mt-2 font-inter font-normal text-[14px] leading-[21px] text-[#000000]">
          Your Name
        </label>
        <input 
          type="text" 
          placeholder="Enter your name" 
          className="mt-2 h-[43px] w-full md:w-[calc(100%-129.89px)] bg-white border border-[#CCCCCC] rounded-[6px] p-2 pl-3"
          style={{ marginLeft: '1px' }} // Adjust left position
        />
        
        {/* Other content for the right half goes here */}
        <label className="mt-5 font-inter font-normal text-[14px] leading-[21px] text-[#000000]">
          Email Address
        </label>
        
        {/* Input Field for Email */}
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="mt-2 h-[43px] w-full md:w-[calc(100%-129.89px)] bg-white border border-[#CCCCCC] rounded-[6px] p-2 pl-3"
          style={{ marginLeft: '1px' }} // Adjust left position
        />
        <label className="mt-5 font-inter font-normal text-[14px] leading-[21px] text-[#000000]">
          Password
        </label>
        
        {/* Input Field for Password */}
        <div className="relative mt-2">
          <input 
            type="password" 
            placeholder=''
            className="h-[43px] w-full bg-white border border-[#CCCCCC] rounded-[6px] pl-10 pr-3" // Adjust padding
          />
          <div 
            className="absolute left-1 top-1/2 transform -translate-y-1/2 text-black" // Positioning
          >
            <FontAwesomeIcon icon={faLock} className="w-[15.2px] h-[12px]" />
          </div>
        </div>
        <label className="mt-4 font-inter font-normal text-[14px] leading-[21px] text-[#000000]">
          Confirm Password
        </label>

        {/* Confirm Password Input Field with Icon */}
        <div className="relative mt-2">
          <input 
            type="password" 
            className="h-[43px] w-full bg-white border border-[#CCCCCC] rounded-[6px] pl-10 pr-3"
          />
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-black">
            <FontAwesomeIcon icon={faLock} className="w-[15.2px] h-[12px]" />
          </div>
        </div>
        <div className="absolute w-[162.67px] h-[51px] left-[23px] top-[480.39px]">
  {/* Register Button */}
  <button className="w-full h-full bg-[#1ABA1A] rounded-[10px] flex items-center justify-center hover:bg-[#32CD32] transition-colors duration-300 ease-in-out">
  <span className="font-inter font-medium text-[14px] leading-[21px] text-white uppercase">
    Register
  </span>
</button>

  {/* "Already user?" Link below the Register Button */}
  <div className="mt-4 flex justify-center">
    <Link href="/login">
      <span className="font-inter font-normal text-[13px] leading-[20px] text-[#999999] uppercase">
        Already user?LOGIN here
      </span>
    </Link>
  </div>
</div>

      </div>
  </div>
  </div>
  )
}
