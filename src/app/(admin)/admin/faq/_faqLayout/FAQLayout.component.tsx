'use client'

import React, { useMemo, useState, useEffect } from 'react'
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
import { FAQ_CATEGORIES, FAQCategory, isFAQCategory, categoryPriority } from '@/constants/faqCategories'
import { useGetFaqsQuery, useCreateFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } from '@/redux/services/admin/faq.api'
import { FAQ } from '@/types/FAQs.type'

export default function Layout() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [openCategories, setOpenCategories] = useState<string[]>([])
  // const [faq, setFaqs] = useState<FAQ[]>(initialFAQs)
  const [accordionOpen, setAccordionOpen] = useState<string | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [faqToDelete, setFaqToDelete] = useState<FAQ | null>(null)

  // const queryArg = useMemo(() => (selectedCategory ? { category: selectedCategory } : undefined), [selectedCategory])

  // const { data, isLoading } = useGetFaqsQuery(selectedCategory ? { category: selectedCategory } : undefined)
  // const { data, isLoading, isFetching } = useGetFaqsQuery(queryArg)
  const { data, isLoading, isFetching } = useGetFaqsQuery()

  const [createFaq] = useCreateFaqMutation()
  const [updateFaq] = useUpdateFaqMutation()
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation()
  const faqs: FAQ[] = data ?? initialFAQs

  useEffect(() => {
    if (selectedCategory && isFAQCategory(selectedCategory)) {
      // Open only the selected category
      setOpenCategories([selectedCategory])
    }

    if (!selectedCategory) {
      // Default behavior when "All" is selected
      setOpenCategories(['General'])
    }
  }, [selectedCategory])

  // const filteredFaqs = useMemo(() => {
  //   if (!selectedCategory) return faqs
  //   return faqs.filter((faq) => faq.category === selectedCategory)
  // }, [faqs, selectedCategory])

  const groupedFaqs = useMemo(() => {
    const source = selectedCategory ? faqs.filter((f) => f.category === selectedCategory) : faqs

    return source.reduce<Record<string, FAQ[]>>((acc, faq) => {
      if (!acc[faq.category]) acc[faq.category] = []

      acc[faq.category].push(faq)

      acc[faq.category].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      return acc
    }, {})
  }, [faqs, selectedCategory])

  // const { data: allFaqsData } = useGetFaqsQuery(undefined)

  // Extract unique categories dynamically
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

  const handleSubmit = async (data: TSchema) => {
    if (editingFaq) {
      await updateFaq({ id: editingFaq._id, ...data })
      setEditingFaq(null)
    } else {
      // await createFaq({ ...data, status: 'saved' })
      await createFaq({ ...data })
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

      {(isLoading || isFetching) && <FAQSkeleton />}

      {/* {!isLoading && !isFetching && filteredFaqs.length === 0 && <FAQEmptyState />} */}
      {!isLoading && !isFetching && Object.keys(groupedFaqs).length === 0 && <FAQEmptyState />}

      {/* {!isLoading && filteredFaqs.length > 0 && ( */}
      {!isLoading && (
        <Accordion type="multiple" value={openCategories} onValueChange={setOpenCategories} className="space-y-4">
          {Object.entries(groupedFaqs)
            .sort(([a], [b]) => {
              const orderA = isFAQCategory(a) ? categoryPriority.get(a)! : Number.MAX_SAFE_INTEGER
              const orderB = isFAQCategory(b) ? categoryPriority.get(b)! : Number.MAX_SAFE_INTEGER
              return orderA - orderB
            })
            .map(([category, faqs]) => (
              <AccordionItem key={category} value={category} className="bg-white border rounded-lg shadow-sm">
                {/* CATEGORY HEADER */}
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-700 hover:no-underline group hover:no-underline focus:no-underline hover:text-primary hover:cursor-pointer">{category}</AccordionTrigger>

                <AccordionContent className="px-6 pb-4 space-y-3">
                  {faqs.map((faq, index) => {
                    const id = faq._id || index.toString()

                    return (
                      <Accordion key={id} type="single" collapsible value={accordionOpen} onValueChange={setAccordionOpen} className="bg-white rounded-lg shadow-sm px-6 border">
                        <AccordionItem value={id}>
                          <AccordionTrigger className="flex items-center justify-between border-b-0 py-4 group hover:no-underline focus:no-underline hover:text-primary hover:cursor-pointer">
                            <div className="flex items-center gap-3 group-data-[state=open]:text-primary">
                              <CircleCheck className="flex justify-between text-primary h-5 w-5" />
                              <div className="flex flex-col">
                                <span>{faq.question}</span>

                                <span className="text-muted-foreground">{faq.status}</span>
                              </div>
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
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
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
