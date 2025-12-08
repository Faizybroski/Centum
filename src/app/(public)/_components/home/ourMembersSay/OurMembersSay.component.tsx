import React from 'react'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    initials: 'SJ',
    role: 'Marketing Executive',
    text: "CENTUM helped me identify several deficiencies I didn't know I had. The personalized recommendations have made a huge difference in my energy levels.",
  },
  {
    name: 'Dr. Michael Chen',
    initials: 'MC',
    role: 'Physician',
    text: "As a doctor, I'm impressed by the comprehensive analysis. CENTUM provides insights that complement my medical practice perfectly.",
  },
  {
    name: 'Emma Rodriguez',
    initials: 'ER',
    role: 'Fitness Enthusiast',
    text: 'The progress tracking feature is amazing - I can see how my lifestyle changes are actually improving my biomarkers over time.',
  },
]

const StarRating = ({ count = 5 }) => (
  <div className="flex">
    {[...Array(count)].map((_, i) => (
      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
    ))}
  </div>
)

export default function OurMembersSay() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Members Say</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Real stories from people who transformed their health with CENT
            <span className="text-green-500 font-extrabold underline">U</span>M
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map(({ name, initials, role, text }, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="mb-4">
                <StarRating />
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 italic">"{text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3  group-hover:scale-110">
                  <span className="text-green-600 dark:text-green-300 font-semibold text-sm">{initials}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-green-600">{name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Rating */}
        <div className="text-center mt-6 sm:mt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <StarRating />
            <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">4.9/5</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">(2,500+ reviews)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
