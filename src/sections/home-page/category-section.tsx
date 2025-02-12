'use client';

import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '@/lib/api';
import ProductCard from '@/components/products/product-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/api';

interface CategorySectionProps {
  category: string;
}

export default function CategorySection({ category }: CategorySectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const categoryProducts = await fetchProductsByCategory(category);
        setProducts(categoryProducts.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  return (
    <div className="bg-primary-color mx-auto mt-8 w-full max-w-7xl rounded-xl px-4 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white capitalize">
          Explore {category}
        </h2>
        <Link href={`/categories/${encodeURIComponent(category)}`}>
          <Button
            variant="secondary"
            className="cursor-pointer bg-white/20 text-white hover:bg-white/30"
          >
            View More
          </Button>
        </Link>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center text-white">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
