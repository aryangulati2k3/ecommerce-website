// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { CartProvider } from '@/context/cart-context';

export const metadata: Metadata = {
  title: 'ShopDemo - Demo Website',
  description:
    'A dummy e-commerce website acting as a prototype.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
