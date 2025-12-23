import { UserDTO } from '@/dto'
import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ access_token: string; refresh_token: string; role: string }, { email: string; password: string }>({
      query: (body) => ({
        url: '/v1/auth/login',
        method: 'POST',
        body,
      }),
    }),

    signup: builder.mutation<any, Pick<UserDTO, 'full_name' | 'date_of_birth' | 'gender' | 'email' | 'phone_number'>>({
      query: (body) => ({
        url: '/v1/auth/register',
        method: 'POST',
        body,
      }),
    }),

    profile: builder.query<UserDTO, void>({
      query: () => ({
        url: '/v1/user/profile',
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
      }),
      providesTags: ['profile'],
    }),

    updateProfile: builder.mutation<void, Pick<UserDTO, 'full_name' | 'date_of_birth' | 'gender' | 'phone_number'>>({
      query: (body) => ({
        url: '/v1/user/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['profile'],
    }),

    verifyEmail: builder.query<void, { token: string }>({
      query: ({ token }) => ({
        url: `/api/v1/auth/verify?token=${token}`,
        method: 'POST',
      }),
    }),

    forgotPassword: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `/v1/auth/forgot-password`,
        method: 'POST',
        body: { email },
      }),
    }),

    resetPassword: builder.mutation<void, { password: string; token: string }>({
      query: ({ password, token }) => ({
        url: `/v1/auth/reset-password`,
        method: 'POST',
        body: { new_password: password, token },
      }),
    }),

    deleteAccount: builder.mutation<void, void>({
      query: () => ({
        url: '/v1/user/delete',
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useLoginMutation, useProfileQuery, useLazyProfileQuery, useSignupMutation, useLazyVerifyEmailQuery, useUpdateProfileMutation, useForgotPasswordMutation, useResetPasswordMutation, useDeleteAccountMutation } = extendedApi
