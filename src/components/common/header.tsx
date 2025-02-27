'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ShoppingCart } from 'lucide-react';
import AuthButton from '@/components/auth/auth-button';
import { useEffect, useState } from 'react';
import { useCartItemCount } from '@/context/cart-context';

// Dynamically import the Searchbar with SSR disabled.
const Searchbar = dynamic(() => import('@/components/common/search'), {
  ssr: false,
});

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = useCartItemCount();

  return (
    <header className="bg-primary-color relative top-0 right-0 left-0 z-50 flex items-center justify-between px-4 py-3 shadow-xl md:fixed">
      {/* Logo on the left */}
      <div>
        <Link href="/" className="text-2xl font-bold text-white lg:text-3xl">
          ShopDemo
        </Link>
      </div>

      {/* Centered Search */}
      <div className="mx-4 grow">
        <Searchbar />
      </div>

      {/* Right: Profile & Cart (Hidden on Mobile) */}
      <div className="hidden items-center space-x-6 md:flex">
        <AuthButton />
        <Link
          href="/cart"
          className="relative flex flex-col items-center text-white"
        >
          <ShoppingCart size={24} />
          {mounted && itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}