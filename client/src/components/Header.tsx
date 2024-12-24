import React from 'react'
import logo from '../../public/icons/Preview.png'
import Image from 'next/image'
import Link from 'next/link'
function Header() {
  return (
    <div className='relative flex flex-col'>
    <div className="relative w-full h-[50px] bg-white rounded-[10px]">
      {/* Outer div content */}
      
      {/* Inner centered div (Nav) */}
      <div className="absolute w-[1330px] h-[25px] bg-white rounded-[10px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Most inner div (Group 3694) */}
        <div className="absolute w-[172px] h-[50px] left-[15px] top-0">
          {/* Content for Group 3694 goes here */}
          
          {/* Group 3655 */}
          <div className="absolute w-[122px] h-[40px] left-[65px] top-[5px]">
            {/* Content for Group 3655 goes here */}
            
            {/* Rectangle 1 */}
            <div className="absolute w-[100px] h-[30px] left-[-110px] flex items-center justify-center  bg-[#D9D9D9] rounded-[20px] top-1/4 transform -translate-y-1/2">
              {/* Content for Rectangle 1 goes here */}
              <h1 className="top-[16px] flex items-center text-center underline text-black font-bold text-[12px] leading-[18px]">Trustify</h1>
            </div>
          </div>

          {/* Link */}
          <div className="absolute w-[161px] h-[50px] left-[15px] top-1/2 transform -translate-y-1/2">
            {/* Content for Link goes here */}  <div className="absolute left-[-90px] top-1/3 transform -translate-y-1/3"> {/* Change left to a negative value */}
      <Image
        src={logo}
        alt="Logo"
        width={50}  // Width in pixels
        height={80} // Height in pixels
        className="w-[25px] h-[25px] mb-4"
      />
    </div>

   
          </div>
          <div className="absolute w-[50px] h-[30px] left-[1200px] top-1/4 transform -translate-y-1/2">
      {/* Content for text item goes here */}
      <div className="absolute w-[127.28px] h-[21px] left-[-0.5px] top-[16.75px] flex items-center uppercase text-black font-bold text-[10px] leading-[21px]">
  <Link href="/login" className="hover:underline">
    Log in
  </Link>
  <span className="mx-1">/</span>
  <Link href="/register" className="hover:underline">
    Register
  </Link>
</div>
    <div className="absolute w-[56px] h-[16.5px] left-[-0.5px] top-[0.25px] flex items-center uppercase text-[#666666] font-normal text-[11px] leading-[16px]">
      {/* Content for the small text goes here */}
      welcome
    </div>
    </div>
        </div>
      </div>
    </div>
    <div className=" mt-3 relative w-full h-[50px] bg-white rounded-[10px]">
    <div className="absolute w-[40.24px] h-[21px] left-[30px] top-[15px] font-inter font-bold text-[14px] leading-[21px] flex items-center text-[#999999]">
  {/* Content goes here */}
  <Link href="/home" className="hover:underline">
    HOME
  </Link>
</div>
    </div>

  

  </div>
  )
}

export default Header;
