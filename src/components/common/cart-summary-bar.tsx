'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { ShoppingBag } from 'lucide-react';

export default function CartSummaryBar() {
  const pathname = usePathname();
  const { state } = useCart();

  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (pathname.startsWith('/products/') || itemCount === 0) return null;

  return (
    <div className="fixed right-0 bottom-14 left-0 z-40 flex items-center justify-between rounded-t-xl bg-green-500 px-4 py-3 text-white md:hidden">
      <div className="text-sm font-medium">
        {itemCount} {itemCount === 1 ? 'Item' : 'Items'} | ₹
        {totalPrice.toFixed(2)}
      </div>
      <Link href="/cart" className="flex items-center space-x-2 font-semibold">
        <ShoppingBag className="h-5 w-5" />
        <span>View Cart</span>
      </Link>
    </div>
  );
}
