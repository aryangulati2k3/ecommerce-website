import Image from 'next/image';
import Link from 'next/link';
import { fetchCategories } from '@/lib/api';

const categoryImagesMap: Record<string, string> = {
  electronics: '/assets/home/categories-section/electronics.jpg',
  jewelery: '/assets/home/categories-section/jewellery.jpg',
  "men's clothing": '/assets/home/categories-section/men.jpg',
  "women's clothing": '/assets/home/categories-section/women.jpg',
};

export default async function CategoriesSection() {
  let categories: string[] = [];

  try {
    categories = await fetchCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <section className="mx-auto w-full px-4 pt-4 md:w-[60vw]">
      <h2 className="mb-2 text-center text-xl font-bold md:text-2xl">
        Shop by Category
      </h2>
      <div className="mb-2 grid grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category} className="flex flex-col items-center">
            <Link
              href={`/categories/${category}`}
              className="flex flex-col items-center"
            >
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-white p-4 md:h-28 md:w-28">
                <div className="flex aspect-square h-14 w-14 items-center justify-center md:h-20 md:w-20">
                  {categoryImagesMap[category] ? (
                    <Image
                      src={categoryImagesMap[category]}
                      alt={category}
                      width={90}
                      height={90}
                      className="h-full w-full object-cover"
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
        ))}
      </div>
      {/* TODO: Remove this copy */}
      <div className="mb-2 grid grid-cols-4 gap-8">
        {categories.map((category) => (
          <div key={category} className="flex flex-col items-center">
            <Link
              href={`/categories/${category}`}
              className="flex flex-col items-center"
            >
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-white p-4 md:h-28 md:w-28">
                <div className="flex aspect-square h-14 w-14 items-center justify-center md:h-20 md:w-20">
                  {categoryImagesMap[category] ? (
                    <Image
                      src={categoryImagesMap[category]}
                      alt={category}
                      width={90}
                      height={90}
                      className="h-full w-full object-cover"
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
        ))}
      </div>
    </section>
  );
}
