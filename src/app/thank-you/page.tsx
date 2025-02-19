'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderDetails {
  name: string;
  email: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  paymentMethod: string;
  totalPrice: number;
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('orderDetails');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
      localStorage.removeItem('orderDetails');
    }
  }, []);

  return (
    <main className="mx-auto mt-0 flex min-h-screen w-full max-w-3xl flex-col items-center justify-center p-6 text-center md:mt-14">
      <h2 className="mb-4 text-3xl font-bold text-green-600">
        🎉 Order Placed!
      </h2>

      {order ? (
        <>
          <p className="text-lg text-gray-600">
            Thank you, <b>{order.name}</b>, for your purchase.
          </p>
          <p className="mt-2 text-gray-700">
            Your order total is <b>${order.totalPrice.toFixed(2)}</b>.
          </p>
          <p className="mt-4 text-gray-600">
            Shipping to: <br />
            {order.street}, {order.city}, {order.zip}, {order.country}
          </p>
          <p className="mt-2 text-gray-600">
            Payment Method: <b>{order.paymentMethod}</b>
          </p>
        </>
      ) : (
        <p className="text-lg text-gray-600">No order details found.</p>
      )}

      <Link
        href="/"
        className="mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
