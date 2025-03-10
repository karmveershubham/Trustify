'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { StarIcon, ShieldCheckIcon, CheckCircleIcon, ChatBubbleLeftRightIcon} from '@heroicons/react/24/solid';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="container mx-auto px-4 py-12 about-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 px-3 py-1 rounded-full mb-3">
            <p className="text-orange-600 font-medium text-sm">Our Mission</p>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Building Trust Through Community</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Trustify connects you exclusively with people you know and trust for buying and selling items, eliminating the risks of anonymous marketplace transactions.
          </p>
        </div>

        {/* Chessboard Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-700 hover:shadow-lg hover:-translate-y-2">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center transition-transform duration-500 hover:scale-110">
                <ChatBubbleLeftRightIcon className="text-orange-500 h-5 w-5 animate-pulse-slow" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Verified Contacts</h3>
            <p className="text-center text-gray-600 text-sm">
              Trade only with people connected through your trusted network.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-700 hover:shadow-lg hover:-translate-y-2">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center transition-transform duration-500 hover:scale-110">
                <ShieldCheckIcon className="text-orange-500 h-5 w-5 animate-pulse-slow" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Secure Transactions</h3>
            <p className="text-center text-gray-600 text-sm">
              Protected payments and verified escrow services.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-700 hover:shadow-lg hover:-translate-y-2">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center transition-transform duration-500 hover:scale-110">
                <StarIcon className="text-orange-500 h-5 w-5 animate-spin-slow" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Trust Score</h3>
            <p className="text-center text-gray-600 text-sm">
              Build your reputation with every successful transaction.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-700 hover:shadow-lg hover:-translate-y-2">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center transition-transform duration-500 hover:scale-110">
                <CheckCircleIcon className="text-orange-500 h-5 w-5 animate-pulse-slow" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Quality Assured</h3>
            <p className="text-center text-gray-600 text-sm">
              Verified product conditions and detailed inspection reports for peace of mind.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button className="about-button">Learn More About Our Story</Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
