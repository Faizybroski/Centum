export default function FAQSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white border rounded-lg px-6 py-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>

          <div className="mt-3 h-3 w-full bg-gray-100 rounded" />
          <div className="mt-2 h-3 w-5/6 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  )
}