import { api } from '../api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<any, void>({
      query: () => ({
        url: '/v1/admin/dashboard',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetDashboardDataQuery } = extendedApi
