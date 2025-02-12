"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { fetchCategories } from "@/lib/api";

const categoryImagesMap: Record<string, string> = {
  "electronics": "/assets/home/categories-section/electronics.jpg",
  "jewelery": "/assets/home/categories-section/jewellery.jpg",
  "men's clothing": "/assets/home/categories-section/men.jpg",
  "women's clothing": "/assets/home/categories-section/women.jpg",
};

export default function CategorySection() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await fetchCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []);

  const categoryItems = useMemo(() => {
    return categories.map((category) => (
      <div key={category} className="flex flex-col items-center">
        <Link href={`/categories/${category}`} className="flex flex-col items-center">
          <div className="flex h-20 w-20 md:h-32 md:w-32 items-center justify-center rounded-full border bg-white p-4 shadow-lg">
            <div className="flex aspect-square h-12 w-12 md:h-20 md:w-20 items-center justify-center">
              {categoryImagesMap[category] ? (
                <Image
                  src={categoryImagesMap[category]}
                  alt={category}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}
            </div>
          </div>
          <p className="mt-2 text-center text-sm font-medium capitalize">{category}</p>
        </Link>
      </div>
    ));
  }, [categories]);

  return (
    <div className="mx-auto w-full px-4 pt-4 md:w-[60vw]">
      <h2 className="mb-4 text-center text-3xl font-bold">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">{categoryItems}</div>
    </div>
  );
}
