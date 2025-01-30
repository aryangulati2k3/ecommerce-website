"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const slides = [
    {
        image: "/assets/home/hero-section/macbook-image.jpeg",
        title: "Upgrade Your Tech",
        subtitle: "Explore the latest MacBooks with unbeatable deals",
        link: "/categories/macbooks",
    },
    {
        image: "/assets/home/hero-section/shirts-image.jpeg",
        title: "Style That Defines You",
        subtitle: "Discover trendy shirts that make a statement",
        link: "/categories/shirts",
    },
    {
        image: "/assets/home/hero-section/watch-image.jpeg",
        title: "Timeless Elegance",
        subtitle: "Find the perfect watch to complement your style",
        link: "/categories/watches",
    },
];

export default function HeroCarousel() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className="relative"
            >
                <CarouselContent className="flex">
                    {slides.map((slide, index) => (
                        <CarouselItem
                            key={index}
                            className="min-w-full relative"
                        >
                            <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 flex items-center justify-center overflow-hidden rounded-lg">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    width={1400}
                                    height={600}
                                    className="w-full object-contain rounded-lg"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/40">
                                    <h2 className="text-white text-2xl md:text-3xl font-bold">
                                        {slide.title}
                                    </h2>
                                    <p className="text-white text-sm md:text-lg mt-2">
                                        {slide.subtitle}
                                    </p>
                                    <Link href={slide.link} className="mt-3">
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
