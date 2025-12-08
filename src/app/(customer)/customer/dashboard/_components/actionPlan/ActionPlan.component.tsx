'use client'

import React, { useState } from 'react'
import { Apple, Activity, Moon, Pill } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UserDashboardDTO } from '@/dto/userDashboard.dto'
import { RecommendationDialog } from '@/components/Dialogs/recommendationDialog/RecommendationDialog.component'
import NoRecordsFound from '@/components/noRecordsFound/NoRecordFound.component'

const RECOMMENDATION_CONFIG = {
  diet: {
    title: 'Diet Recommendations',
    icon: <Apple className="h-5 w-5 text-green-600" />,
    positiveTitle: 'Recommended Foods',
    negativeTitle: 'Foods to Limit',
    positiveColor: 'green',
  },
  exercise: {
    title: 'Lifestyle Recommendations',
    icon: <Activity className="h-5 w-5 text-blue-600" />,
    positiveTitle: 'Recommended Activities',
    negativeTitle: 'Activities to Avoid',
    positiveColor: 'blue',
  },
  sleep: {
    title: 'Sleep Recommendations',
    icon: <Moon className="h-5 w-5 text-purple-600" />,
    positiveTitle: 'Good Sleep Habits',
    negativeTitle: 'Things to Avoid',
    positiveColor: 'purple',
  },
  supplement: {
    title: 'Supplement Recommendations',
    icon: <Pill className="h-5 w-5 text-orange-600" />,
    positiveTitle: 'Suggested Supplements',
    negativeTitle: 'Avoid These',
    positiveColor: 'orange',
  },
} as const

export default function ActionPlan({ data }: { data: UserDashboardDTO | undefined }) {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const { lifestyle_recommendations } = data || {}

  return (
    <>
      <div className="lg:col-span-4">
        <Card className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Plan</h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-4">
                {Object.keys(lifestyle_recommendations || {}).map((key) => {
                  const config = RECOMMENDATION_CONFIG[key as keyof typeof RECOMMENDATION_CONFIG]
                  if (!config) return null

                  return (
                    <div key={key} className="p-3 hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer border border-gray-100">
                      <div className="flex items-center gap-3">
                        {config.icon}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{config.title}</h4>
                          <p className="text-xs text-gray-600">{config.positiveTitle}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setOpenModal(key)}>
                          View
                        </Button>
                      </div>
                    </div>
                  )
                })}

                {data?.lifestyle_recommendations == undefined && <NoRecordsFound isCard={false} title="No Recommendations Found" description="There are no recommendations available at the moment." />}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {Object.entries(lifestyle_recommendations || {}).map(([key, value]) => {
        const config = RECOMMENDATION_CONFIG[key as keyof typeof RECOMMENDATION_CONFIG]
        if (!config) return null

        return (
          <RecommendationDialog
            key={key}
            open={openModal === key}
            setOpen={(val) => setOpenModal(val ? (key as keyof typeof RECOMMENDATION_CONFIG) : null)}
            title={config.title}
            icon={config.icon}
            positiveTitle={config.positiveTitle}
            negativeTitle={config.negativeTitle}
            positives={value.do}
            negatives={value.dont}
            foodsToLimit={value?.foods_to_limit}
            recommendedFoods={value?.recommended_foods}
            recommendedExercises={value?.recommended_exercises}
            activitiesToLimit={value?.activities_to_limit}
            recommendedSleep={value?.recommended_sleep}
            sleepHygieneTips={value?.sleep_hygiene_tips}
            recommendedSupplements={value?.recommended_supplements}
            supplementsToLimit={value?.supplements_to_limit}
            positiveColor={config.positiveColor}
            summary={value?.summary || ''}
            whyThisMattersForYou={value?.why_this_matters_for_you || ''}
          />
        )
      })}
    </>
  )
}
