import React from 'react';
import { Button } from '@/components/ui/button';
import { UserGroupIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const faqItems = [
  {
    question: "How does Trustify ensure safe transactions?",
    answer: "Trustify allows you to buy and sell a variety of items, including electronics, furniture, clothing, and second-hand goods, all within your trusted network. By limiting transactions to verified connections, we reduce the risk of scams and provide a layer of accountability not found on traditional marketplaces."
  },
  {
    question: "What makes Trustify different from other marketplaces?",
    answer: "Unlike traditional marketplaces where you deal with strangers, Trustify connects you exclusively with people in your verified network—friends, colleagues, and trusted contacts. This creates a safer environment for buying and selling items with built-in accountability and trust."
  },
  {
    question: "How do I verify my contacts on Trustify?",
    answer: "Verification happens through mutual confirmation and optional social media integration. When you add a contact, they'll receive a request to confirm your connection. Once confirmed, you can both see each other's listings and engage in transactions."
  },
  {
    question: "Is there a fee for using Trustify?",
    answer: "Basic usage of Trustify is free, including listing items and communicating with your network. We charge a small service fee only when a transaction is successfully completed, helping us maintain the platform while keeping it accessible to everyone."
  },
  {
    question: "How do I list an item for sale on Trustify?",
    answer: "Simply tap the 'Sell' button, add photos of your item, write a description, set your price, and choose whether to make it visible to your entire network or specific contacts. Your listing will immediately be visible to your verified connections."
  },
  {
    question: "What happens if I have an issue with a purchase?",
    answer: "Since transactions happen within your trusted network, most issues can be resolved directly. However, Trustify offers a resolution center where you can report problems and get support from our team if needed. Our goal is to maintain trust within the community."
  }
];

export default function FaqSection() {
  return (
    <section id="faq" className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left side - Heading */}
          <div className="md:col-span-1">
            <p className="text-orange-500 font-medium mb-2 animate-pulse">Faq</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2 transition-transform duration-300 hover:scale-105 shadow-md">
              <UserGroupIcon className="h-5 w-5" />
              Join Community
            </Button>
          </div>

          {/* Right side - FAQ items */}
          <div className="md:col-span-2 space-y-3">
            {faqItems.map((item, index) => (
              <div key={index} id={`faq${index}`} className="faq-item bg-white rounded-lg shadow p-4 transition-all">
                <a href={`#faq${index}`} className="flex justify-between items-center text-lg font-semibold text-gray-900">
                  {item.question}
                  <ChevronDownIcon className="faq-icon h-5 w-5 text-gray-600 transition-transform duration-300" />
                </a>
                <div className="faq-answer text-gray-600 text-sm">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
