'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Product } from '@/lib/api';

export default function AltProductCard({ product }: { product: Product }) {
  const discount = Math.floor(Math.random() * (49 - 5 + 1)) + 5;

  return (
    <Link href={`/products/${product.id}`} passHref>
      <Card className="flex h-full w-full max-w-xs flex-col justify-between sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div>
          <CardHeader>
            <CardTitle className="text-md line-clamp-2 md:text-xl">
              {product.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="relative h-20 w-full sm:h-48 md:h-50 lg:h-64">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="rounded object-contain"
              />
            </div>
          </CardContent>
        </div>
        <CardFooter className="flex flex-row items-center justify-between gap-2 px-2 md:px-4">
          <span className="bg-red-600 px-1 py-1 text-xs font-semibold text-white">
            {discount}% off
          </span>
          <span className="text-xs font-bold text-red-500 md:text-sm">
            Limited time deal
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
