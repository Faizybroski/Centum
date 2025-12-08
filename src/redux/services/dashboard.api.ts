import { UserDashboardDTO } from '@/dto/userDashboard.dto'
import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<UserDashboardDTO, void>({
      query: () => ({
        url: '/v1/health-assessment/dashboard',
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
      }),
      providesTags: (result, error) =>
        !error
          ? [
              { type: 'dashboard', id: 'dashboard' },
              { type: 'assessment', id: 'dashboard' },
              { type: 'profile', id: 'user' },
            ]
          : [],
    }),

    updateVo2Max: builder.mutation<void, { vo2_max: number | string }>({
      query: (body) => ({
        url: `/v1/health-assessment/vo2-max`,
        method: 'PATCH',
        body,
        headers: { hideSuccessToast: 'true' },
      }),
      invalidatesTags: (result, error) =>
        !error
          ? [
              { type: 'dashboard', id: 'dashboard' },
              { type: 'assessment', id: 'dashboard' },
              { type: 'profile', id: 'user' },
            ]
          : [],
    }),
  }),
})

export const { useGetDashboardDataQuery, useUpdateVo2MaxMutation } = extendedApi
