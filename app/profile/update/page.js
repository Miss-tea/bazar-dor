"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

function ProfileUpdateForm({ initialName }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleUpdate(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({ name });
      if (error) {
        toast.error(error.message || "হালনাগাদ করা সম্ভব হয়নি");
        return;
      }

      toast.success("নাম সফলভাবে হালনাগাদ করা হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "হালনাগাদ করার সময় ত্রুটি হয়েছে।",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div>
        <Link
          href="/profile"
          className="mb-4 inline-block text-sm font-medium text-emerald-600 hover:underline" >
          ← প্রোফাইলে ফিরে যান
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          তথ্য হালনাগাদ করুন
          </h1>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-xs font-semibold text-gray-700">
            নতুন নাম
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-emerald-500"/>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-lg bg-emerald-600 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
        </button>
      </form>
    </section>
  );
}

export default function ProfileUpdatePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="min-h-screen bg-gray-50 py-16 text-center">
        <p className="text-gray-500">তথ্য লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="mb-4 text-gray-700">তথ্য পরিবর্তন করতে সাইন ইন করুন।</p>
          <Link
            href="/signin"
            className="inline-block rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white" >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <ProfileUpdateForm key={session.user.id} initialName={session.user.name} />
    </main>
  );
}