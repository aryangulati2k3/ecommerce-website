'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import AltProductCard from '@/components/products/alt-product-card';
import Link from 'next/link';
import { Product } from '@/lib/api';

export default function DealsSection() {
  const [deals, setDeals] = useState<Product[]>([]);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const products = await fetchProducts();
        const shuffled = [...products]
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setDeals(shuffled);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    loadDeals();
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">Deals for you</h2>
        <Link href="/products" className="text-blue-500 hover:underline">
          See all deals
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {deals.map((product) => (
          <AltProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
