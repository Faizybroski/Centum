'use client'

import Image from 'next/image'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef, useState } from 'react'

import { truncateString } from '@/utils'
import { Input } from '@/components/ui/input'
import { schema } from './UploadFiles.schema'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import FilesUploadedSection from './FilesUploaded.component'
import { useUploadFileMutation } from '@/redux/services/common.api'

type FormValues = z.infer<typeof schema>

export default function UploadFilesSection() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [uploadComplete, setUploadComplete] = useState(false)
  const [fileIds, setFileIds] = useState<string[]>([])
  const [reportTitle, setReportTitle] = useState('')
  const [uploadFile, { isLoading }] = useUploadFileMutation()

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      reportTitle: '',
      file: undefined,
    },
  })

  const selectedFile = watch('file')

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await uploadFile({ files: data.file }).unwrap()
      setFileIds([...fileIds, ...response.filter((item: any) => item?.id && item?.status === 'ready').map((item: any) => item?.id)])
      setUploadComplete(true)
      setUploadedFiles((prev) => [...prev, ...response])
      reset({ file: undefined, reportTitle: getValues('reportTitle') })
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue('file', file, { shouldValidate: true })
      setUploadComplete(false)
    }
  }

  const resetUpload = () => {
    reset({ file: undefined, reportTitle: getValues('reportTitle') })
    setUploadComplete(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
        <Card>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Report Title (Controller) */}
              <div>
                <label htmlFor="reportTitle" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Report Title
                </label>
                <Controller
                  name="reportTitle"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      disabled={isLoading}
                      id="reportTitle"
                      placeholder="Enter a title for your medical report (e.g., Blood Test - January 2024)"
                      className="w-full h-12 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                      onChange={(e) => {
                        field.onChange(e)
                        setReportTitle(e.target.value)
                      }}
                    />
                  )}
                />
                {errors.reportTitle && <p className="text-red-600 text-sm mt-1">{errors.reportTitle.message}</p>}
              </div>

              {/* File Upload */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <div
                  className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 flex flex-col items-center text-center justify-center gap-6 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isLoading ? (
                    <Image className="w-20 h-20" src="/assets/icons/loading.gif" alt="Health Report" width={100} height={100} unoptimized />
                  ) : (
                    <>
                      <Image className="w-20 h-20" src="/assets/icons/upload-file.gif" alt="Health Report" width={80} height={80} unoptimized />
                      <div className="space-y-1 sm:space-y-2">
                        <h4 className="text-sm sm:text-lg font-medium text-gray-900">{truncateString(selectedFile?.name, 30) || 'Click to select PDF file'}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Choose your medical report in PDF format</p>
                      </div>
                      <input disabled={isLoading} ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
                      {errors.file && <p className="text-red-600 text-sm mt-2">{errors.file.message}</p>}
                    </>
                  )}
                </div>
              </motion.div>

              {selectedFile && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-5 w-5 text-blue-600 mb-4 md:mb-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 truncate max-w-[130px] md:max-w-[350px] lg:max-w-[500px]">{selectedFile?.name}</p>
                      <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Badge variant="secondary" className="mb-6 ">
                      {selectedFile?.type?.split('/')[1]?.toUpperCase()}
                    </Badge>
                  </div>

                  {uploadComplete && (
                    <div className="flex items-center gap-2 text-green-600 mb-3">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Upload complete! File added to collection.</span>
                    </div>
                  )}

                  <div className="flex md:flex-row justify-between gap-6 flex-col-reverse">
                    <Button variant="outline" size="lg" onClick={resetUpload} type="button" className="w-full" disabled={isLoading}>
                      Remove File
                    </Button>
                    <Button size="lg" type="submit" disabled={!reportTitle.trim() || !isValid || !selectedFile || isLoading} className="w-full">
                      {isLoading ? 'Uploading...' : 'Upload Report'}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {uploadedFiles.length > 0 && <FilesUploadedSection setUploadedFiles={setUploadedFiles} reportTitle={reportTitle} uploadingFile={isLoading} uploadedFiles={uploadedFiles} />}
    </div>
  )
}
