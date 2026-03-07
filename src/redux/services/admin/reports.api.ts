import { FailedReportDTO } from '@/dto'
import { api } from '../api.config'
import { TPaginationApiParams, TPaginationApiResponse } from '@/types'

export interface RetryReportResult {
  report_id: string
  report_title: string | null
  status: 'queued' | 'not_found' | 'not_failed' | 'max_retries' | 'error'
  message: string
}

export interface RetryBulkReportResponse {
  message: string
  success_count: number
  failed_count: number
  results: RetryReportResult[]
}

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    usersWithFailedReports: builder.query<TPaginationApiResponse<FailedReportDTO>, TPaginationApiParams>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/v1/admin/failed-reports',
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
        params: { page, limit },
      }),
      providesTags: (result, error) => (!error ? [{ type: 'failed-health-report', id: 'LIST' }] : []),
    }),

    retryBulkReportGeneration: builder.mutation<RetryBulkReportResponse, { report_ids: string[] }>({
      query: ({ report_ids }) => ({
        url: `/v1/admin/retry-report-generation`,
        method: 'POST',
        body: { report_ids },
      }),
      invalidatesTags: (result) =>
  result
    ? result.results.map((r) => ({
        type: 'failed-health-report',
        id: r.report_id
      }))
    : []
    }),

    retryReportGeneration: builder.mutation<void, { report_id: string }>({
      query: ({ report_id }) => ({
        url: `/v1/admin/retry-report-generation/${report_id}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, report_id) => (!error ? [{ type: 'failed-health-report', report_id }] : []),
    }),
  }),
})

export const { useUsersWithFailedReportsQuery, useLazyUsersWithFailedReportsQuery, useRetryReportGenerationMutation, useRetryBulkReportGenerationMutation } = extendedApi
