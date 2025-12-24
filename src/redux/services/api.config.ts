import { getCookie } from '@/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'apis',
  tagTypes: ['user', 'health-report', 'assessment', 'dashboard', 'profile', 'failed-health-report', 'FAQ'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, {}) => {
      if (getCookie('access_token')) headers.set('Authorization', `Bearer ${getCookie('access_token')}`)

      return headers
    },
  }),
  endpoints: () => ({}),
})
