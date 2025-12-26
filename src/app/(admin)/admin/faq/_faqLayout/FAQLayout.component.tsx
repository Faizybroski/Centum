'use client'

import React, { useMemo, useState } from 'react'
import AddFAQForm from '../_components/FAQForm/FAQForm.component'
import FAQSkeleton from '@/components/skeletons/faq/FAQSkeleton.component'
import FAQEmptyState from '@/components/noFAQFound/NoFAQFound.component'
import { CirclePlus, HelpCircle, CircleCheck } from 'lucide-react'
import { toast } from 'sonner'
import ConfirmDeleteDialog from '@/components/common/ConfirmDeleteDialog.component'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { initialFAQs } from '@/dto/FAQ.dto'
import { TSchema } from '../_components/FAQForm/FAQForm.schema'
import { useGetFaqsQuery, useCreateFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } from '@/redux/services/admin/faq.api'
import { FAQ } from '@/types/FAQs.type'

export default function Layout() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  // const [faq, setFaqs] = useState<FAQ[]>(initialFAQs)
  const [accordionOpen, setAccordionOpen] = useState<string | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [faqToDelete, setFaqToDelete] = useState<FAQ | null>(null)

  const { data, isLoading } = useGetFaqsQuery(selectedCategory ? { category: selectedCategory } : undefined)

  const [createFaq] = useCreateFaqMutation()
  const [updateFaq] = useUpdateFaqMutation()
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation()
  const faqs: FAQ[] = data?.data ?? initialFAQs

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>()
    faqs.forEach((f) => set.add(f.category))
    return Array.from(set)
  }, [faqs])

  const handleSubmit = async (data: TSchema) => {
    if (editingFaq) {
      await updateFaq({ id: editingFaq._id, ...data })
      setEditingFaq(null)
    } else {
      await createFaq({ ...data, status: 'saved' })
    }
    setDialogOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (!faqToDelete) return

    try {
      await deleteFaq(faqToDelete._id).unwrap()
      toast.success('FAQ deleted successfully')
      setFaqToDelete(null)
    } catch (error) {
      toast.error('Failed to delete FAQ')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex lg:justify-between flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-medium text-gray-700">FAQs</h2>
        </div>

        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={(val) => setSelectedCategory(val === 'all' ? undefined : val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => {
              setEditingFaq(null)
              setDialogOpen(true)
            }}
            size="sm"
            className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)]"
          >
            <CirclePlus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </div>
      </div>

      {/* <div className="space-y-4">
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
      </div> */}
      {isLoading && <FAQSkeleton />}

      {!isLoading && faqs.length === 0 && <FAQEmptyState />}

      {!isLoading && faqs.length > 0 && (
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const id = faq._id || index.toString()

            return (
              <Accordion key={id} type="single" collapsible value={accordionOpen} onValueChange={setAccordionOpen} className="bg-white rounded-lg shadow-sm px-6 border">
                <AccordionItem value={id}>
                  <AccordionTrigger className="flex items-center justify-between border-b-0 py-4 group hover:no-underline focus:no-underline hover:text-primary hover:cursor-pointer">
                    <div className="flex items-center gap-3 group-data-[state=open]:text-primary">
                      <CircleCheck className="text-primary h-5 w-5" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-4">
                    {faq.answer}
                    <div className="pt-3 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingFaq(faq)
                          setDialogOpen(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setFaqToDelete(faq)}>
                        Delete
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>
      )}

      <AddFAQForm
        open={dialogOpen}
        initialData={editingFaq}
        onSubmit={handleSubmit}
        onClose={() => {
          setEditingFaq(null)
          setDialogOpen(false)
        }}
      />

      <ConfirmDeleteDialog open={!!faqToDelete} title="Delete FAQ?" description="This FAQ will be permanently removed." loading={isDeleting} onClose={() => setFaqToDelete(null)} onConfirm={handleConfirmDelete} />
    </div>
  )
}
