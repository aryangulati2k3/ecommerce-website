'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCart } from '@/context/cart-context';
import { ShoppingCart } from 'lucide-react';

// Import the Typeahead component dynamically with SSR disabled.
const Typeahead = dynamic(() => import('@/components/common/search'), {
  ssr: false,
});

export default function Header() {
  const { state } = useCart();
  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="flex w-full items-center justify-between bg-primary-color p-4 shadow-xl">
      {/* Logo on the left */}
      <div className="flex-shrink-0">
        <Link href="/" className="text-2xl font-bold text-white lg:text-3xl">
          Shop
        </Link>
      </div>

      {/* Centered search */}
      <div className="mx-4 flex-grow">
        <Typeahead />
      </div>

      {/* Cart icon on the right */}
      <div className="relative flex-shrink-0">
        <Link href="/cart" className="text-white">
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
