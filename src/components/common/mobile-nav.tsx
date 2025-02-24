'use client';

import Link from 'next/link';
import { Home, Grid, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { usePathname } from 'next/navigation';

export default function MobileNavbar() {
  const { state } = useCart();
  const cartItemCount = state.items.length;
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-white shadow-md md:hidden">
      <div className="flex justify-around py-3">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center ${pathname === '/' ? 'text-green-600' : 'text-gray-700'}`}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>

        {/* Categories */}
        <Link
          href="/categories"
          className={`flex flex-col items-center ${pathname.includes('/categories') ? 'text-green-600' : 'text-gray-700'}`}
        >
          <Grid size={24} />
          <span className="text-xs">Categories</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`${pathname.includes('/cart') ? 'text-green-600' : 'text-gray-700'} relative flex flex-col items-center`}
        >
          <ShoppingCart size={24} />
          <span className="text-xs">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
