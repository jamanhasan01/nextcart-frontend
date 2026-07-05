"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const banners = [
  {
    id: 1,
    title: "Reveal Your Natural Glow",
    subtitle: "New Collection 2026",
    description:
      "Discover premium skincare and beauty essentials crafted for healthy, radiant skin.",
    image: "/images/banner-1.jpg",
    button: "Shop Now",
    href: "/products",
  },
  {
    id: 2,
    title: "Summer Beauty Sale",
    subtitle: "Up to 50% OFF",
    description:
      "Refresh your skincare routine with exclusive discounts on our bestselling products.",
    image: "/images/banner-2.jpg",
    button: "Explore Sale",
    href: "/sale",
  },
  {
    id: 3,
    title: "Luxury Skincare Essentials",
    subtitle: "Best Sellers",
    description:
      "Experience premium beauty products designed to nourish, protect, and enhance your skin.",
    image: "/images/banner-3.jpg",
    button: "Browse Collection",
    href: "/products",
  },
];

export function BannerSection() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 3000,
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );
  return (
    <section className="relative">
      <Carousel
        plugins={[autoplay.current]}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative overflow-hidden">
                {/* Responsive Height */}
                <div className="relative h-[320px] sm:h-[420px] md:h-[480] lg:h-[500]">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    priority={banner.id === 1}
                    sizes="100vw"
                    quality={90}
                    className="object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

                  {/* Content */}
                  <div className="container  relative z-10 flex h-full items-center">
                    <div className="max-w-xl text-white">
                      <span className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-1 text-xs font-medium backdrop-blur-md sm:text-sm">
                        {banner.subtitle}
                      </span>

                      <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                        {banner.title}
                      </h1>

                      <p className="mt-5 max-w-lg text-sm text-white/90 sm:text-base lg:text-lg">
                        {banner.description}
                      </p>

                      <div className="mt-8">
                        <Button
                          nativeButton={false}
                          size="lg"
                          render={(props) => (
                            <Link {...props} href={banner.href}>
                              {banner.button}
                            </Link>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Desktop Navigation */}
        <CarouselPrevious className="left-6 hidden h-12 w-12 lg:flex" />
        <CarouselNext className="right-6 hidden h-12 w-12 lg:flex" />
      </Carousel>
    </section>
  );
}
