'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

// Define slides outside the component to avoid re-creation on every render.
const slides = [
  {
    image: '/assets/home/hero-section/macbook-image.jpeg',
    title: 'Upgrade Your Tech',
    subtitle: 'Explore the latest MacBooks with unbeatable deals',
    link: '/categories/macbooks',
  },
  {
    image: '/assets/home/hero-section/shirts-image.jpeg',
    title: 'Style That Defines You',
    subtitle: 'Discover trendy shirts that make a statement',
    link: '/categories/shirts',
  },
  {
    image: '/assets/home/hero-section/watch-image.jpeg',
    title: 'Timeless Elegance',
    subtitle: 'Find the perfect watch to complement your style',
    link: '/categories/watches',
  },
];

export default function HeroCarousel() {
  // Memoize the autoplay plugin to avoid recreating it on every render.
  const autoplayPlugin = useMemo(() => Autoplay({ delay: 5000 }), []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[autoplayPlugin]}
        className="relative"
      >
        <CarouselContent className="flex">
          {slides.map(({ image, title, subtitle, link }) => (
            <CarouselItem key={link} className="relative min-w-full">
              <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg sm:h-48 md:h-56 lg:h-64 xl:h-72">
                <Image
                  src={image}
                  alt={title}
                  width={1400}
                  height={600}
                  className="w-full rounded-lg object-contain"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center">
                  <h2 className="text-2xl font-bold text-white md:text-3xl">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm text-white md:text-lg">
                    {subtitle}
                  </p>
                  <Link href={link} className="mt-3">
                    <Button
                      variant="link"
                      effect="underline"
                      className="text-white"
                    >
                      Explore Deals
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
