'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { useRouter, usePathname } from "next/navigation";
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from "@/services/store";
import { RootState } from "@/services/store";
import { logout, fetchUser } from "@/services/slices/authSlices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Contact, Heart, LogOut, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import NotificationButton from './NotificationButton';

export default function Header() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [dispatch, user]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 w-full z-50 shadow-sm backdrop-blur-2xl bg-opacity-10">
      <header className="container mx-auto py-4 px-4 flex items-center justify-between transition-all duration-700">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <UserGroupIcon className="text-blue-500 h-6 w-6 animate-pulse" />
          <span className="text-xl font-bold">
            <Link href="/">Trustify</Link>
          </span>
        </div>

        {/* Navigation Links */}
        {pathname === '/' && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline hover:text-blue-500 transition-colors duration-300">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline hover:text-blue-500 transition-colors duration-300">
              About
            </Link>
            <Link href="#features" className="text-sm font-medium hover:underline hover:text-blue-500 transition-colors duration-300">
              Why us?
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:underline hover:text-blue-500 transition-colors duration-300">
              FAQs
            </Link>
            <Link href="#downloadapp" className="text-sm font-medium hover:underline hover:text-blue-500 transition-colors duration-300">
              Download App
            </Link>
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/wishlist">
                <Heart className="h-7 w-7 text-gray-600 cursor-pointer mb-2 hover:scale-105 transition-transform" />
              </Link>
              <NotificationButton userId={user?.id} />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-col items-center space-y-1 outline-none">
                  <Avatar className="h-9 w-9 border-2 border-green-500 hover:scale-105 transition-transform">
                    <AvatarImage src={user?.profile_picture || undefined} alt={user?.name} />
                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600">{user?.name}</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40 mt-2 bg-white shadow-lg rounded-xl">
                  <DropdownMenuItem className='hover:bg-cyan-50 transition-colors duration-300'>
                    <User/>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='hover:bg-cyan-50 transition-colors duration-300'>
                    <Contact/>
                    <Link href="/contacts">Contacts</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='hover:bg-cyan-50 transition-colors duration-300'>
                    <ShoppingBag/>
                    <Link href="/products">Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className='cursor-pointer bg-red-500 hover:bg-red-600 transition-colors duration-300'>
                    <LogOut/>
                    {isLoading ? 'Logging out...' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:underline hover:text-blue-500 transition-colors duration-300">
              Log In
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}
