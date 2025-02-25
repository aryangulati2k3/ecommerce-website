import Image from 'next/image';
import { fetchProducts, Product } from '@/lib/api';
import AddToCartButton from '@/components/cart/add-to-cart-button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
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
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/categories/${encodeURIComponent(product.category)}`}
            >
              {product.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Details */}
      <div className="flex flex-col overflow-hidden bg-white md:flex-row">
        {/* Image + Add to Cart on Desktop */}
        <div className="relative flex flex-col items-center md:w-1/2">
          <div className="relative h-64 w-full md:h-[500px]">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="h-full w-full object-contain p-4"
            />
          </div>

          {/* Desktop Add to Cart (Under Image) */}
          <div className="hidden w-full md:block">
            <AddToCartButton product={product} />
          </div>
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
        </div>
      </div>

      {/* Sticky Add to Cart Bar on Mobile */}
      <div className="fixed right-0 bottom-14 left-0 z-50 bg-white px-4 py-3 shadow-lg md:hidden">
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
