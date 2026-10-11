"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import SocialAuthButtons from "@/components/SocialAuthButtons";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("authRequired") === "1") {
      toast.error("এই পেজ দেখতে সাইন ইন করুন");
      params.delete("authRequired");
      const query = params.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
      );
    }
  }, []);

  async function handleSignIn(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
       error instanceof Error ? error.message : "একটি ত্রুটি ঘটেছে।",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <Link
            href="/"
            className="mb-4 inline-block text-sm font-medium text-emerald-600 hover:underline">
            ← হোম পেজে ফিরে যান
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            সাইন ইন করুন
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টে প্রবেশ করতে ইমেইল ও পাসওয়ার্ড দিন।
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@gmail.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/>
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black placeholder:text-black outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/>
          </div>
          <button type="submit" disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-emerald-600 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>
        <SocialAuthButtons />

        <p className="text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-emerald-600 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </section>
    </main>
  );
}