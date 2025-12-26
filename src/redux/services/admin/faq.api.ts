import { api } from '../api.config'
import { FAQ } from '@/types/FAQs.type'
import { faqSchema, TSchema } from '@/app/(admin)/admin/faq/_components/FAQForm/FAQForm.schema'

export interface FAQResponse {
  count: number
  data: FAQ[]
}

export const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<FAQResponse, { category?: string } | void>({
      query: (params) => (params?.category ? `admin/faqs?category=${params.category}` : 'admin/faqs'),
      providesTags: ['FAQ'],
    }),

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

    autosaveFaq: builder.mutation<any, { id?: string } & TSchema>({
      query: ({ id, ...body }) => ({
        url: id ? `admin/faq/${id}` : 'admin/faq',
        method: id ? 'PUT' : 'POST',
        body: { ...body, status: 'draft' },
      }),
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

export const { useGetFaqsQuery, useCreateFaqMutation, useUpdateFaqMutation, useAutosaveFaqMutation, useDeleteFaqMutation } = faqApi
