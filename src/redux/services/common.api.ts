import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // uploadFile: builder.mutation<{ id: string; file_name: string; size: string; path: string; content_type: string; extension: string; status: string }[], { files: File | File[] }>({
    uploadFile: 
    builder.mutation<{ 
        id: string; 
        file_name: string; 
        size: string; 
        path: string; 
        content_type: string; 
        extension: string; 
        status: string }[],
      {
        files: File | File[]
        reportCategory: string
        reportNotes?: string
        reportTitle: string
        reportDate: string
      }>({
      // query: ({ files }) => {
      query: ({ files, reportCategory, reportNotes, reportTitle, reportDate }) => {
        const formData = new FormData()
        if (files instanceof File) formData.append('files', files)
        // else files.map((item) => formData.append('files', item))
        else files.forEach((file) => formData.append('files', file))

        formData.append('report_category', reportCategory)
        formData.append('report_title', reportTitle)
        formData.append('report_date', reportDate)

        if (reportNotes) {
          formData.append('report_notes', reportNotes)
        }

        return {
          url: '/v1/documents/upload',
          method: 'POST',
          // formData: true,
          body: formData,
          headers: { hideSuccessToast: 'true' },
        }
      },
    }),
  }),
})

export const { useUploadFileMutation } = extendedApi
