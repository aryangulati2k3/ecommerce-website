import { fetchProducts } from '@/lib/api';
import ProductCard from '@/components/products/product-card';
import HeroCarousel from '@/sections/home-page/hero-carousel';
import CategoryCarousel from '@/sections/home-page/category-carousel';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default async function Home() {
  const products: Product[] = await fetchProducts();

  return (
    <main className="container mx-auto flex flex-col px-4 py-8">
      <HeroCarousel />
      <CategoryCarousel />
      <div className="grid grid-cols-2 gap-6 pt-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
