import { getCookie } from '@/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'apis',
  tagTypes: ['user', 'health-report', 'assessment', 'dashboard', 'profile', 'failed-health-report', 'FAQ'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    // prepareHeaders: (headers, {body}) => {
    //   if (body && !(body instanceof FormData)) {
    //     headers.set('Content-Type', 'application/json')
    //   }
    prepareHeaders: (headers, { arg }) => {
      if (typeof arg === 'object' && arg.body && !(arg.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json')
      }
      if (getCookie('access_token')) headers.set('Authorization', `Bearer ${getCookie('access_token')}`)

      return headers
    },
  }),
  endpoints: () => ({}),
})
