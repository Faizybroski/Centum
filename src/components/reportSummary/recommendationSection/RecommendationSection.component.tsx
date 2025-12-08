'use client'

import React from 'react'
import { Badge, BadgeCheck, BookOpen, Check, CheckCircle, ClipboardList, Donut, Info, Lightbulb, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HealthReportDetail } from '@/dto'
import { SummaryAddOn } from './SummaryAddOn'

type RecommendationSectionProps = {
  reportData: HealthReportDetail
  sectionKey: 'diet' | 'exercise' | 'sleep' | 'supplement'
  title: string
  Icon: React.ElementType
  color: string // tailwind color prefix like "green", "blue"
}

export default function RecommendationSection({ reportData, sectionKey, title, Icon, color }: RecommendationSectionProps) {
  const doList = reportData?.lifestyle_recommendations?.[sectionKey]?.do || []
  const dontList = reportData?.lifestyle_recommendations?.[sectionKey]?.dont || []
  const foodsToLimit = reportData?.lifestyle_recommendations?.[sectionKey]?.foods_to_limit || []
  const recommendedFoods = reportData?.lifestyle_recommendations?.[sectionKey]?.recommended_foods || []
  const recommendedExercises = reportData?.lifestyle_recommendations?.[sectionKey]?.recommended_exercises || []
  const recommendedSleep = reportData?.lifestyle_recommendations?.[sectionKey]?.recommended_sleep || []
  const activitiesToLimit = reportData?.lifestyle_recommendations?.[sectionKey]?.activities_to_limit || []
  const sleepHygieneTips = reportData?.lifestyle_recommendations?.[sectionKey]?.sleep_hygiene_tips || []
  const recommendedSupplements = reportData?.lifestyle_recommendations?.[sectionKey]?.recommended_supplements || []
  const supplementsToLimit = reportData?.lifestyle_recommendations?.[sectionKey]?.supplements_to_limit || []
  const summary = reportData?.lifestyle_recommendations?.[sectionKey]?.summary || ''
  const whyThisMattersForYou = reportData?.lifestyle_recommendations?.[sectionKey]?.why_this_matters_for_you || ''
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 text-${color}-800`}>
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Do Section */}
          <div className={`p-4 border border-${color}-200 bg-${color}-50 rounded-lg`}>
            <h4 className={`flex items-center gap-2 font-semibold text-${color}-900`}>
              <Check className="h-5 w-5" />
              Things to Do
            </h4>
            <div className={`space-y-2 text-sm text-${color}-800`}>
              {doList.map((item, index) => (
                <div key={index} className={`p-2 bg-${color}-50 rounded`}>
                  <div className="font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Don't Section */}
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <h4 className="flex items-center gap-2 font-semibold text-red-900">
              <X className="h-5 w-5" />
              Things to Avoid
            </h4>
            <div className="space-y-2 text-sm text-red-800">
              {dontList.map((item, index) => (
                <div key={index} className="p-2 bg-red-50 rounded">
                  <div className="font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-4 mt-6">
          {/* Foods to Limit Section */}
          {foodsToLimit.length > 0 && <SummaryAddOn title="Foods to Limit" icon={<Donut className="h-5 w-5" />} items={foodsToLimit} borderColor="border-orange-200" bgColor="bg-orange-50" textColor="text-orange-800" />}
          {recommendedFoods.length > 0 && (
            <SummaryAddOn title="Recommended Foods" icon={<BadgeCheck className="h-5 w-5" />} items={recommendedFoods} borderColor="border-teal-200" bgColor="bg-teal-50" textColor="text-teal-800" />
          )}
          {recommendedExercises.length > 0 && (
            <SummaryAddOn title="Exercise Types to Focus On" icon={<CheckCircle className="h-5 w-5" />} items={recommendedExercises} borderColor="border-sky-200" bgColor="bg-sky-50" textColor="text-sky-800" />
          )}
          {activitiesToLimit.length > 0 && <SummaryAddOn title="Activities to Limit" icon={<X className="h-5 w-5" />} items={activitiesToLimit} borderColor="border-pink-200" bgColor="bg-pink-50" textColor="text-pink-800" />}
          {recommendedSleep.length > 0 && (
            <SummaryAddOn title="Healthy Sleep Goals" icon={<CheckCircle className="h-5 w-5" />} items={recommendedSleep} borderColor="border-yellow-200" bgColor="bg-yellow-50" textColor="text-yellow-800" />
          )}
          {sleepHygieneTips.length > 0 && (
            <SummaryAddOn title="Tips for Better Sleep" icon={<BookOpen className="h-5 w-5" />} items={sleepHygieneTips} borderColor="border-purple-200" bgColor="bg-purple-50" textColor="text-purple-800" />
          )}
          {recommendedSupplements.length > 0 && (
            <SummaryAddOn title="Supplements to Focus On" icon={<Badge className="h-5 w-5" />} items={recommendedSupplements} borderColor="border-emerald-200" bgColor="bg-emerald-50" textColor="text-emerald-800" />
          )}
          {supplementsToLimit.length > 0 && (
            <SummaryAddOn title="Supplements to Avoid or Limit" icon={<X className="h-5 w-5" />} items={supplementsToLimit} borderColor="border-rose-200" bgColor="bg-rose-50" textColor="text-rose-800" />
          )}

          {/* Summary Section */}
          {summary && (
            <div className="p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
              <h4 className="flex items-center gap-2 font-semibold text-indigo-900 mb-3">
                <ClipboardList className="h-5 w-5" />
                Summary
              </h4>
              <div className="space-y-2 text-sm text-indigo-800">
                <div className="font-medium">{summary}</div>
              </div>
            </div>
          )}
          {/* Why This Matters For You Section */}
          {whyThisMattersForYou && (
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <h4 className="flex items-center gap-2 font-semibold text-green-900 mb-3">
                <Lightbulb className="h-5 w-5" />
                Why This Matters For You
              </h4>
              <div className="space-y-2 text-sm text-green-800">
                <div className="font-medium">{whyThisMattersForYou}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
