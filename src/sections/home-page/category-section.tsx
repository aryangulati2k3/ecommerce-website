import { fetchProductsByCategory } from '@/lib/api';
import ProductCard from '@/components/products/product-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/api';

interface CategorySectionProps {
  category: string;
}

export default async function CategorySection({
  category,
}: CategorySectionProps) {
  let products: Product[] = [];

  try {
    const categoryProducts = await fetchProductsByCategory(category);
    products = categoryProducts.slice(0, 4);
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <section className="bg-primary-color mx-auto mt-8 w-full max-w-7xl rounded-xl px-4 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white capitalize md:text-2xl">
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
      {products.length === 0 ? (
        <p className="text-center text-white">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
