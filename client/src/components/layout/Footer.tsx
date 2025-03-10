import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid"; // Updated for Heroicons v2
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-100 to-orange-100 pt-16 pb-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and about */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <UsersIcon className="text-orange-500 h-6 w-6" /> {/* Heroicons v2 */}
              <span className="text-xl font-bold">Trustify</span>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Buy and sell safely within your trusted network. Building community through secure transactions.
            </p>
            <div className="flex space-x-4">
              {/* Social media links */}
              <Link href="#" className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center transition-transform hover:scale-110" />
              <Link href="#" className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center transition-transform hover:scale-110" />
              <Link href="#" className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center transition-transform hover:scale-110" />
              <Link href="#" className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center transition-transform hover:scale-110" />
            </div>
          </div>

          {/* Navigation - Platform */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">How it Works</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Features</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Pricing</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">FAQ</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Download App</Link></li>
            </ul>
          </div>

          {/* Navigation - Company */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">About Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Careers</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Press</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 transition-transform duration-300 hover:scale-105">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom footer with copyright */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm text-gray-600">© 2025 Trustify. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-xs text-gray-500 hover:text-orange-500 transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-orange-500 transition-colors duration-300">Terms of Service</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-orange-500 transition-colors duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
