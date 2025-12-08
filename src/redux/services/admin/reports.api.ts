import { FailedReportDTO } from '@/dto'
import { api } from '../api.config'
import { TPaginationApiParams, TPaginationApiResponse } from '@/types'

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

    retryReportGeneration: builder.mutation<void, { report_id: string }>({
      query: ({ report_id }) => ({
        url: `/v1/admin/retry-report-generation/${report_id}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, report_id) => (!error ? [{ type: 'failed-health-report', report_id }] : []),
    }),
  }),
})

export const { useUsersWithFailedReportsQuery, useLazyUsersWithFailedReportsQuery, useRetryReportGenerationMutation } = extendedApi
