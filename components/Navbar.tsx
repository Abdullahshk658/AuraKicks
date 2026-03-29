"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

type MegaMenuSection = {
  title: string;
  href: string;
  description: string;
  items: Array<{
    title: string;
    href: string;
    description: string;
  }>;
};

const megaMenuSections: MegaMenuSection[] = [
  {
    title: "Footwear",
    href: "/collections/footwear",
    description: "Premium pairs, slides, and performance silhouettes.",
    items: [
      {
        title: "Sneakers",
        href: "/collections/footwear?sneakers=true",
        description: "Jordan, Nike, Yeezy, Dunk, and lifestyle icons."
      },
      {
        title: "Slides",
        href: "/collections/footwear?slides=true",
        description: "Everyday comfort and statement slip-ons."
      },
      {
        title: "Sports",
        href: "/collections/footwear?sports=true",
        description: "Training, running, and court-ready styles."
      }
    ]
  },
  {
    title: "Clothing",
    href: "/collections/clothing",
    description: "Street-led fits with layered outerwear and essentials.",
    items: [
      {
        title: "Hoodies",
        href: "/collections/clothing?type=hoodies",
        description: "Oversized cuts and heavyweight fleece styles."
      },
      {
        title: "Jackets",
        href: "/collections/clothing?type=jackets",
        description: "Technical layers, puffers, and varsity edits."
      },
      {
        title: "Tees",
        href: "/collections/clothing?type=tees",
        description: "Daily rotation staples with premium finishing."
      }
    ]
  },
  {
    title: "Accessories",
    href: "/collections/accessories",
    description: "Caps, bags, socks, and everyday add-ons.",
    items: [
      {
        title: "Bags",
        href: "/collections/accessories?subCategory=Bags",
        description: "Crossbody bags and utility carry essentials."
      },
      {
        title: "Daily Add-ons",
        href: "/collections/accessories",
        description: "Caps, socks, and wardrobe finishing details."
      },
      {
        title: "Giftables",
        href: "/collections/perfumes",
        description: "Lifestyle extras and fragrance-driven gifting."
      }
    ]
  },
  {
    title: "Women",
    href: "/collections/women",
    description: "Curated women's footwear and apparel drops.",
    items: [
      {
        title: "Low Tops",
        href: "/collections/women?subCategory=Sneakers",
        description: "Slim-profile classics, Sambas, and daily staples."
      },
      {
        title: "Lifestyle",
        href: "/collections/women",
        description: "Street-led pairs styled for everyday rotation."
      },
      {
        title: "Trending Fits",
        href: "/collections/clothing",
        description: "Oversized layers and soft neutrals for complete looks."
      }
    ]
  },
  {
    title: "Kids",
    href: "/collections/kids",
    description: "Scaled-down grails for younger sneakerheads.",
    items: [
      {
        title: "Mini Heat",
        href: "/collections/kids?subCategory=Sneakers",
        description: "Jordan and Nike silhouettes in youth sizing."
      },
      {
        title: "Daily School Pairs",
        href: "/collections/kids",
        description: "Comfortable pairs built for frequent wear."
      },
      {
        title: "Weekend Rotation",
        href: "/collections/kids",
        description: "Statement colourways for events and outings."
      }
    ]
  },
  {
    title: "Perfumes",
    href: "/collections/perfumes",
    description: "Luxury-inspired scents to finish the fit.",
    items: [
      {
        title: "Amber",
        href: "/collections/perfumes?subCategory=Fragrance",
        description: "Warm evening scents with depth and longevity."
      },
      {
        title: "Fresh",
        href: "/collections/perfumes",
        description: "Daytime-friendly fragrance profiles with lighter lift."
      },
      {
        title: "Gift Sets",
        href: "/collections/perfumes",
        description: "Polished fragrance gifting for premium retail appeal."
      }
    ]
  }
];

