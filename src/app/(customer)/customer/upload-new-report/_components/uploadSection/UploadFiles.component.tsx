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
import { CheckCircle2, FileText, Upload, ShieldCheck, CalendarIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import FilesUploadedSection from './FilesUploaded.component'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useUploadFileMutation } from '@/redux/services/common.api'
import moment from 'moment'

type FormValues = z.infer<typeof schema>

export default function UploadFilesSection() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [uploadComplete, setUploadComplete] = useState(false)
  const [fileIds, setFileIds] = useState<string[]>([])
  const [reportTitle, setReportTitle] = useState('')
  const [reportDate, setReportDate] = useState(new Date())
  const [reportCategory, setReportCategory] = useState('')
  const [reportNotes, setReportNotes] = useState('')
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
      reportDate: new Date(),
      reportCategory: '',
      reportNotes: '',
      file: undefined,
    },
  })

  const categories = ['Blood Test', 'Radiology', 'Prescription', 'Pathology', 'Diagnosis Report', 'Discharge Summary', 'General Medical Report']

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
    reset({ file: undefined, reportTitle: getValues('reportTitle'), reportDate: getValues('reportDate'), reportCategory: getValues('reportCategory'), reportNotes: getValues('reportNotes') })
    setUploadComplete(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="w-full mx-auto mb-12 sm:mb-16">
      {/* <div className="w-full mx-auto mb-12 sm:mb-16"> */}
      <div className="w-full mb-12 sm:mb-16">
        <Card>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* File Upload */}
              <div className="flex gap-3 justify-between flex-wrap">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-start gap-2">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <ShieldCheck />
                      </div>
                      <h3 className="text-lg sm:text-lg font-bold text-gray-900">Select File</h3>
                    </div>
                    <p className="text-xs">Choose a health report from your device</p>
                  </div>
                  <div
                    className="min-h-[200px] w-full mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 flex flex-col items-center text-center justify-center gap-6 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {isLoading ? (
                      <Image className="w-20 h-20" src="/assets/icons/loading.gif" alt="Health Report" width={100} height={100} unoptimized />
                    ) : (
                      <>
                        {/* <Image className="w-20 h-20" src="/assets/icons/upload-file.gif" alt="Health Report" width={80} height={80} unoptimized /> */}
                        <div className="bg-primary/10 rounded-sm p-5">
                          <Upload className="h-10 w-10" />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <h4 className="text-sm sm:text-lg font-medium text-gray-900">{truncateString(selectedFile?.name, 30) || 'Drop your file here'}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">Or click to browse your file</p>
                        </div>
                        <label htmlFor="fileUpload" className="sr-only hidden">
                          Upload File
                        </label>
                        <input disabled={isLoading} id="fileUpload" ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
                        {errors.file && <p className="text-red-600 text-sm mt-2">{errors.file.message}</p>}
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Supported formats: PDF, JPG, PNG . Maximum file size: 10MB.</p>

                  {selectedFile && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="h-5 w-5 text-blue-600 mb-4 md:mb-3" />
                        <div className="flex-1">
                          {/* <p className="font-medium text-gray-900 truncate max-w-[130px] md:max-w-[350px] lg:max-w-[500px]"> */}
                          <p className="font-medium text-gray-900 truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[500px]">{selectedFile?.name}</p>
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
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-start gap-2">
                      <h3 className="text-lg sm:text-lg font-bold text-gray-900">Report Details</h3>
                    </div>
                    <p className="text-xs">Fill in information about your report</p>
                  </div>
                  <div className="mb-4 w-full rounded-lg p-4 sm:p-6 border border-gray-300 bg-gray-50">
                    <label htmlFor="reportTitle" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Report Name*
                    </label>
                    <Controller
                      name="reportTitle"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          disabled={isLoading}
                          id="reportTitle"
                          placeholder="e.g., Annual Blood Test 2025"
                          className="bg-white w-full h-12 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                          onChange={(e) => {
                            field.onChange(e)
                            setReportTitle(e.target.value)
                          }}
                        />
                      )}
                    />
                    {errors.reportTitle && <p className="text-red-600 text-sm mt-1">{errors.reportTitle.message}</p>}
                  </div>

                  <div className="mb-4 w-full rounded-lg p-4 sm:p-6 border border-gray-300 bg-gray-50">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Report Date*</label>

                    <Controller
                      name="reportDate"
                      control={control}
                      render={({ field }) => {
                        const formattedValue = field.value ? moment(field.value).format('MM/DD/YYYY') : ''

                        return (
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className="relative cursor-pointer">
                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />

                                <Input readOnly disabled={isLoading} value={formattedValue} placeholder="Select date" className="bg-white w-full h-12 pl-10 pr-4 border-gray-300 rounded-lg" />
                              </div>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value} // ← now correct
                                onSelect={(date) => field.onChange(date)}
                              />
                            </PopoverContent>
                          </Popover>
                        )
                      }}
                    />

                    {errors.reportDate && <p className="text-red-600 text-xs mt-1">{errors.reportDate.message}</p>}
                  </div>

                  <div className="mb-4 w-full rounded-lg p-4 sm:p-6 border border-gray-300 bg-gray-50">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Category*</label>
                    <Controller
                      control={control}
                      name="reportCategory"
                      render={({ field }) => (
                        <Select
                          disabled={isLoading} // ← THIS IS WHERE IT BELONGS
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-12 bg-white border-gray-300 w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {errors.reportCategory && <p className="text-red-600 text-xs mt-1">{errors.reportCategory?.message}</p>}
                  </div>

                  <div className="mb-4 w-full rounded-lg p-4 sm:p-6 border border-gray-300 bg-gray-50">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Notes / Description</label>

                    <Controller
                      control={control}
                      name="reportNotes"
                      render={({ field }) => <Textarea {...field} disabled={isLoading} placeholder="Add any additional notes about this report..." className="bg-white w-full h-28 border-gray-300 rounded-lg resize-none" />}
                    />
                  </div>
                </motion.div>
              </div>
            </form>
            {uploadedFiles.length > 0 && (
              <FilesUploadedSection
                setUploadedFiles={setUploadedFiles}
                reportTitle={reportTitle}
                reportDate={reportDate}
                reportCategory={reportCategory}
                reportNotes={reportNotes}
                uploadingFile={isLoading}
                uploadedFiles={uploadedFiles}
              />
            )}

            <div className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-md bg-gray-100 px-4 py-3 mt-8">
              <ShieldCheck className='w-5 h-5'/>
              <span className="text-sm text-gray-600">Your report will be securely analyzed using medical-grade AI.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
