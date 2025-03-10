'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { UserGroupIcon, StarIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/solid';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - About Content */}
          <div className="about-content">
            <div className="inline-block bg-orange-100 px-3 py-1 rounded-full mb-3">
              <p className="text-orange-600 font-medium text-sm">Our Mission</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Building Trust Through Community</h2>

            <div className="space-y-4 text-gray-600">
              <p>Trustify connects you exclusively with people you know and trust for buying and selling items, eliminating the risks of anonymous marketplace transactions.</p>
              <p>Turn your network into your marketplace—deal with friends, colleagues, and verified contacts in a secure ecosystem backed by real relationships.</p>
              <p>Simple. Safe. Social. From electronics to furniture, discover items within your trusted community.</p>
            </div>

            <div className="mt-8">
              <Button className="about-button">Learn More About Our Story</Button>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="about-image relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 shadow-xl w-full h-80 overflow-hidden border border-orange-200">
                {/* Center node (user) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <UserGroupIcon className="h-8 w-8 text-white" />
                </div>

                {/* Floating Icons */}
                <div className="absolute top-1/4 right-1/4">
                  <CreditCardIcon className="h-6 w-6 text-orange-500" />
                </div>
                <div className="absolute bottom-1/3 left-1/5">
                  <ShieldCheckIcon className="h-6 w-6 text-orange-500" />
                </div>
                <div className="absolute top-2/3 right-1/5">
                  <StarIcon className="h-6 w-6 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
