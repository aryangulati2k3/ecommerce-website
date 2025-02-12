interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export async function fetchProductsByCategory(
  category: string,
): Promise<Product[]> {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }
  return response.json();
}
