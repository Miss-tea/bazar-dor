import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর - নিত্যপণ্যের বাজার মূল্য",
  description: "দৈনন্দিন নিত্যপণ্যের হালনাগাদ বাজার দর",
};

function getList(result, label, property) {
  if (result.status === "rejected") {
    console.warn(`Failed to load ${label}:`, result.reason);
    return [];
  }

  const data = result.value;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[property])) return data[property];

  console.warn(`Unexpected ${label} response shape:`, data);
  return [];
}

async function GlobalNavigation() {
  const [categoriesResult, productsResult] = await Promise.allSettled([
    getCategories(),
    getProducts(),
  ]);
  const categories = getList(categoriesResult, "categories", "categories");
  const products = getList(productsResult, "ticker products", "products");

  return (
    <>
      <Navbar categories={categories} />
      <Ticker products={products} />
    </>
  );
}

function NavigationFallback() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="h-8 w-36 animate-pulse rounded bg-gray-200" />
      </div>
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <Toaster position="top-right" />
        <Suspense fallback={<NavigationFallback />}>
          <GlobalNavigation />
        </Suspense>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
