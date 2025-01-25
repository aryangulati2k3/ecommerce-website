import Image from "next/image";

import { fetchProducts } from "@/lib/api";

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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain mx-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-gray-700 mt-4">${product.price}</p>
          <p className="text-gray-600 mt-6">{product.description}</p>
          <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
