'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import AddToCartButton from '@/components/cart/add-to-cart-button';
import { Product } from '@/lib/api';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} passHref>
      <Card className="flex h-full w-full max-w-xs flex-col justify-between sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div>
          <CardHeader>
            <CardTitle className="line-clamp-2 text-lg md:text-xl">
              {product.title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              ${product.price}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="md:h-50 relative h-20 w-full sm:h-48 lg:h-64">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="rounded object-contain"
              />
            </div>
          </CardContent>
        </div>
        <CardFooter className="mt-auto">
          <AddToCartButton product={product} />
        </CardFooter>
      </Card>
    </Link>
  );
}
