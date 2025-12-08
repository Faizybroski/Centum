import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFormDefinations: builder.query<any, number>({
      query: (id) => `/v1/health-assessment/form-step/${id}`,
    }),

    saveFormStep: builder.mutation<void, any>({
      query: (body) => ({
        url: '/v1/health-assessment/save-step',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, body) => (!error ? [{ type: 'assessment' }] : []),
    }),
  }),
})

export const { useLazyGetFormDefinationsQuery, useSaveFormStepMutation } = extendedApi
