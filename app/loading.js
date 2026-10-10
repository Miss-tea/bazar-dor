export default function Loading() {
  return (
    <main className="p-8">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="space-y-4 rounded-lg border border-gray-200 p-4"
          >
            <div className="h-48 animate-pulse rounded-md bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
