"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from "react-slick";
declare module '*.css';

// You'll need to install these packages:
// npm install react-slick slick-carousel

export default function DownloadApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Fixed assignment - was using = instead of calling the function    
    // Import slider CSS
    import('slick-carousel/slick/slick.css');
    import('slick-carousel/slick/slick-theme.css');
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  // App screenshots from your project structure
  const appScreenshots = [
    '/images/app1.jpg',
    '/images/app2.jpg',
    '/images/app3.jpg',
    '/images/app4.jpg'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <main>
        {/* Navigation - smaller height */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between h-14 items-center">
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="lg:col-span-6 mb-8 lg:mb-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                  Get the Trustify App
                </h1>
                <p className="mt-3 text-base sm:text-lg text-gray-500 max-w-2xl">
                  Secure identity verification in your pocket. Protect your digital identity with blockchain technology and take control of your personal data.
                </p>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button >
                    <Image 
                      src="/images/app-store.png" 
                      alt="App Store"
                      width={200}
                      height={90}
                      className="mr-2"
                    />
                  </button>
                  <button >
                    <Image 
                      src="/images/google-play.png" 
                      alt="Google Play"
                      width={200}
                      height={90}
                      className="mr-2"
                    />
                  </button>
                </div>
                
                <div className="mt-3">
                  <div className="inline-flex items-center space-x-2 bg-indigo-50 px-3 py-1.5 rounded-full">
                    <div className="flex -space-x-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">Trusted by 10,000+ users</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-3xl shadow-lg max-w-xs mx-auto">
                  <div className="bg-white rounded-3xl overflow-hidden">
                    {mounted ? (
                      <Slider {...settings} className="trustify-app-slider">
                        {appScreenshots.map((screenshot, index) => (
                          <div key={index} className="outline-none">
                            <div className="aspect-[9/16] relative">
                              <Image
                                src={screenshot}
                                alt={`App Screenshot ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                              />
                            </div>
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <div className="aspect-[9/16] bg-gray-100 flex items-center justify-center">
                        <div className="text-center p-4">
                          <p className="text-xs text-gray-500">
                            Loading app screenshots...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QR Code Section - reduced padding and smaller elements */}
        <section className="py-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 items-center">
              <div>
                <h2 className="text-2xl font-bold">Scan & Download</h2>
                <p className="mt-2 text-sm text-indigo-100">
                  Scan the QR code to download the Trustify app.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button >
                    <Image 
                      src="/images/app-store.png" 
                      alt="App Store"
                      width={200}
                      height={90}
                      className="mr-2"
                    />
                  </button>
                  <button >
                    <Image 
                      src="/images/google-play.png" 
                      alt="Google Play"
                      width={200}
                      height={90}
                      className="mr-2"
                    />
                  </button>
                </div>
              </div>
              <div className="mt-6 lg:mt-0 flex justify-center">
                <div className="bg-white p-3 rounded-xl">
                  {/* Replace with an actual QR code image */}
                  <Image
                    src="/images/qr-code.png" 
                    alt="QR Code to download Trustify"
                    width={128}
                    height={128}
                    className="w-32 h-32"
                    // If you don't have a QR code image yet, you'll need to comment out this Image component
                    // and uncomment the placeholder div below
                  />
                  
                  {/* QR Code placeholder - uncomment if you don't have a QR code image yet
                  <div className="w-32 h-32 bg-black relative">
                    <div className="absolute inset-2 grid grid-cols-4 grid-rows-4 gap-1">
                      {Array(16).fill(0).map((_, i) => (
                        <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-0' : ''}`} />
                      ))}
                    </div>
                  </div>
                  */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}