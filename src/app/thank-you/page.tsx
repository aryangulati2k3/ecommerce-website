"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="mx-auto flex min-h-[75vh] w-full max-w-3xl flex-col items-center justify-center p-6 text-center">
      <h2 className="mb-4 text-3xl font-bold text-green-600">🎉 Order Placed!</h2>
      <p className="text-lg text-gray-600">Thank you for your purchase. Your order is confirmed.</p>
      <Link href="/" className="mt-6 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Continue Shopping
      </Link>
    </div>
  );
}
