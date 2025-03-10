'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon, ListBulletIcon } from '@heroicons/react/24/solid';

export default function FeaturedCards() {
  return (
    <>
      <section className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <Card className="border-2 shadow-sm max-w-xs mx-auto w-full transition-all duration-700 hover:shadow-lg hover:-translate-y-2 fade-in-up">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-bold mb-1">Buy Safely</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Purchase items from verified contacts in your network
              </p>
              <img 
                src="/images/buy-safely.jpg" 
                alt="Buy safely illustration" 
                className="h-48 w-full object-cover rounded-lg mb-3 transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/api/placeholder/400/300";
                }}
              />              
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="border-2 shadow-sm max-w-xs mx-auto w-[90%] transition-all duration-700 hover:shadow-lg hover:-translate-y-2 fade-in-up" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-bold mb-1">Sell Easily</h3>
              <p className="text-gray-600 mb-4 text-sm">
                List your items and reach trusted buyers instantly
              </p>
              <img 
                src="/images/sell-easily.jpg" 
                alt="Sell easily illustration" 
                className="h-48 w-full object-cover rounded-lg mb-3 transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/api/placeholder/400/300";
                }}
              />
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="border-2 shadow-sm max-w-xs mx-auto w-full transition-all duration-700 hover:shadow-lg hover:-translate-y-2 fade-in-up" style={{ animationDelay: '400ms' }}>
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-bold mb-1">Build Trust</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Grow your network with verified connections
              </p>
              <img 
                src="/images/build-trust.jpg" 
                alt="Build trust illustration" 
                className="h-48 w-full object-cover rounded-lg mb-3 transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/api/placeholder/400/300";
                }}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="container mx-auto px-4 py-8 text-center fade-in-up" style={{ animationDelay: '600ms' }}>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2 transition-transform duration-300 hover:scale-105 shadow-md">
            <MagnifyingGlassIcon className="h-5 w-5" />
            Browse Items
          </Button>
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            <ListBulletIcon className="h-5 w-5" />
            List an item
          </Button>
        </div>
      </section>
    </>
  );
}
