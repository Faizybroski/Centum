'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/dataTable/DataTable.component'
import { Clock } from 'lucide-react'
import { useAdminWaitlistsQuery } from '@/redux/services/admin/waitlists.api'
import useWaitlistsColumns from './useWaitlistsColumns.hook'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import { pageSize } from '@/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { NA, FEATURE_LABELS, HEALTH_GOAL_LABELS, PRICING_LABELS, TRACKING_LABELS } from '@/dto/Waitlist.dto'
import { Download } from 'lucide-react'
import { exportToCSV } from '@/utils/exportToCSV'

const SUBSCRIPTION_LABELS: Record<string, string> = {
  core: 'Core',
  plus: 'Plus',
  prime: 'Prime',
}

function formatWaitlistForCSV(list: any[]) {
  return list.map((item) => ({
    Email: item.email,
    Subscription: SUBSCRIPTION_LABELS[item.subscription_type] ?? item.subscription_type,
    HealthGoal: HEALTH_GOAL_LABELS[item.questionnaire?.health_goal] ?? 'Not provided',
    Pricing: PRICING_LABELS[item.questionnaire?.pricing_expectation] ?? 'Not provided',
    Tracking: TRACKING_LABELS[item.questionnaire?.current_tracking] ?? 'Not provided',
    Features: item.questionnaire?.features?.map((f: string) => FEATURE_LABELS[f] ?? f).join(' | ') ?? 'Not provided',
    Interview: item.questionnaire?.interview_interest ? 'Yes' : 'No',
    BiggestChallenge: item.questionnaire?.biggest_challenge?.trim() || 'Not provided',
    CreatedAt: item.created_at,
  }))
}

// 4. Main Table Component
function WaitlistsTable() {
  const router = useRouter()
  const [page, setPage] = React.useState(1)
  const [subscriptionType, setSubscriptionType] = React.useState<'all' | 'core' | 'plus' | 'prime'>('all')

  const { data, isFetching, isError } = useAdminWaitlistsQuery({
    page,
    limit: pageSize,
    subscription_type: subscriptionType === 'all' ? undefined : subscriptionType,
  })
  const { columns } = useWaitlistsColumns()

  const subscriptionCounts = data?.subscription_counts || {}

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Clock className="w-6 h-6 text-gray-700" />
        <h2 className="text-xl font-medium text-gray-700">All Waitlists {data?.total_count}</h2>
      </div>
      {Object.keys(subscriptionCounts).length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {Object.entries(subscriptionCounts).map(([type, count]) => (
            <div key={type} className="px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-gray-700">
              {SUBSCRIPTION_LABELS[type] ?? type}: {count}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Select
          value={subscriptionType || 'all'}
          onValueChange={(value) => {
            setPage(1)
            setSubscriptionType(value as typeof subscriptionType)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by tier" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="core">Core</SelectItem>
            <SelectItem value="plus">Plus</SelectItem>
            <SelectItem value="prime">Prime</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          disabled={!data?.list?.length}
          onClick={() => {
            if (!data?.list?.length) return
            
            const formatted = formatWaitlistForCSV(data.list)
            exportToCSV(formatted, `waitlists_${subscriptionType}_${new Date().toISOString()}.csv`)
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>
      <RenderComponent isLoading={isFetching} isError={isError} loader={<Skeleton />}>
        <DataTable
          columns={columns}
          data={data?.list || []}
          page={page}
          setPage={setPage}
          totalPages={data?.total_pages || 1}
          isPaginationEnabled
          onRowClick={(row) => {
            router.push(`/admin/waitlist/${row._id}`)
          }}
        />
      </RenderComponent>
    </div>
  )
}

export default WaitlistsTable

function Skeleton() {
  return (
    <div className="rounded-lg overflow-x-auto">
      <Table className="border-separate border-spacing-0 [&_tr]:border-b [&_tr]:border-primary/10 [&_th]:border-b [&_th]:border-primary/10 [&_td]:border-b [&_td]:border-primary/10">
        {/* Header skeleton */}
        <TableHeader className="sticky top-0 z-10 bg-primary/10">
          <TableRow>
            <TableHead className="p-4">
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            </TableHead>
            <TableHead className="p-4">
              <div className="h-4 w-40 bg-muted rounded animate-pulse" />
            </TableHead>
            <TableHead className="p-4">
              <div className="h-4 w-28 bg-muted rounded animate-pulse" />
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Body skeleton */}
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="hover:bg-primary/5">
              <TableCell className="p-4">
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
              </TableCell>
              <TableCell className="p-4">
                <div className="h-4 w-64 bg-muted rounded animate-pulse" />
              </TableCell>
              <TableCell className="p-4">
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
