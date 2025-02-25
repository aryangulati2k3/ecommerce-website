import Image from 'next/image';
import Link from 'next/link';
import { fetchCategories } from '@/lib/api';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { capitalizeWords } from '@/lib/utils';

const categoryImagesMap: Record<string, string> = {
  electronics: '/assets/home/categories-section/electronics.jpg',
  jewelery: '/assets/home/categories-section/jewellery.jpg',
  "men's clothing": '/assets/home/categories-section/men.jpg',
  "women's clothing": '/assets/home/categories-section/women.jpg',
};

export default async function CategoriesPage() {
  let categories: string[] = [];

  try {
    categories = await fetchCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <section className="mx-auto mt-0 min-h-screen w-full max-w-7xl px-4 py-8 md:mt-14">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Heading */}
      <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
        All Categories
      </h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${encodeURIComponent(category)}`}
            className="group flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow-lg transition-all hover:shadow-xl"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-xl p-2 sm:h-32 sm:w-32">
              {categoryImagesMap[category] ? (
                <Image
                  src={categoryImagesMap[category]}
                  alt={category}
                  width={120}
                  height={120}
                  className="h-full w-full rounded-xl object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-200">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <p className="mt-3 text-center text-lg font-medium capitalize">
              {capitalizeWords(category)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
