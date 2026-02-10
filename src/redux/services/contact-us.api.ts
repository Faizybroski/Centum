import { api } from './api.config'

export interface WaitlistQuestionnairePayload {
  email: string
  subscription_type?: string

  health_goal: 'athletic' | 'chronic' | 'proactive' | 'weight' | 'sleep' | 'other'
  health_goal_other?: string

  features: Array<
    | 'biomarkers'
    | 'wearables'
    | 'ai_recommendations'
    | 'secure_storage'
    | 'education'
    | 'progress_tracking'
    | 'addon_tests'
  >

  pricing_expectation: '40_60' | '60_80' | '80_100' | '100_plus' | 'not_sure'

  current_tracking: 'manual' | 'wearable' | 'apps' | 'doctor_only' | 'none'

  biggest_challenge: string

  interview_interest: boolean
  interview_contact?: string
}

export const extendedApi = api.injectEndpoints({
  overrideExisting: true,
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

    // joinWaitlist: builder.mutation<{ message: string }, { email: string; subscription_type?: string }>({
    joinWaitlist: builder.mutation<{ message: string }, WaitlistQuestionnairePayload>({

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
