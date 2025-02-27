'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import gsap from 'gsap';

const slides = [
  {
    image: '/assets/home/hero-section/macbook-image.jpeg',
    title: 'Upgrade Your Tech',
    subtitle: 'Explore the latest MacBooks with unbeatable deals',
    link: '/categories/electronics',
  },
  {
    image: '/assets/home/hero-section/shirts-image.jpeg',
    title: 'Style That Defines You',
    subtitle: 'Discover trendy shirts that make a statement',
    link: `/categories/${encodeURIComponent("men's clothing")}`,
  },
  {
    image: '/assets/home/hero-section/watch-image.jpeg',
    title: 'Timeless Elegance',
    subtitle: 'Find the perfect watch to complement your style',
    link: '/categories/jewellery',
  },
];

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayDelay = 5000; // 5s autoplay
  const progressRef = useRef<HTMLDivElement[]>([]);
  const progressTimeline = useRef<gsap.core.Tween | null>(null);

  // Function to start the GSAP progress animation
  const startProgressAnimation = () => {
    if (progressTimeline.current) progressTimeline.current.kill(); // Kill previous animation

    // Animate the progress bar for the current slide
    progressTimeline.current = gsap.fromTo(
      progressRef.current[activeIndex],
      { width: '0%' },
      {
        width: '100%',
        duration: autoplayDelay / 1000, // Convert ms to seconds
        ease: 'linear',
        onComplete: () => {
          if (api) {
            const nextIndex = (activeIndex + 1) % slides.length;
            api.scrollTo(nextIndex);
          }
        },
      },
    );
  };

  useEffect(() => {
    if (!api) return;

    setActiveIndex(api.selectedScrollSnap());

    api.on('select', () => {
      setActiveIndex(api.selectedScrollSnap());
      startProgressAnimation(); // Restart animation when slide changes
    });

    startProgressAnimation(); // Start on initial render

    return () => {
      if (progressTimeline.current) progressTimeline.current.kill(); // Cleanup animation
    };
  }, [api, activeIndex]);

  // Handle clicking on progress bar
  const handleProgressBarClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl rounded-lg">
      <Carousel
        opts={{ align: 'start', loop: true }}
        className="relative"
        setApi={setApi}
      >
        <CarouselContent className="flex">
          {slides.map(({ image, title, subtitle, link }) => (
            <CarouselItem key={link} className="relative min-w-full">
              <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg sm:h-48 md:h-56 lg:h-64 xl:h-72">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="h-full w-full rounded-lg object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/40 px-4 text-center">
                  <h2 className="text-xl font-bold text-white md:text-2xl">
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

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-1/2 flex w-24 -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className="h-1 w-full cursor-pointer overflow-hidden rounded-full bg-gray-300"
            onClick={() => handleProgressBarClick(index)}
          >
            <div
              ref={(el) => {
                if (el) progressRef.current[index] = el;
              }}
              className="h-full bg-black"
              style={{ width: index === activeIndex ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
