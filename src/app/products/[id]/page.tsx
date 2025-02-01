import Image from 'next/image';

import { fetchProducts } from '@/lib/api';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const products: Product[] = await fetchProducts();
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="mx-auto object-contain"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-4 text-xl text-gray-700">${product.price}</p>
          <p className="mt-6 text-gray-600">{product.description}</p>
          <button className="mt-6 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
