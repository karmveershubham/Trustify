import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon, ListBulletIcon } from '@heroicons/react/24/solid';

const features = [
  {
    title: 'Buy Safely',
    description: 'Purchase items from verified contacts in your network',
    image: '/images/buy-safely.jpg',
    delay: '0ms',
  },
  {
    title: 'Sell Easily',
    description: 'List your items and reach trusted buyers instantly',
    image: '/images/sell-easily.jpg',
    delay: '200ms',
  },
  {
    title: 'Build Trust',
    description: 'Grow your network with verified connections',
    image: '/images/build-trust.jpg',
    delay: '400ms',
  },
];

export default function FeaturedCards() {
  return (
    <>
      <section className="container mx-auto px-6 py-10">
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="border-2 shadow-sm max-w-xs mx-auto w-full transition-all duration-700 hover:shadow-lg hover:-translate-y-2 fade-in-up"
            style={{ animationDelay: feature.delay }}
          >
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{feature.description}</p>
              <div className="relative h-48 w-full mb-3">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  style={{ objectFit: "cover" }} 
                  className="rounded-lg transition-transform duration-500 hover:scale-105"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

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
