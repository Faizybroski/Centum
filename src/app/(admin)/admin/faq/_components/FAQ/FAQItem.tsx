'use client'

import React from 'react'
import { CircleCheck } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { FAQ } from '@/types/FAQs.type'

export default function FAQItem({ faq, onEdit, onDelete }: { faq: FAQ; onEdit: (faq: FAQ) => void; onDelete: (faq: FAQ) => void }) {
  return (
    <Accordion type="single" collapsible className="border rounded-lg shadow-sm px-4">
      <AccordionItem value={faq._id}>
        <AccordionTrigger className="flex items-center justify-between border-b-0 py-4 group hover:no-underline focus:no-underline hover:text-primary hover:cursor-pointer">
          <div className="flex items-center gap-3 group-data-[state=open]:text-primary">
            <CircleCheck className="flex justify-between text-primary h-5 w-5" />
            <span>{faq.question}</span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-3">
          {faq.answer}
          <div className="pt-3 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(faq)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" className="text-white" onClick={() => onDelete(faq)}>
              Delete
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
