'use client'

import * as React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { ChevronDown } from 'lucide-react'
import { faqs } from './FAQ_DATA/faq.data'

export default function FAQPage() {
  const [open, setOpen] = React.useState(0)

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">Security & Privacy FAQ</h1>

        {/* Collapsible FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const id = index + 1
            return (
              <>
                {/* <Collapsible key={index} className="bg-white rounded-lg shadow-md border">
                  <CollapsibleTrigger className="border-b group w-full flex justify-between items-center px-4 py-3 text-left text-gray-900 font-medium text-base sm:text-lg lg:text-xl focus:outline-none">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 text-base text-gray-700 leading-relaxed">{faq.answer}</CollapsibleContent>
                </Collapsible> */}
                <Accordion key={id} type="single" collapsible value={open === id ? id.toString() : ''} onValueChange={(value) => handleOpen(Number(value))} className="bg-white rounded-lg shadow-sm border">
                  <AccordionItem value={id.toString()}>
                    <AccordionTrigger className="flex items-center justify-between group border-b-0 w-full px-4 py-3 text-left font-semibold text-gray-900 text-md sm:text-lg hover:no-underline focus:no-underline hover:text-primary hover:cursor-pointer">
                      <div className="flex items-center gap-3 group-data-[state=open]:text-primary">
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pb-4 text-gray-700">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
