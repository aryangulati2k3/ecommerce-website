import Image from 'next/image';
import { fetchProducts, Product } from '@/lib/api';
import AddToCartButton from '@/components/cart/add-to-cart-button';

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
          <p className="my-4 text-gray-600">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
