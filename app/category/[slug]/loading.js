export default function CategoryLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-2 h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="mb-8 h-4 w-72 animate-pulse rounded bg-gray-100" />

      <div className="mb-6 flex items-center justify-between">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-40 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="flex h-64 animate-pulse flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div>
              <div className="mb-4 flex justify-between">
                <div className="h-12 w-12 rounded-lg bg-gray-200" />
                <div className="h-6 w-16 rounded bg-gray-200" />
              </div>
              <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-100" />
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="h-6 w-1/3 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
