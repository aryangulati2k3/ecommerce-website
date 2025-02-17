'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCart } from '@/context/cart-context';
import { ShoppingCart } from 'lucide-react';
import AuthButton from '@/components/auth/auth-button';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { state } = useCart();
  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Dynamically import the Searchbar with SSR disabled.
  const Searchbar = dynamic(() => import('@/components/common/search'), {
    ssr: false,
  });

  return (
    <header className="bg-primary-color fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-4 py-3 shadow-xl">
      {/* Logo on the left */}
      <div className="shrink-0">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wider text-white lg:text-3xl"
        >
          ShopDemo
        </Link>
      </div>

      {/* Centered Search */}
      <div className="mx-4 grow">
        <Searchbar />
      </div>

      {/* Right: Login and Cart buttons */}
      <div className="flex items-center space-x-6">
        <AuthButton />
        <Link
          href="/cart"
          className="relative flex flex-col items-center text-white"
        >
          <ShoppingCart className="h-5 w-5" />
          {mounted && itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
