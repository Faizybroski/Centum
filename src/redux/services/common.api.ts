import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<{ id: string; file_name: string; size: string; path: string; content_type: string; extension: string; status: string }[], { files: File | File[] }>({
      query: ({ files }) => {
        const formData = new FormData()
        if (files instanceof File) formData.append('files', files)
        else files.map((item) => formData.append('files', item))

        return {
          url: '/v1/documents/upload',
          method: 'POST',
          formData: true,
          body: formData,
          headers: { hideSuccessToast: 'true' },
        }
      },
    }),
  }),
})

export const { useUploadFileMutation } = extendedApi
