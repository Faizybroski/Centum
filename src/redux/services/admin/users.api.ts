import { FailedReportDTO, HealthReportDetail, UserDTO } from '@/dto'
import { api } from '../api.config'
import { TPaginationApiParams, TPaginationApiResponse } from '@/types'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AdminUsers: builder.query<TPaginationApiResponse<UserDTO>, TPaginationApiParams>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/v1/admin/users',
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
        params: { page, limit },
      }),
    }),

    userDetail: builder.query<any, TPaginationApiParams & { id: string }>({
      query: ({ id, page = 1, limit = 10 }) => ({
        url: `/v1/admin/user-reports/${id}`,
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
        params: { page, limit },
      }),
    }),
  }),
})

export const { useAdminUsersQuery, useLazyAdminUsersQuery, useUserDetailQuery } = extendedApi
