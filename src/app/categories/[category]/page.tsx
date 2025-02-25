'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductsByCategory } from '@/lib/api';
import ProductCard from '@/components/products/product-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Product } from '@/lib/api';
import { capitalizeWords } from '@/lib/utils'; // Utility function for formatting category names

export default function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category as string);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const filteredProducts = await fetchProductsByCategory(decodedCategory);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (decodedCategory) loadProducts();
  }, [decodedCategory]);

  if (loading) {
    return (
      <p className="text-bold min-h-screen w-full justify-center text-center text-lg">
        Loading...
      </p>
    );
  }

  return (
    <main className="mx-auto mt-0 min-h-screen w-full max-w-7xl px-4 py-6 md:mt-14">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{capitalizeWords(decodedCategory)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Heading */}
      <h1 className="mb-6 text-center text-3xl font-bold capitalize">
        {capitalizeWords(decodedCategory)}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 pt-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
