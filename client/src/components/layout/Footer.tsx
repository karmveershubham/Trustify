import Link from "next/link";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";
import logo from "@/../public/icons/logoo.png"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-100 to-blue-50 pt-20 pb-12 mt-16 text-center">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16 items-center justify-center">
          {/* Logo and about */}
          <div className="col-span-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <UserGroupIcon className="text-blue-500 h-8 w-8" /> */}
              <Image src={logo} alt="Trustify Logo" width={40} height={40} className="h-8 w-8" />
              <span className="text-2xl font-bold">Trustify</span>
            </div>
            <p className="text-gray-600 text-base mb-6 mx-auto max-w-md">
              Buy and sell safely within your trusted network. Building community through secure transactions.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center transition-transform hover:scale-110">
                <FaFacebookF size={18} color="white" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center transition-transform hover:scale-110">
                <FaXTwitter size={18} color="white" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center transition-transform hover:scale-110">
                <FaInstagram size={18} color="white" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center transition-transform hover:scale-110">
                <FaLinkedinIn size={18} color="white" />
              </a>
            </div>
          </div>

          {/* Navigation - Platform */}
          <div className="col-span-1 text-center">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">How it Works</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">Features</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">Pricing</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">FAQ</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">Download App</Link></li>
            </ul>
          </div>

          {/* Navigation - Company */}
          <div className="col-span-1 text-center">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">About Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">Careers</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">Press</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-base">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom footer with copyright */}
        <div className="pt-8 border-t border-gray-300 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-600 mb-4">© {new Date().getFullYear()} Trustify. All rights reserved.</p>
          <p className="text-sm text-gray-600 mb-4"><Link href='/developers'>Made with ❤️ by Trustify Team</Link></p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors duration-300">Terms of Service</Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
