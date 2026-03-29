import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import "@/app/globals.css";
import { CartDrawer } from "@/components/CartDrawer";
import { Navbar } from "@/components/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hopkicks.pk"),
  title: {
    default: "HopKicks Pakistan",
    template: "%s | HopKicks Pakistan"
  },
  description:
    "Premium sneaker, streetwear, and lifestyle e-commerce experience for Pakistan built with Next.js 14.",
  keywords: [
    "Pakistan sneakers",
    "streetwear Pakistan",
    "premium replica sneakers",
    "cash on delivery Pakistan",
    "HopKicks clone"
  ],
  openGraph: {
    title: "HopKicks Pakistan",
    description:
      "Premium sneaker, apparel, and lifestyle commerce with COD and Stripe checkout.",
    url: "https://www.hopkicks.pk",
    siteName: "HopKicks Pakistan",
    type: "website"
  }
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${sora.variable} overflow-x-hidden font-sans`}
      >
        <Navbar />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
