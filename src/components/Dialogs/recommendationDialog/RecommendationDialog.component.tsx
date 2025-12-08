import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge, BadgeCheck, BookOpen, Check, CheckCircle, ClipboardList, Donut, Lightbulb, X } from 'lucide-react'
import clsx from 'clsx'
import { RecommendationDialogProps } from './RecommendationDialog.type'
import { SummaryAddOn } from '@/components/reportSummary/recommendationSection/SummaryAddOn'

export const RecommendationDialog = ({
  open,
  setOpen,
  title,
  icon,
  positiveTitle,
  negativeTitle,
  positives,
  negatives,
  foodsToLimit,
  recommendedFoods,
  recommendedExercises,
  activitiesToLimit,
  recommendedSleep,
  sleepHygieneTips,
  recommendedSupplements,
  supplementsToLimit,
  positiveColor = 'green',
  summary,
  whyThisMattersForYou,
}: RecommendationDialogProps) => {
  const positiveStyles = {
    green: {
      border: 'border-green-200',
      bg: 'bg-green-50',
      titleText: 'text-green-900',
      itemBg: 'bg-green-100',
      itemText: 'text-green-900',
    },
    blue: {
      border: 'border-blue-200',
      bg: 'bg-blue-50',
      titleText: 'text-blue-900',
      itemBg: 'bg-blue-100',
      itemText: 'text-blue-900',
    },
    purple: {
      border: 'border-purple-200',
      bg: 'bg-purple-50',
      titleText: 'text-purple-900',
      itemBg: 'bg-purple-100',
      itemText: 'text-purple-900',
    },
    orange: {
      border: 'border-orange-200',
      bg: 'bg-orange-50',
      titleText: 'text-orange-900',
      itemBg: 'bg-orange-100',
      itemText: 'text-orange-900',
    },
  }

  const style = positiveStyles[positiveColor]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Positive Section */}
            <div className={clsx('p-4 rounded-lg border', style.border, style.bg)}>
              <h4 className={clsx('font-semibold mb-3 flex items-center gap-2', style.titleText)}>
                {icon}
                Things to do
              </h4>
              <div className={clsx('space-y-3 text-sm', style.itemText)}>
                {positives.map((item, index) => (
                  <div key={index} className={clsx('p-3 rounded', style.itemBg)}>
                    <div className={clsx('font-medium', style.itemText)}>{item}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Negative Section */}
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                <X className="h-5 w-5" />
                Things to avoid
              </h4>
              <div className="space-y-3 text-sm text-red-800">
                {negatives.map((item, index) => (
                  <div key={index} className="p-3 bg-red-100 rounded">
                    <div className="font-medium text-red-900">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Recommendations */}
          <div className="grid grid-cols-1 gap-6">
            <SummaryAddOn title="Foods to Limit" icon={<Donut className="h-5 w-5" />} items={foodsToLimit || []} borderColor="border-orange-200" bgColor="bg-orange-50" textColor="text-orange-800" />

            <SummaryAddOn title="Recommended Foods" icon={<BadgeCheck className="h-5 w-5" />} items={recommendedFoods || []} borderColor="border-teal-200" bgColor="bg-teal-50" textColor="text-teal-800" />

            <SummaryAddOn title="Exercise Types to Focus On" icon={<CheckCircle className="h-5 w-5" />} items={recommendedExercises || []} borderColor="border-sky-200" bgColor="bg-sky-50" textColor="text-sky-800" />

            <SummaryAddOn title="Activities to Limit" icon={<X className="h-5 w-5" />} items={activitiesToLimit || []} borderColor="border-pink-200" bgColor="bg-pink-50" textColor="text-pink-800" />

            <SummaryAddOn title="Healthy Sleep Goals" icon={<CheckCircle className="h-5 w-5" />} items={recommendedSleep || []} borderColor="border-yellow-200" bgColor="bg-yellow-50" textColor="text-yellow-800" />

            <SummaryAddOn title="Tips for Better Sleep" icon={<BookOpen className="h-5 w-5" />} items={sleepHygieneTips || []} borderColor="border-purple-200" bgColor="bg-purple-50" textColor="text-purple-800" />

            <SummaryAddOn title="Supplements to Focus On" icon={<Badge className="h-5 w-5" />} items={recommendedSupplements || []} borderColor="border-emerald-200" bgColor="bg-emerald-50" textColor="text-emerald-800" />

            <SummaryAddOn title="Supplements to Avoid or Limit" icon={<X className="h-5 w-5" />} items={supplementsToLimit || []} borderColor="border-rose-200" bgColor="bg-rose-50" textColor="text-rose-800" />

            {/* summary Section */}
            {summary && (
              <div className="p-4 border border-indigo-200 bg-indigo-50 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-indigo-900 mb-3">
                  <ClipboardList className="h-5 w-5 " />
                  Summary
                </h4>
                <div className="space-y-2 text-sm text-indigo-800">
                  <div className="font-medium">{summary}</div>
                </div>
              </div>
            )}

            {/* Why This Matters For You Section */}
            {whyThisMattersForYou && (
              <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                <h4 className="flex items-center gap-2 font-semibold text-yellow-900 mb-3">
                  <Lightbulb className="h-5 w-5" />
                  Why This Matters For You
                </h4>
                <div className="space-y-2 text-sm text-yellow-800">
                  <div className="font-medium">{whyThisMattersForYou}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
