'use client'

import React, { useState } from 'react'
import AddFAQForm from '../_components/FAQForm/FAQForm.component'
import { CirclePlus, HelpCircle, CircleCheck } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import initialFaqs from '@/dto/FAQ.dto'
import { FAQ } from '@/types/FAQs.type'

export default function Layout() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs)
  const [accordionOpen, setAccordionOpen] = useState<string | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)

  function addFAQ(faq: FAQ) {
    setFaqs((prev) => [...prev, faq])
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-medium text-gray-700">FAQs</h2>
        </div>
        <Button onClick={() => setDialogOpen(true)} size="sm" className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)]">
          <CirclePlus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const id = index + 1

          return (
            <Accordion key={id} type="single" collapsible value={accordionOpen} onValueChange={setAccordionOpen} className="bg-white rounded-lg shadow-sm px-6 border">
              <AccordionItem value={id.toString()}>
                <AccordionTrigger className="flex items-center justify-between py-4 group hover:no-underline focus:no-underline hover:text-primary hover:cursor-pointer">
                  <div className="flex items-center gap-3 group-data-[state=open]:text-primary">
                    <CircleCheck className="text-primary h-5 w-5" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })}
      </div>

      <AddFAQForm open={dialogOpen} onAdd={addFAQ} onClose={() => setDialogOpen(false)} />
    </div>
  )
}
