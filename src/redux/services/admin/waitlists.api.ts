import { WaitlistDTO } from '@/dto/Waitlist.dto'
import { api } from '../api.config'
import { TPaginationApiParams, TPaginationApiResponse } from '@/types'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AdminWaitlists: builder.query<TPaginationApiResponse<WaitlistDTO>, TPaginationApiParams>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/v1/admin/waitlists',
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
        params: { page, limit },
      }),
    }),
  }),
})

export const { useAdminWaitlistsQuery, useLazyAdminWaitlistsQuery } = extendedApi
