import { HealthReportDetail } from '@/dto/HealthReport.dto'
import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateReport: builder.mutation<{ report_id: string }, { report_title: string; fileIds: string[] }>({
      query: ({ report_title, fileIds }) => ({
        url: `/v1/health-assessment/generate-report`,
        method: 'POST',
        params: { report_title },
        body: fileIds,
        headers: { hideSuccessToast: 'true' },
      }),
      invalidatesTags: (result, error, report_id) => (!error ? [{ type: 'health-report', report_id }] : []),
    }),

    getReportById: builder.query<HealthReportDetail, { report_id: string }>({
      query: ({ report_id }) => ({
        url: `/v1/health-assessment/report/${report_id}`,
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
      }),
      providesTags: (result, error, report_id) => (!error ? [{ type: 'health-report', report_id }] : []),
    }),

    getReports: builder.query<{ reports: HealthReportDetail[] }, void>({
      query: () => ({
        url: `/v1/health-assessment/reports`,
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
      }),
      providesTags: (result, error) => (!error ? [{ type: 'health-report', id: 'LIST' }] : []),
    }),

    compareReports: builder.mutation<{ summary: string }, { report_id_1: string; report_id_2: string }>({
      query: (body) => ({
        url: `/v1/health-assessment/compare-user-reports`,
        method: 'POST',
        headers: { hideSuccessToast: 'true' },
        body: body,
      }),
      invalidatesTags: (result, error) => (!error ? [{ type: 'health-report', id: 'LIST' }] : []),
    }),
  }),
})

export const { useGenerateReportMutation, useGetReportByIdQuery, useGetReportsQuery, useCompareReportsMutation } = extendedApi
