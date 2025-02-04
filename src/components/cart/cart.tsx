'use client';

import React from 'react';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

export default function Cart() {
  const { state, dispatch } = useCart();

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto my-8 min-h-[75vh] max-w-4xl rounded-lg border-gray-400 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-3xl font-bold">Shopping Cart</h2>
      {state.items.length === 0 ? (
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <ShoppingCart className="h-30 w-30 mt-6 opacity-50" />
        </div>
      ) : (
        <div className="space-y-4">
          {state.items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="rounded object-contain"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      productId: product.id,
                      quantity: quantity - 1,
                    })
                  }
                  disabled={quantity <= 1}
                  className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                >
                  –
                </button>
                <span className="px-3 font-medium">{quantity}</span>
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      productId: product.id,
                      quantity: quantity + 1,
                    })
                  }
                  className="rounded border px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() =>
                  dispatch({
                    type: 'REMOVE_FROM_CART',
                    productId: product.id,
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {state.items.length > 0 && (
        <div className="mt-8 flex flex-col items-center justify-between border-t pt-4 md:flex-row">
          <h3 className="text-2xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </h3>
          <button
            className="mt-4 rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 md:mt-0"
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
