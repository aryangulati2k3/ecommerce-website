'use client';

import React from 'react';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import { ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (state.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="mx-auto flex h-screen min-h-[75vh] max-w-4xl flex-col bg-white p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">My Cart</h2>
      {state.items.length === 0 ? (
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <ShoppingCart className="mt-6 h-30 w-30 opacity-50" />
          <Link href="/" className="mt-4 text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {state.items.map(({ product, quantity }) => {
              const productUrl = `/categories/${encodeURIComponent(product.category)}/${encodeURIComponent(product.id)}`;

              return (
                <div
                  key={product.id}
                  className="flex items-center rounded-lg border border-gray-200 p-4 shadow-xs"
                >
                  {/* Product Image */}
                  <Link
                    href={productUrl}
                    className="relative h-16 w-16 shrink-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="cursor-pointer rounded object-contain"
                    />
                  </Link>

                  <div className="ml-4 grow">
                    {/* Product Title */}
                    <Link
                      href={productUrl}
                      className="text-md font-semibold hover:text-blue-600"
                    >
                      {product.title}
                    </Link>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 rounded-lg border">
                    <button
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_QUANTITY',
                          productId: product.id,
                          quantity: quantity - 1,
                        })
                      }
                      disabled={quantity <= 1}
                      className="rounded-l-lg border-r border-l-0 px-3 py-1 hover:bg-gray-200 disabled:opacity-30"
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
                      className="rounded-r-lg border-r-0 border-l px-3 py-1 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Item Button */}
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        productId: product.id,
                      })
                    }
                  >
                    <X />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Checkout Section */}
          <div className="mt-8 flex flex-col items-center justify-between border-t pt-4 md:flex-row">
            <h3 className="text-2xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <div className="mt-4 flex flex-col gap-2 md:mt-0 md:flex-row">
              <button
                className="rounded-lg border px-6 py-2 transition-colors hover:bg-gray-200"
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Clear Cart
              </button>
              <button
                className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
