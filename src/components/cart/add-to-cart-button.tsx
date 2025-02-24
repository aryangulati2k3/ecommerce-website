'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Product } from '@/lib/api';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { state, dispatch } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Detect screen size
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize(); // Check on mount
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const cartItem = state.items.find((item) => item.product.id === product.id);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: 'UPDATE_QUANTITY',
      productId: product.id,
      quantity: (cartItem ? cartItem.quantity : 0) + 1,
    });
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (cartItem) {
      if (cartItem.quantity > 1) {
        dispatch({
          type: 'UPDATE_QUANTITY',
          productId: product.id,
          quantity: cartItem.quantity - 1,
        });
      } else {
        dispatch({ type: 'REMOVE_FROM_CART', productId: product.id });
      }
    }
  };

  // **Check if we're on the PDP page and in mobile view**
  const isPDP = pathname.includes('/products/');

  // ✅ **If not on PDP OR not mobile, return the standard Add to Cart**
  if (!isMobile || !isPDP) {
    return !cartItem ? (
      <Button
        variant="outline"
        className="w-full bg-green-600 py-1 text-xs font-semibold text-white hover:bg-green-700 hover:text-white"
        onClick={handleAdd}
      >
        Add to Cart
      </Button>
    ) : (
      <div className="flex w-full flex-row items-center justify-between rounded-lg border border-gray-300 bg-green-600 text-xs text-white hover:text-white">
        <Button
          onClick={handleDecrement}
          className="min-w-0 flex-1 rounded-l-lg rounded-r-none bg-green-600 text-xs text-white hover:bg-green-700 hover:text-white"
        >
          –
        </Button>
        <span className="px-2 text-center">{cartItem.quantity}</span>
        <Button
          onClick={handleIncrement}
          className="min-w-0 flex-1 rounded-l-none rounded-r-lg bg-green-600 text-xs text-white hover:bg-green-700 hover:text-white"
        >
          +
        </Button>
      </div>
    );
  }

  // ✅ **On PDP in mobile view, show floating button transition**
  return (
    <div className="fixed bg-white py-2 right-0 bottom-16 left-0 px-4 transition-all duration-300 ease-in-out md:hidden">
      {!cartItem ? (
        <Button
          variant="outline"
          className="w-full bg-green-600 py-2 font-semibold text-white hover:text-white hover:bg-green-700"
          onClick={handleAdd}
        >
          Add to Cart
        </Button>
      ) : (
        <div className="flex w-full gap-2">
          <Link
            href="/cart"
            className="flex w-1/2 items-center justify-center gap-2 rounded-lg border bg-white py-2 text-green-600 shadow-md transition-all hover:bg-gray-100"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>View Cart</span>
          </Link>

          <div className="flex w-1/2 items-center justify-between rounded-lg bg-green-600 px-4 text-white shadow-md">
            <button onClick={handleDecrement} className="text-lg font-bold w-1/3">
              –
            </button>
            <span className="text-lg font-semibold">{cartItem.quantity}</span>
            <button onClick={handleIncrement} className="text-lg font-bold w-1/3">
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
