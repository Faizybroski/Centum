import { HelpCircle } from 'lucide-react'

export default function FAQEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <HelpCircle className="h-10 w-10 text-gray-300" />
      <h3 className="text-base font-medium text-gray-700">
        No FAQs yet
      </h3>
      <p className="text-sm text-gray-500 max-w-sm">
        We couldn’t find any FAQs for this category.
        Try selecting a different one or check back later.
      </p>
    </div>
  )
}
