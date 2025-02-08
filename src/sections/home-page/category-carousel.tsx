'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { fetchCategories, fetchProducts } from '@/lib/api';

export default function CategorySection() {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch categories and products concurrently
        const [categoryList, products] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);

        setCategories(categoryList);

        // Build a map from category to the first product's image
        const categoryImagesMap = categoryList.reduce(
          (acc, category) => {
            const firstProduct = products.find(
              (product) => product.category === category,
            );
            if (firstProduct) {
              acc[category] = firstProduct.image;
            }
            return acc;
          },
          {} as Record<string, string>,
        );

        setCategoryImages(categoryImagesMap);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    loadData();
  }, []);

  // Memoize category items so they're only recalculated when dependencies change
  const categoryItems = useMemo(() => {
    return categories.map((category) => (
      <div
        key={category}
        className="flex flex-col items-center justify-between"
      >
        <Link
          href={`/categories/${category}`}
          className="flex flex-col items-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-400 bg-white p-4 shadow-lg md:h-32 md:w-32">
            <div className="flex aspect-square h-12 w-12 items-center justify-center md:h-20 md:w-20">
              {categoryImages[category] ? (
                <Image
                  src={categoryImages[category]}
                  alt={category}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}
            </div>
          </div>
          <p className="mt-2 text-center text-sm font-medium capitalize">
            {category}
          </p>
        </Link>
      </div>
    ));
  }, [categories, categoryImages]);

  return (
    <div className="mx-auto w-full px-4 pt-4 md:w-[60vw]">
      <h2 className="mb-4 text-center text-3xl font-bold">Shop by Category</h2>
      <div className="grid grid-cols-4 gap-8">{categoryItems}</div>
    </div>
  );
}
