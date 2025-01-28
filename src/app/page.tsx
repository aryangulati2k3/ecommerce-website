import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/products/product-card";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default async function Home() {
  const products: Product[] = await fetchProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
