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
import { capitalizeWords } from '@/lib/utils';
import ShareButton from '@/components/ui/share-button';

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
      {/* ✅ Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/categories/${encodeURIComponent(product.category)}`}
            >
              {capitalizeWords(product.category)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 flex flex-col gap-4 overflow-hidden bg-white md:flex-row">
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

          {/* ✅ Desktop Add to Cart (Under Image) */}
          <div className="hidden w-full md:block">
            <AddToCartButton product={product} />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <div className="flex flex-col rounded border p-4 md:p-8">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                {product.title}
              </h1>
              <ShareButton />
            </div>

            <p className="mt-4 text-2xl font-semibold text-blue-600 md:text-3xl">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-gray-600">(incl. of all taxes)</p>
            <p className="mt-6 leading-relaxed text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col rounded border p-4 md:p-8">
            <h1 className="font-bold">Highlights</h1>
            <div className="grid grid-cols-2 gap-y-3 text-justify">
              <h1 className="font-semibold text-gray-500">Description</h1>
              <p className="leading-relaxed text-gray-600">
                {product.description}
              </p>
              <h1 className="font-semibold text-gray-500">Brand</h1>
              <p className="leading-relaxed text-gray-600">ShopDemo</p>
              <h1 className="font-semibold text-gray-500">Disclaimer</h1>
              <p className="leading-relaxed text-gray-600">
                Efforts are made to ensure accuracy, but product packaging may
                have additional or updated details. Please do not rely solely on
                the information provided and refer to the packaging for complete
                details
              </p>
              <h1 className="font-semibold text-gray-500">Customer Care</h1>
              <p className="leading-relaxed text-gray-600">
                In case of any issue, contact us E-mail address:
                support@shopdemo.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Sticky Add to Cart Bar on Mobile */}
      <div className="fixed right-0 bottom-14 left-0 z-50 bg-white px-4 py-3 shadow-lg md:hidden">
        <AddToCartButton product={product} />
      </div>
    </main>
  );
}
