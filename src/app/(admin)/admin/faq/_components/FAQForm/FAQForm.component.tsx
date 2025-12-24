'use client'

import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { FAQ } from '@/types/FAQs.type'
import { useForm } from 'react-hook-form'
import { faqSchema, TSchema } from './FAQForm.schema'
import { FAQ_CATEGORIES, isFAQCategory } from '@/constants/faqCategories'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  open: boolean
  initialData?: FAQ | null
  onSubmit: (data: TSchema) => void | Promise<void>
  onClose: () => void
}

export default function AddFAQForm({ open, initialData, onSubmit, onClose }: Props) {
  const faqForm = useForm<TSchema>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      category: undefined,
      question: '',
      answer: '',
    },
  })

  useEffect(() => {
    if (initialData) {
      faqForm.reset({
        category: isFAQCategory(initialData.category) ? initialData.category : undefined,
        question: initialData.question,
        answer: initialData.answer,
      })
    } else {
      faqForm.reset()
    }
  }, [initialData, faqForm])

  const handleSubmit = async (data: TSchema) => {
    await onSubmit(data)
    faqForm.reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
        </DialogHeader>
        <Form {...faqForm}>
          <form onSubmit={faqForm.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Category */}
            <FormField
              control={faqForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {FAQ_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Title */}
            <FormField
              control={faqForm.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter FAQ question" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Answer */}
            <FormField
              control={faqForm.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write the answer here..." rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{initialData ? 'Update FAQ' : 'Add FAQ'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
