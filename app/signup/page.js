"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import SocialAuthButtons from "@/components/SocialAuthButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
         email,
      password,
      });

      if (error) {
        toast.error(
          error.message || "সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
        );
        return;
      }

      toast.success("সফলভাবে সাইন আপ করা হয়েছে!");
      router.push("/signin");
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
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            বাজার দর কার্যক্রমে যুক্ত হতে আপনার তথ্য দিন।
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/>
          </div>
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
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/>
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
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder:text-black outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1 block text-sm font-medium text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder:text-black outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>
        <SocialAuthButtons />

        <p className="mt-5 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-medium text-emerald-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </section>
    </main>
  );
}