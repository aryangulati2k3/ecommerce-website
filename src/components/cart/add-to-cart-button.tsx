'use client';

import React from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/api';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { state, dispatch } = useCart();

  // Find the cart item for the current product, if it exists.
  const cartItem = state.items.find((item) => item.product.id === product.id);

  // Handler for the initial "Add to Cart" click.
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', product });
  };

  // Handler to increment the quantity.
  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    // Use the current quantity or assume 0 if somehow missing.
    const newQuantity = (cartItem ? cartItem.quantity : 0) + 1;
    dispatch({
      type: 'UPDATE_QUANTITY',
      productId: product.id,
      quantity: newQuantity,
    });
  };

  // Handler to decrement the quantity.
  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (cartItem) {
      if (cartItem.quantity > 1) {
        // Decrease quantity by one.
        dispatch({
          type: 'UPDATE_QUANTITY',
          productId: product.id,
          quantity: cartItem.quantity - 1,
        });
      } else {
        // If quantity is 1, remove the item from the cart.
        dispatch({ type: 'REMOVE_FROM_CART', productId: product.id });
      }
    }
  };

  // If the item is not in the cart, show the "Add to Cart" button.
  if (!cartItem) {
    return (
      <Button variant="outline" className="w-full py-2" onClick={handleAdd}>
        Add to Cart
      </Button>
    );
  }

  // If the item is in the cart, show the quantity control.
  return (
    <div className="flex w-full flex-row items-center justify-between rounded-lg border border-gray-300">
      <Button
        onClick={handleDecrement}
        className="min-w-0 flex-1 rounded-l-lg rounded-r-none bg-transparent text-lg text-black hover:bg-gray-200"
      >
        –
      </Button>
      <span className="px-2 text-center">{cartItem.quantity}</span>
      <Button
        onClick={handleIncrement}
        className="min-w-0 flex-1 rounded-l-none rounded-r-lg bg-transparent text-lg text-black hover:bg-gray-200"
      >
        +
      </Button>
    </div>
  );
}
