import React from 'react'
import Header from '../../components/Header'
import Image from 'next/image'
import logo from '../../public/icons/logo.png'

function Home() {
  return (
    <div>
        <div className='relative w-full h-[50px] bg-white rounded-[10px]'>
            <div>
                <h1 className="flex items-center text-center text-black font-bold text-[15px] leading-[18px]">Trustify</h1>
            </div>
            <div>
              <Image
                  src={logo}
                  alt="Logo"
                  width={50}  // Width in pixels
                  height={80} // Height in pixels
                  className="w-[25px] h-[25px] mb-4"
                />
            </div>
        </div>

        {/* <div>hiii</div> */}
        {/* <div className="flex justify-center p-4">
            <Input type="search" placeholder="Search here" className="w-full max-w-md" />
        </div> */}

    </div>
  )
}

export default Home