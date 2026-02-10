'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Calendar, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAdminGetWaitlistByIdQuery } from '@/redux/services/admin/waitlists.api'
import { NA, FEATURE_LABELS, HEALTH_GOAL_LABELS, PRICING_LABELS, TRACKING_LABELS } from '@/dto/Waitlist.dto'

export default function WaitlistDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const router = useRouter()

  // const { data, isLoading, isError } = useAdminGetWaitlistByIdQuery(params.id)
  const { data, isLoading, isError } = useAdminGetWaitlistByIdQuery(id ?? '', {
    skip: !id,
  })

  if (isLoading)
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-muted rounded" />
          <div className="h-8 w-2/3 bg-muted rounded" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg border p-6 space-y-4">
                <div className="h-4 w-40 bg-muted rounded" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-muted rounded" />
                  <div className="h-3 w-5/6 bg-muted rounded" />
                  <div className="h-3 w-2/3 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )

  if (isError || !data)
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <div className="flex flex-col items-center justify-center text-center gap-4 border rounded-lg p-10 bg-muted/20">
          <div className="text-4xl">😕</div>

          <h2 className="text-xl font-semibold">Unable to load waitlist details</h2>

          <p className="text-muted-foreground max-w-md">Something went wrong while fetching this waitlist entry. Please try again or go back to the list.</p>

          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => router.back()}>
              Go back
            </Button>

            <Button onClick={() => location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    )
  const q = data.questionnaire

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {/* <h1 className="text-2xl font-semibold flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              {data.email}
            </h1> */}
            <h1 className="text-2xl font-semibold flex items-center gap-2 max-w-full">
              <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
              <span className="break-all break-words whitespace-normal">{data.email}</span>
            </h1>
            <p className="text-sm text-muted-foreground">Waitlist ID: {data._id}</p>
          </div>

          <Badge variant="default" className="w-fit capitalize">
            {data.subscription_type}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <Card>
          <CardHeader>
            <CardTitle>Health Overview</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <InfoRow label="Primary Goal" value={HEALTH_GOAL_LABELS[q?.health_goal]} />

            <InfoRow label="Pricing Expectation" value={PRICING_LABELS[q?.pricing_expectation]} />

            <InfoRow label="Current Tracking" value={TRACKING_LABELS[q?.current_tracking]} />

            <div>
              <p className="font-medium mb-2">Interested Features</p>

              {q?.features?.length ? (
                <div className="flex flex-wrap gap-2">
                  {q.features.map((f: string) => (
                    <Badge key={f} variant="outline">
                      {FEATURE_LABELS[f] ?? f}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">{NA}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right column */}
        <Card>
          <CardHeader>
            <CardTitle>User Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-medium mb-1">Biggest Challenge</p>
              <p className="text-muted-foreground leading-relaxed">{q?.biggest_challenge?.trim() || NA}</p>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <BadgeCheck className={q?.interview_interest === true ? 'text-green-600' : q?.interview_interest === false ? 'text-gray-400' : 'text-muted-foreground'} />
              <span className="font-medium">Open to Interview:</span>
              <span className="text-muted-foreground">{q?.interview_interest === true ? 'Yes' : q?.interview_interest === false ? 'No' : NA}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* ---------------- helpers ---------------- */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-medium">{label}</span>
      <span className="text-muted-foreground capitalize text-right">{value && value.trim() ? value : NA}</span>
    </div>
  )
}
