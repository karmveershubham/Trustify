import Image from 'next/image'
import React from 'react'

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg',
  '/images/image6.jpg',
  '/images/image7.jpg',
]

export default function Cards() {
  return (
    <div className="pt-20 pb-6 bg-gray-100"> {/* Added padding-top for space on top */}
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {images.map((src, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Image
                src={src}
                width={300}
                height={200}
                alt={`Image ${index + 2}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
