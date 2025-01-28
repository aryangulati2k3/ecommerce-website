'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-300 p-10 text-center">
      <Image
        unoptimized
        src="/assets/common/not-found.gif"
        alt="Page not found"
        width={400}
        height={400}
        className="mb-8 rounded-xl shadow-lg"
      />
      <h1 className="mb-4 text-5xl font-bold text-gray-800">Page Not Found</h1>
      <p className="mb-8 text-lg text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href={'/'}>
        <Button variant={'secondary'}>Go Back Home</Button>
      </Link>
    </div>
  );
}
