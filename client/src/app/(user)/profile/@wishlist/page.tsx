"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Your Wishlist</h2>
      <div className="bg-blue-50 p-8 rounded-lg text-center border border-blue-100">
        <HeartIcon className="h-12 w-12 mx-auto text-blue-400 mb-2" />
        <p className="text-gray-700">Your wishlist is empty.</p>
        <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/products">Discover Products</Link>
        </Button>
      </div>
    </div>
  );
} 