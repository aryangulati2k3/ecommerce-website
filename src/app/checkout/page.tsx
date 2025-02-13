'use client';

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'card',
  });

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      alert('Please fill out all required fields.');
      return;
    }

    alert('Payment successful! Your order has been placed.');
    dispatch({ type: 'CLEAR_CART' });
    router.push('/thank-you');
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">Checkout</h2>

      {state.items.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link href="/" className="mt-4 text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Summary */}
          <div className="mb-6 rounded-lg border p-4 shadow-md">
            <h3 className="mb-4 text-lg font-bold">Order Summary</h3>
            <div className="space-y-4">
              {state.items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center border-b pb-4"
                >
                  <div className="relative h-16 w-16 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="rounded object-contain"
                    />
                  </div>
                  <div className="ml-4 grow">
                    <h3 className="text-md font-semibold">{product.title}</h3>
                    <p className="text-gray-600">
                      ${product.price.toFixed(2)} x {quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mt-4 text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold">Shipping Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />

            {/* Payment Method */}
            <h3 className="text-lg font-bold">Payment Method</h3>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full rounded border p-2"
            >
              <option value="card">Credit / Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>

            {/* Checkout Button */}
            <button
              type="submit"
              className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}
