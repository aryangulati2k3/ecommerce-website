import { fetchProducts, Product } from '@/lib/api';
import ProductCard from '@/components/products/product-card';
import HeroCarousel from '@/sections/home-page/hero-carousel';
import CategoryCarousel from '@/sections/home-page/categories-carousel';
import CategorySection from '@/sections/home-page/category-section';

export default async function Home() {
  const products: Product[] = await fetchProducts();

  return (
    <main className="container mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-8">
      <HeroCarousel />
      <CategoryCarousel />
      <CategorySection category="electronics" />
      <h2 className="mt-8 text-center text-3xl font-bold">All Products</h2>
      <div className="grid grid-cols-2 gap-6 pt-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
