import { WaitlistDTO } from '@/dto/Waitlist.dto'
import { api } from '../api.config'
import { TPaginationApiParams, TPaginationApiResponse } from '@/types'

export const extendedApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    AdminWaitlists: builder.query<TPaginationApiResponse<WaitlistDTO>, TPaginationApiParams>({
      query: ({ page = 1, limit = 10, subscription_type }) => ({
        url: '/v1/admin/waitlists',
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
        params: { page, limit, subscription_type },
      }),
    }),

    AdminGetWaitlistById: builder.query<WaitlistDTO, string>({
      query: (id) => ({
        url: `/v1/admin/waitlist/${id}`,
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
      }),
    }),
  }),
})

export const { useAdminWaitlistsQuery, useLazyAdminWaitlistsQuery, useAdminGetWaitlistByIdQuery } = extendedApi
