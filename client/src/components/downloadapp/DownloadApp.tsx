import React from 'react';
import Image from 'next/image';

export default function DownloadApp() {
  return (
    <section id="downloadapp" className="download-section ">
      <h3 className="text-3xl font-bold text-gray-900">Get the Trustify App</h3>
      <p className="mt-3 text-lg text-gray-600 max-w-lg mx-auto">
        Download our app for a seamless experience and secure transactions within your trusted network.
      </p>
      <div className="download-image">
        <Image
          src="/images/google-play.png" 
          alt="Download on Google Play"
          width={200}
          height={90}
        />
      </div>
    </section>
  );
}
