import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useSubscribeToNewsletterMutation } from '@/redux/services/contact-us.api';
import { useReduxSelector } from '@/hooks';

const subscribeSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

type SubscribeSchema = z.infer<typeof subscribeSchema>;

export default function SubscribeNewsletter() {
  const [subscribeToNewsletter, { isLoading }] = useSubscribeToNewsletterMutation();
  const user = useReduxSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);

  const form = useForm<SubscribeSchema>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: SubscribeSchema) => {
    try {
      await subscribeToNewsletter({ email: data.email }).unwrap();
      form.reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          className={`w-full text-black text-sm sm:text-base ${
            user.subscribeToNewsletter
              ? 'bg-white hover:bg-white/90 pointer-events-none'
              : 'bg-white hover:bg-white/90'
          }`}
        >
          {user.subscribeToNewsletter ? 'Subscribed' : 'Subscribe'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 bg-white rounded-md shadow-md text-gray-900">
        <h5 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h5>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 mt-3" 
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
