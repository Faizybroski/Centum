import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    contactUs: builder.mutation<{ message: string }, { name: string; email: string; phone?: string; subject: string; message: string }>({
      query: (body) => ({
        url: '/v1/contact/contact-us',
        method: 'POST',
        body,
      }),
    }),

    subscribeToNewsletter: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: '/v1/contact/subscribe',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => (!error ? [{ type: 'profile' }] : []),
    }),

    joinWaitlist: builder.mutation<{ message: string }, { email: string; subscription_type?: string }>({
      query: (body) => ({
        url: '/v1/contact/join-waitlist',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => (!error ? [{ type: 'profile' }] : []),
    }),
  }),
})

export const { useContactUsMutation, useSubscribeToNewsletterMutation, useJoinWaitlistMutation } = extendedApi
