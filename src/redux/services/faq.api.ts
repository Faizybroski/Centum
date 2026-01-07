import { api } from './api.config'
import { FAQ } from '@/types/FAQs.type'

export interface FAQResponse {
  count: number
  data: FAQ[]
}

export const publicFaqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Public / User / Admin
    getAllFaqs: builder.query<any, void>({
      query: () => ({ url: `/v1/faq`, method: 'GET' }),
      transformResponse: (response: any) => response,
      providesTags: ['FAQ'],
    }),
  }),
})

export const { useGetAllFaqsQuery, useLazyGetAllFaqsQuery } = publicFaqApi
