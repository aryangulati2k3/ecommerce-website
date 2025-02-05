import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-color py-10 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {/* Brand and Tagline */}
        <div>
          <Link href="/" className="text-4xl font-bold">
            Shop
          </Link>
          <p className="mt-4 text-sm text-gray-300">
            Discover quality products and shop with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/about" className="hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/faq" className="hover:text-gray-300">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-gray-300">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-gray-300">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="hover:text-gray-300">
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-500 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Radianz Group. All rights reserved.
      </div>
    </footer>
  );
}
