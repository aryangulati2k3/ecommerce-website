'use client';

import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '@/lib/api';
import ProductCard from '@/components/products/product-card';
import { Product } from '@/lib/api';

interface CategoryProductsSectionProps {
  category: string;
}

export default function AltCategorySection({
  category,
}: CategoryProductsSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const categoryProducts = await fetchProductsByCategory(category);
        setProducts(categoryProducts);
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
      <h2 className="mb-4 text-xl font-bold text-white capitalize md:text-2xl">
        Explore {category}
      </h2>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-white">Loading products...</p>
      ) : (
        <div className="relative">
          {/* Scrollable Product Container */}
          <div className="scrollbar-hide flex w-full gap-4 overflow-x-auto pb-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-48 flex-shrink-0 sm:w-56 md:w-64 lg:w-72"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
