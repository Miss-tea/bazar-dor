"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const todayBanglaDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সাইন আউট করা হয়েছে");
      setDropdownOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সাইন আউট করার সময় ত্রুটি হয়েছে।",
      );
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm transition-colors group-hover:bg-emerald-700">
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h6v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
            </svg>
          </div>
          <div>
            <span className="block text-xl leading-tight font-bold text-gray-900">
              বাজার দর
            </span>
            <span className="block text-[10px] text-gray-500">
              {todayBanglaDate}
            </span>
          </div>
        </Link>

        <div className="relative">
          {isPending ? null : user ? (
            <div>
              <button
                type="button"
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                onClick={() => setDropdownOpen((open) => !open)}
                className="flex cursor-pointer items-center gap-2 rounded-full p-1.5 transition-colors hover:bg-gray-100"
              >
                {user.image ? (
                  <Image src={user.image} alt={user.name || "User"} width={32} height={32} unoptimized  className="h-8 w-8 rounded-full object-cover"  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {user.name?.[0] || "U"}
                  </span>
                )}
                <span className="hidden text-sm font-medium text-gray-800 sm:inline">
                  {user.name}
                </span>
                <span className="text-xs text-gray-400" aria-hidden="true">
                  ▼
                </span>
        </button>
              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
        <div className="border-b border-gray-100 px-4 py-2">
                    <p className="text-xs text-gray-500">সাইন ইন আছেন</p>
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {user.name}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    প্রোফাইল দেখুন </Link>
                  <button type="button"role="menuitem" onClick={handleSignOut} className="w-full cursor-pointer px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/signin" className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600">
                সাইন ইন
              </Link>
              <Link href="/signup" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700">
                সাইন আপ
           </Link>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="ক্যাটাগরি"className="no-scrollbar flex items-center gap-6 overflow-x-auto whitespace-nowrap py-2.5 text-xs text-gray-600 sm:text-sm">
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined}className={`flex items-center gap-1.5 font-semibold transition-colors ${pathname === "/"? "text-emerald-600": "text-gray-600 hover:text-emerald-700" }`}>
              সব ক্যাটাগরি
            </Link>
            {categories.map((category) => {
              const slug = category.slug || category.id;
              const isActive = pathname === `/category/${slug}`;

              return (
                <Link
                  key={category.id ?? category.slug}
                  href={`/category/${slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "font-semibold text-emerald-600"
                      : "text-gray-600 hover:text-emerald-600"}`}>
                  {category.icon && <span aria-hidden="true">{category.icon}</span>}
                  <span>
                    {category.nameBn || category.name_bn || category.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
