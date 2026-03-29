"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-slateGlow-900 shadow-glow">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative min-h-[520px] overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/25" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,161,0,0.24),transparent_30%)]" />

                <div className="relative z-10 flex min-h-[520px] items-end px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
                  <div className="max-w-2xl animate-fade-up">
                    <p className="inline-flex rounded-full border border-brand-300/30 bg-brand-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-100">
                      {slide.eyebrow}
                    </p>
                    <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                      {slide.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button asChild size="lg">
                        <Link href={slide.href}>Shop Now</Link>
                      </Button>
                      <Button asChild variant="secondary" size="lg">
                        <Link href="/collections/all?sort=latest">Latest Arrivals</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition",
              selectedIndex === index ? "bg-brand-300" : "bg-white/30"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
