'use client'

import React, { useMemo, useState } from 'react'
import FAQSkeleton from '@/components/skeletons/faq/FAQSkeleton.component'
import FAQEmptyState from '@/components/noFAQFound/NoFAQFound.component'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { initialFAQs } from '@/dto/FAQ.dto'
import { useGetAllFaqsQuery } from '@/redux/services/faq.api'
import { FAQ } from '@/types/FAQs.type'

export default function FAQPage() {
  const [accordionOpen, setAccordionOpen] = useState<string | undefined>()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

  const { data, isLoading } = useGetAllFaqsQuery(selectedCategory ? { category: selectedCategory } : undefined)

  const faqs: FAQ[] = data?.data ?? initialFAQs

  const categories = useMemo(() => {
    const set = new Set<string>()
    faqs.forEach((f) => set.add(f.category))
    return Array.from(set)
  }, [faqs])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
          {/* Security & Privacy  */}
          FAQ</h1>

        <div className="flex justify-center mb-10">
          <Select value={selectedCategory} onValueChange={(val) => setSelectedCategory(val === 'all' ? undefined : val)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Collapsible FAQs */}
        <div className="space-y-4">
          {isLoading && <FAQSkeleton />}

          {!isLoading && faqs.length === 0 && <FAQEmptyState />}
          {faqs.map((faq, index) => {
            const id = index + 1
            return (
              // <Accordion key={id} type="single" collapsible value={open === id ? id.toString() : ''} onValueChange={(value) => handleOpen(Number(value))} className="bg-white rounded-lg shadow-sm border">
              <Accordion key={id} type="single" collapsible value={accordionOpen} onValueChange={setAccordionOpen} className="bg-white rounded-lg shadow-sm px-6 border">
                <AccordionItem value={id.toString()}>
                  <AccordionTrigger className="flex items-center justify-between group border-b-0 w-full px-4 py-3 text-left font-semibold text-gray-900 text-md sm:text-lg hover:no-underline focus:no-underline hover:text-primary hover:cursor-pointer">
                    <div className="flex items-center gap-3 group-data-[state=open]:text-primary">
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-4 pb-4 text-gray-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>
      </div>
    </div>
  )
}
