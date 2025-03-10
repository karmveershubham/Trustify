'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="container mx-auto py-4 px-4 flex items-center justify-between transition-all duration-700">
      <div className="flex items-center gap-2">
        <UserGroupIcon className="text-orange-500 h-6 w-6 animate-pulse" />
        <span className="text-xl font-bold">Trustify</span>
      </div>

      {user ? (
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
            Dashboard
          </Link>
          <Link href="/profile" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
            Profile
          </Link>
        </nav>
      ) : (
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#about" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
            About
          </Link>
          <Link href="#features" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
            Why us?
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
            FAQs
          </Link>
          <Link href="#downloadapp" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
            Download App
          </Link>
        </nav>
      )}

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
            <Button onClick={logout} className="bg-red-500 hover:bg-red-600 transition-transform duration-300 hover:scale-105">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
              Log In
            </Link>
            <Link href="/signup">
              <Button className="bg-orange-500 hover:bg-orange-600 transition-transform duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}


// DON'T REMOVE BELOW CODE

// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { UserGroupIcon } from '@heroicons/react/24/solid';

// export default function Header() {
//   return (
//     <header className="container mx-auto py-4 px-4 flex items-center justify-between transition-all duration-700">
//       <div className="flex items-center gap-2">
//         <UserGroupIcon className="text-orange-500 h-6 w-6 animate-pulse" />
//         <span className="text-xl font-bold">Trustify</span>
//       </div>
      
//       <nav className="hidden md:flex items-center gap-6">
//         <Link href="#about" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
//           About
//         </Link>
//         <Link href="#features" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
//           Why us?
//         </Link>
//         <Link href="#faq" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
//           FAQs
//         </Link>
//       </nav>
      
//       <div className="flex items-center gap-4">
//         <Link href="/login" className="text-sm font-medium hover:underline hover:text-orange-500 transition-colors duration-300">
//           Log In
//         </Link>
//         <Button className="bg-orange-500 hover:bg-orange-600 transition-transform duration-300 hover:scale-105">
//           Get Started
//         </Button>
//       </div>
//     </header>
//   );
// }
