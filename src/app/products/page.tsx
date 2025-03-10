import ProductCard from '@/components/products/product-card';
import { fetchProducts, Product } from '@/lib/api';

// TODO: Delete after use case is fullfilled

export default async function ProductsPage() {
  const products: Product[] = await fetchProducts();
  return (
    <main className="container mx-auto mt-0 flex w-full max-w-7xl flex-col justify-center md:mt-14">
      <h2 className="mt-8 text-center text-3xl font-bold">All Products</h2>
      <div className="grid grid-cols-2 gap-6 pt-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