const mobileLinks = [
  { title: "Footwear", href: "/collections/footwear" },
  { title: "Clothing", href: "/collections/clothing" },
  { title: "Accessories", href: "/collections/accessories" },
  { title: "Women", href: "/collections/women" },
  { title: "Kids", href: "/collections/kids" },
  { title: "Perfumes", href: "/collections/perfumes" }
];

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, itemCount, isHydrated } = useCartStore((state) => ({
    openCart: state.openCart,
    itemCount: state.itemCount,
    isHydrated: state.isHydrated
  }));

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveSection(null);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slateGlow-900/80 backdrop-blur-xl">
        <div className="container">
          <div className="flex h-20 items-center gap-4">
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="rounded-full border border-white/10 bg-white/5 p-3 text-zinc-100 transition hover:bg-white/10"
                aria-label="Open mobile menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            <Link
              href="/"
              className="mr-2 flex shrink-0 items-center gap-2 font-display text-lg font-semibold uppercase tracking-[0.35em] text-white"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-400 text-sm font-bold text-black">
                HK
              </span>
              <span className="hidden sm:inline-flex">HopKicks</span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {megaMenuSections.map((section) => {
                const isActive =
                  activeSection === section.title ||
                  pathname.startsWith(section.href);

                return (
                  <div
                    key={section.title}
                    className="relative"
                    onMouseEnter={() => setActiveSection(section.title)}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    <Link
                      href={section.href}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {section.title}
                      <ChevronDown className="h-4 w-4" />
                    </Link>

                    <div
                      className={cn(
                        "absolute left-0 top-full w-[760px] pt-4 transition",
                        isActive
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-2 opacity-0"
                      )}
                    >
                      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slateGlow-900/95 p-6 shadow-card backdrop-blur-2xl">
                        <div className="grid gap-6 md:grid-cols-[1.15fr_1fr_1fr_1fr]">
                          <div className="rounded-[1.5rem] border border-brand-300/20 bg-gradient-to-br from-brand-400/15 via-brand-400/5 to-transparent p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">
                              {section.title}
                            </p>
                            <h3 className="mt-4 text-2xl font-semibold text-white">
                              Explore premium collections
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-zinc-300">
                              {section.description}
                            </p>
                            <Button asChild size="sm" className="mt-6">
                              <Link href={section.href}>Shop Collection</Link>
                            </Button>
                          </div>

                          {section.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-brand-300/30 hover:bg-white/[0.06]"
                            >
                              <p className="text-base font-semibold text-white">
                                {item.title}
                              </p>
                              <p className="mt-3 text-sm leading-6 text-zinc-400">
                                {item.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="ml-auto hidden max-w-md flex-1 items-center lg:flex">
              <form className="relative w-full" action="/collections/all">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Search sneakers, hoodies, perfumes..."
                  className="pl-11"
                />
              </form>
            </div>

            <div className="ml-auto flex items-center gap-2 lg:ml-4">
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-zinc-200 transition hover:bg-white/10 lg:hidden"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/account"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-zinc-200 transition hover:bg-white/10"
                aria-label="Account"
              >
                <UserRound className="h-5 w-5" />
              </Link>

              <button
                type="button"
                onClick={openCart}
                className="relative rounded-full border border-white/10 bg-white/5 p-3 text-zinc-100 transition hover:bg-white/10"
                aria-label="Open shopping cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-400 px-1 text-[10px] font-bold text-black">
                  {isHydrated ? itemCount : 0}
                </span>
              </button>
            </div>
          </div>

          <div className="pb-4 lg:hidden">
            <form className="relative" action="/collections/all">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                type="search"
                name="q"
                placeholder="Search sneakers, hoodies, perfumes..."
                className="pl-11"
              />
            </form>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <aside
          className={cn(
            "absolute left-0 top-0 flex h-full w-[88vw] max-w-sm flex-col border-r border-white/10 bg-slateGlow-900 p-6 transition duration-300",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-lg font-semibold uppercase tracking-[0.28em] text-white"
            >
              HopKicks
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200"
              aria-label="Close mobile menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 space-y-2">
            {mobileLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={cn(
                  "block rounded-2xl border px-4 py-4 text-base font-medium transition",
                  pathname.startsWith(link.href)
                    ? "border-brand-300/30 bg-brand-400/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-zinc-200 hover:bg-white/[0.06]"
                )}
              >
                {link.title}
              </Link>
            ))}
          </div>

          <Separator className="my-8" />

          <div className="space-y-3 text-sm text-zinc-400">
            <p>Authenticity-focused premium batches</p>
            <p>Nationwide delivery with Cash on Delivery</p>
            <p>Secure online payments via Stripe</p>
          </div>

          <Button className="mt-auto" onClick={() => setIsMobileMenuOpen(false)}>
            Start Shopping
          </Button>
        </aside>
      </div>
    </>
  );
}
