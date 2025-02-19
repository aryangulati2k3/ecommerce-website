import Image from 'next/image';
import { fetchProducts, Product } from '@/lib/api';
import AddToCartButton from '@/components/cart/add-to-cart-button';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({
  params: paramsPromise,
}: ProductPageProps) {
  const params = await paramsPromise;
  const products: Product[] = await fetchProducts();
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return (
      <div className="mt-14 flex min-h-screen items-center justify-center text-xl text-gray-700">
        Product not found
      </div>
    );
  }

  return (
    <main className="container mx-auto mt-0 px-4 py-8 md:mt-14">
      <div className="flex flex-col overflow-hidden bg-white md:flex-row">
        {/* Image Section */}
        <div className="relative h-64 md:h-auto md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col p-8 md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="mt-4 text-xl font-semibold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-6 leading-relaxed text-gray-600">
            {product.description}
          </p>
          <div className="mt-auto pt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
