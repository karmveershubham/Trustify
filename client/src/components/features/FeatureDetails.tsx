import React from 'react';
import { StarIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

export default function FeatureDetails() {
  return (
    <section id="features" className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Feature 1 */}
        <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-700 hover:shadow-lg hover:-translate-y-2 fade-in-up">
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center transition-transform duration-500 hover:scale-110">
              <StarIcon className="text-orange-500 h-5 w-5 animate-spin-slow" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Verified Contacts</h3>
          <p className="text-center text-gray-600 text-sm">
            Trade only with people connected through your trusted network.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-700 hover:shadow-lg hover:-translate-y-2 fade-in-up" style={{ animationDelay: '200ms' }}>
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
        <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-700 hover:shadow-lg hover:-translate-y-2 fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center transition-transform duration-500 hover:scale-110">
              <StarIcon className="text-orange-500 h-5 w-5 animate-bounce-slow" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Trust Score</h3>
          <p className="text-center text-gray-600 text-sm">
            Build your reputation with every successful transaction.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-lg p-6 shadow-sm transition-all duration-700 hover:shadow-lg hover:-translate-y-2 fade-in-up" style={{ animationDelay: '600ms' }}>
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
    </section>
  );
}
