import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FAQ } from '@/types/FAQs.type'
import { useForm } from 'react-hook-form'
import { faqSchema, TSchema } from './FAQForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  open: boolean
  onAdd: (faq: FAQ) => void
  onClose: () => void
}

export default function AddFAQForm({ open, onAdd, onClose }: Props) {
  const faqForm = useForm<TSchema>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
  })

  const onSubmit = async (data: TSchema) => {
    onAdd(data)
    faqForm.reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add FAQ</DialogTitle>
        </DialogHeader>
        <Form {...faqForm}>
          <form onSubmit={faqForm.handleSubmit(onSubmit)} className="space-y-4">
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
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
