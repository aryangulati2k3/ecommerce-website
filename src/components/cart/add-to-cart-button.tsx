'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/api';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { state, dispatch } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // On the server (or before mounting), render the same fallback markup.
  if (!mounted) {
    return (
      <Button variant="outline" className="w-full py-1 text-xs">
        Add to Cart
      </Button>
    );
  }

  const cartItem = state.items.find((item) => item.product.id === product.id);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const newQuantity = (cartItem ? cartItem.quantity : 0) + 1;
    dispatch({
      type: 'UPDATE_QUANTITY',
      productId: product.id,
      quantity: newQuantity,
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

  if (!cartItem) {
    return (
      <Button
        variant="outline"
        className="w-full py-1 text-xs"
        onClick={handleAdd}
      >
        Add to Cart
      </Button>
    );
  }

  return (
    <div className="flex w-full flex-row items-center justify-between rounded-lg border border-gray-300 bg-white text-xs text-black">
      <Button
        onClick={handleDecrement}
        className="min-w-0 flex-1 rounded-l-lg rounded-r-none bg-white text-xs text-black hover:bg-gray-200"
      >
        –
      </Button>
      <span className="px-2 text-center">{cartItem.quantity}</span>
      <Button
        onClick={handleIncrement}
        className="min-w-0 flex-1 rounded-l-none rounded-r-lg bg-white text-xs text-black hover:bg-gray-200"
      >
        +
      </Button>
    </div>
  );
}
