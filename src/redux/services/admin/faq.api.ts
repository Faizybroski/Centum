import { api } from '../api.config'
import { FAQ } from '@/types/FAQs.type'
import { faqSchema, TSchema } from '@/app/(admin)/admin/faq/_components/FAQForm/FAQForm.schema'

export interface FAQResponse {
  count: number
  data: FAQ[]
}

export const extendedApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // getFaqs: builder.query<FAQResponse, { category?: string } | void>({
    getFaqs: builder.query<any, void>({
      // query: (arg) => {
      //   const category = arg?.category
      //   return category ? `/v1/admin/faq?category=${category}` : '/v1/admin/faq'

      //   // const query = category ? `/v1/admin/faqs?category=${category}` : '/v1/admin/faqs'

      //   // return {
      //   //   url: query,
      //   //   method: 'GET',
      //   // }
      // },
      query: () =>
        // const category = arg?.category
        // return category ? `/v1/admin/faq?category=${category}` : '/v1/admin/faq'

        // const query = category ? `/v1/admin/faqs?category=${category}` : '/v1/admin/faqs'

        // return {
        //   url: query,
        //   method: 'GET',
        // }
        ({ url: `/v1/admin/faq`, method: 'GET' }),
      transformResponse: (response: any) => response,
      providesTags: ['FAQ'],
    }),

    createFaq: builder.mutation<any, TSchema>({
      query: (body) => ({
        url: '/v1/admin/faq',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FAQ'],
    }),

    updateFaq: builder.mutation<any, { id: string } & TSchema>({
      query: ({ id, ...body }) => ({
        url: `/v1/admin/faq/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['FAQ'],
    }),

    autosaveFaq: builder.mutation<any, { id?: string } & TSchema>({
      query: ({ id, ...body }) => ({
        url: id ? `/v1/admin/faq/${id}` : '/v1/admin/faq',
        method: id ? 'PUT' : 'POST',
        body: { ...body, status: 'draft' },
      }),
    }),

    deleteFaq: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/v1/admin/faq/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FAQ'],
    }),
  }),
})

export const { useGetFaqsQuery, useCreateFaqMutation, useUpdateFaqMutation, useAutosaveFaqMutation, useDeleteFaqMutation } = extendedApi
