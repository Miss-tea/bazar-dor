import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-gray-200 bg-[#f0f2f5] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:gap-12 md:p-12">
          <div className="space-y-4 text-center md:text-left">
            <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold tracking-wider text-emerald-600 uppercase md:text-sm">
              দৈনন্দিন বাজার দর
            </span>
            <h1 className="text-3xl leading-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
              সঠিক দামে কিনুন, <br className="hidden sm:inline" />
              <span className="text-emerald-600">
                প্রতিদিনের সঠিক তথ্য
              </span>{" "}
              জানুন
            </h1>
            <p className="mx-auto max-w-xl text-base text-gray-600 sm:text-lg md:mx-0">
              আপনার শহরের বাজার পণ্যের সর্বশেষ ও নির্ভুল দরদামের তালিকা এক
              জায়গায়। প্রতিদিন আপডেট করা মূল্য তালিকা দেখুন খুব সহজেই।
            </p>
            <div className="pt-2">
              <Link
                href="#সব-পণ্য"
                className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-95"
              >
                বাজার দর দেখুন
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative h-64 w-full max-w-sm sm:h-80">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ব্যানার"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
