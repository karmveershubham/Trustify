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


// 'use client';

// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { UserGroupIcon, StarIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/solid';

// const AboutSection: React.FC = () => {
//   return (
//     <section id="about" className="about-section">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           {/* Left Side - About Content */}
//           <div className="about-content">
//             <div className="inline-block bg-orange-100 px-3 py-1 rounded-full mb-3">
//               <p className="text-orange-600 font-medium text-sm">Our Mission</p>
//             </div>
//             <h2 className="text-4xl font-bold text-gray-900 mb-6">Building Trust Through Community</h2>

//             <div className="space-y-4 text-gray-600">
//               <p>Trustify connects you exclusively with people you know and trust for buying and selling items, eliminating the risks of anonymous marketplace transactions.</p>
//               <p>Turn your network into your marketplace—deal with friends, colleagues, and verified contacts in a secure ecosystem backed by real relationships.</p>
//               <p>Simple. Safe. Social. From electronics to furniture, discover items within your trusted community.</p>
//             </div>

//             <div className="mt-8">
//               <Button className="about-button">Learn More About Our Story</Button>
//             </div>
//           </div>

//           {/* Right Side - Illustration */}
//           <div className="about-image relative">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 shadow-xl w-full h-80 overflow-hidden border border-orange-200">
//                 {/* Center node (user) */}
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
//                   <UserGroupIcon className="h-8 w-8 text-white" />
//                 </div>

//                 {/* Floating Icons */}
//                 <div className="absolute top-1/4 right-1/4">
//                   <CreditCardIcon className="h-6 w-6 text-orange-500" />
//                 </div>
//                 <div className="absolute bottom-1/3 left-1/5">
//                   <ShieldCheckIcon className="h-6 w-6 text-orange-500" />
//                 </div>
//                 <div className="absolute top-2/3 right-1/5">
//                   <StarIcon className="h-6 w-6 text-amber-400" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;