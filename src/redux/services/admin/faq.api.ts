import { api } from '../api.config'
import { FAQ } from '@/types/FAQs.type'
import { faqSchema, TSchema } from '@/app/(admin)/admin/faq/_components/FAQForm/FAQForm.schema'

export interface FAQResponse {
  count: number
  data: FAQ[]
}

export const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // getAllFaqs: builder.query<FAQResponse, { category?: string } | void>({
    //   query: (params) =>
    //     params?.category ? `faqs?category=${params.category}` : 'faqs',
    //   providesTags: ['FAQ'],
    // }),

    createFaq: builder.mutation<any, TSchema>({
      query: (body) => ({
        url: 'admin/faq',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FAQ'],
    }),

    updateFaq: builder.mutation<any, { id: string } & TSchema>({
      query: ({ id, ...body }) => ({
        url: `admin/faq/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['FAQ'],
    }),
    deleteFaq: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `admin/faq/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FAQ'],
    }),
  }),
})

export const { useCreateFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } = faqApi
