'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { fetchCategories, fetchProducts } from '@/lib/api';

export default function CategoryCarousel() {
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

        // Build a map from category to the first product's image using reduce
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

  // Memoize carousel items so they are only recalculated when dependencies change
  const carouselItems = useMemo(() => {
    return categories.map((category) => (
      <CarouselItem
        key={category} // Use category name as unique key
        className="flex w-auto flex-[0_0_auto] basis-auto justify-center"
      >
        <Link
          href={`/categories/${category}`}
          className="flex flex-col items-center"
        >
          <div className="flex h-30 w-30 items-center justify-center rounded-full border border-gray-400 bg-white p-4 shadow-lg">
            <div className="flex aspect-square h-20 w-20 items-center justify-center">
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
      </CarouselItem>
    ));
  }, [categories, categoryImages]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4">
      <h2 className="mb-4 text-center text-3xl font-bold">Shop by Category</h2>
      <Carousel opts={{ align: 'center', loop: true }} className="relative">
        <CarouselPrevious />
        <CarouselContent className="flex justify-center gap-6">
          {carouselItems}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
