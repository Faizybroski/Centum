'use client'

import React, { useMemo, useState } from 'react'
import FAQSkeleton from '@/components/skeletons/faq/FAQSkeleton.component'
import FAQEmptyState from '@/components/noFAQFound/NoFAQFound.component'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { initialFAQs } from '@/dto/FAQ.dto'
import { FAQ_CATEGORIES, FAQCategory, isFAQCategory, categoryPriority } from '@/constants/faqCategories'
import { useGetAllFaqsQuery } from '@/redux/services/faq.api'
import { FAQ } from '@/types/FAQs.type'

export default function FAQPage() {
  const [accordionOpen, setAccordionOpen] = useState<string | undefined>()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

  const { data, isLoading, isFetching } = useGetAllFaqsQuery()

  const faqs: FAQ[] = data ?? initialFAQs

  const groupedFaqs = useMemo(() => {
    const source = selectedCategory ? faqs.filter((f) => f.category === selectedCategory) : faqs

    return source.reduce<Record<string, FAQ[]>>((acc, faq) => {
      if (!acc[faq.category]) acc[faq.category] = []

      acc[faq.category].push(faq)

      acc[faq.category].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      return acc
    }, {})
  }, [faqs, selectedCategory])

  const categories = useMemo<FAQCategory[]>(() => {
    // if (!data) return []

    const set = new Set<FAQCategory>()
    faqs.forEach((f) => {
      if (isFAQCategory(f.category)) {
        set.add(f.category)
      }
    })
    return Array.from(set).sort((a, b) => categoryPriority.get(a)! - categoryPriority.get(b)!)
    // return Array.from(set)
  }, [faqs])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
          {/* Security & Privacy  */}
          FAQ
        </h1>

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
          {(isLoading || isFetching) && <FAQSkeleton />}

          {!isLoading && !isFetching && faqs.length === 0 && <FAQEmptyState />}

          {!isLoading && (
            <div className="space-y-4">
              {Object.entries(groupedFaqs)
                .sort(([a], [b]) => {
                  const orderA = isFAQCategory(a) ? categoryPriority.get(a)! : Number.MAX_SAFE_INTEGER
                  const orderB = isFAQCategory(b) ? categoryPriority.get(b)! : Number.MAX_SAFE_INTEGER
                  return orderA - orderB
                })
                .map(([category, faqs]) => (
                  <div key={category} className="px-6 space-y-3">
                    {faqs.map((faq, index) => {
                      const id = faq._id || index.toString()

                      return (
                        <Accordion key={id} type="single" collapsible value={accordionOpen} onValueChange={setAccordionOpen} className="bg-white rounded-lg shadow-sm px-6 border">
                          <AccordionItem value={id}>
                            <AccordionTrigger className="flex items-center justify-between border-b-0 py-4 group hover:no-underline focus:no-underline hover:text-primary hover:cursor-pointer">
                              <div className="flex items-center gap-3 group-data-[state=open]:text-primary">
                                {/* <CircleCheck className="flex justify-between text-primary h-5 w-5" /> */}
                                <div className="flex flex-col">
                                  <span>{faq.question}</span>

                                  <span className="text-muted-foreground">{category}</span>
                                </div>
                              </div>
                            </AccordionTrigger>

                            <AccordionContent className="pb-4">{faq.answer}</AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )
                    })}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
