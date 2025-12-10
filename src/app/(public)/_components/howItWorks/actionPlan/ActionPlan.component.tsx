'use client'

// import { Card } from '@/components/ui/card'
import { CheckCircle2, CircleCheck } from 'lucide-react'
// import { motion } from 'framer-motion'
// import { containerVariants, slideLeftVariant, slideRightVariant } from '@/utils/animation.util'
import React from 'react'
// import { Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
// import {Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react/components/Accordion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const items = [
  {
    title: 'Clinical Summary',
    text: 'Overall positive findings. Keep up the good work! Recommend following up with your primary care doctor.',
  },
  {
    title: 'Foods to Enjoy',
    text: 'Mackerel, Sardines, Herring, Walnuts, Cashews, Acai, Acorn Squash',
  },
  {
    title: 'Foods to Limit',
    text: 'Processed foods, refined sugars, trans fats, excessive alcohol',
  },
  {
    title: 'Activities to Enjoy',
    text: 'Swimming, walking, yoga, strength training, cycling',
  },
  {
    title: 'Activities to Limit',
    text: 'Excessive high-intensity exercise, prolonged sitting',
  },
  {
    title: 'Self Care',
    text: 'Prioritize 7-9 hours sleep, stress management, meditation, regular health check-ups',
  },
  {
    title: 'Supplement Recommendations',
    text: 'Omega-3 Fatty Acids, Red Yeast Rice, Vitamin D3, Magnesium',
  },
]

export default function ActionPlan() {
  const [open, setOpen] = React.useState(0)

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value)
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your Action Plan</h2>
        </div>
        <div className="space-y-4">
          {items.map((item, index) => {
            const id = index + 1 // unique ID per accordion

            return (
              // <Accordion
              //   id={id.toString()}
              //   key={id}
              //   className="rounded-md border px-6"
              //   open={open === id}
              //   icon={<Icon id={id} open={open} />}
              // >
              //   <div className="flex items-center justify-center">
              //     <CircleCheck className="mr-4" />

              //     <AccordionHeader
              //       className="border-b-0"
              //       onClick={() => handleOpen(id)}
              //     >
              //       {item.title}
              //     </AccordionHeader>
              //   </div>

              //   <AccordionBody>
              //     {item.text}
              //   </AccordionBody>
              // </Accordion>
              <Accordion key={id} type="single" collapsible value={open === id ? id.toString() : ''} onValueChange={(value) => handleOpen(Number(value))} className="bg-white rounded-lg shadow-sm px-6 border">
                <AccordionItem value={id.toString()}>
                  <AccordionTrigger className="flex items-center justify-between border-b-0 py-4 group hover:no-underline focus:no-underline hover:text-primary hover:cursor-pointer">
                    <div className="flex items-center gap-3 group-data-[state=open]:text-primary">
                      <CircleCheck className="text-primary h-5 w-5" />
                      <span>{item.title}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-4">{item.text}</AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>

        {/* <div className="space-y-4 sm:space-y-6">
          {items.map((item, index) => (
            <motion.div key={index} variants={index % 2 === 0 ? slideLeftVariant : slideRightVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Card className={`border border-${item.color}-200 p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300`}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <CheckCircle2 className={`h-5 w-5 text-${item.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.text}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  )
}
