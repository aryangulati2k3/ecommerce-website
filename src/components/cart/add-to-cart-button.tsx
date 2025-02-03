'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/api';
import React from 'react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { dispatch } = useCart();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch({ type: 'ADD_TO_CART', product });
  };

  return (
    <Button variant="outline" className="w-full py-2" onClick={handleClick}>
      Add to Cart
    </Button>
  );
}
