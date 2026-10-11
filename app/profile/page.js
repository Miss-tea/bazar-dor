"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সাইন আউট করা হয়েছে");
      router.push("/signin");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "সাইন আউট করার সময় ত্রুটি হয়েছে।",
      );
    }
  }

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
        <div className="max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="mb-4 text-gray-700">আপনি সাইন ইন করেননি</p>
          <Link
            href="/signin"
            className="inline-block rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white">
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  const { user } = session;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
            {user.name?.[0] || "U"}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-gray-900">
              {user.name}
            </h1>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/profile/update"
            className="block w-full rounded-lg border border-gray-300 py-2.5 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50">
            তথ্য পরিবর্তন করুন
          </Link>
          <button type="button" onClick={handleSignOut}
            className="w-full cursor-pointer rounded-lg bg-rose-600 py-2.5 font-medium text-white transition-colors hover:bg-rose-700">
            সাইন আউট
          </button>
        </div>
      </section>
    </main>
  );
}