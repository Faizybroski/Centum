import { api } from './api.config'
import { FAQ } from '@/types/FAQs.type'

export interface FAQResponse {
  count: number
  data: FAQ[]
}

export const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Public / User / Admin
    getAllFaqs: builder.query<FAQResponse, { category?: string } | void>({
      query: (params) => {
        const query = params?.category ? `faqs?category=${params.category}` : 'faqs'

        return {
          url: query,
          method: 'GET',
        }
      },
      providesTags: ['FAQ'],
    }),
  }),
})

export const { useGetAllFaqsQuery, useLazyGetAllFaqsQuery } = faqApi
