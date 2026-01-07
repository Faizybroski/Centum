'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import { slideLeftVariant, slideRightVariant } from '@/utils/animation.util'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, ContactFormSchema } from './ContactForm.schema'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useContactUsMutation } from '@/redux/services/contact-us.api'

export default function ContactForm() {
  const [contactUs, { isLoading }] = useContactUsMutation()
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormSchema) => {
    try {
      await contactUs(data)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  const mapUrl =
    "https://maps.googleapis.com/maps/api/staticmap?center=Kampung%20Bali,Jakarta&zoom=15&size=600x600&maptype=roadmap&markers=color:0x16AF9D|Kampung%20Bali&key=YOUR_API_KEY";


  return (
    <section className="py-12 sm:py-16 bg-white max-w-5xl mx-auto my-12 rounded-lg px-16 shadow-[0_0_15px_rgba(0,0,0,0.15)]">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left: Contact Form */}
          <motion.div variants={slideLeftVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fill The Form</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input id="name" placeholder='Name *' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input id="email" type="email" placeholder='Email *' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input id="phone" type="text" placeholder='Phone' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input id="subject" placeholder='Subject' maxLength={50} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea id="message" placeholder="Message" rows={6} cols={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)]" disabled={isLoading}>
                  Send Message
                </Button>
              </form>
            </Form>
            
            <div className="space-y-8 mt-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Mail className="h-6 w-6 text-[#0B342D]" />
                    </div>
                    <p className="text-base text-gray-600">info@centum.health</p>
                  </div>
                  {/* <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-base text-gray-600">+1 (555) 123-4567</p>
                  </div> */}
                  {/* <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-base text-gray-600">123 Health Street</p>
                  </div> */}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2 text-base text-gray-600">
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 10:00 AM - 4:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div variants={slideRightVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="w-full h-full mx-auto rounded-2xl overflow-hidden border bg-white">
              {/* <img
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317716.6064449053!2d-0.43124327626421655!3d51.5286070141754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1765023621353!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
                alt="Map"
                className="w-full h-full object-cover"
              /> */}

              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d484.4020952270146!2d144.93757835149205!3d-37.814401301941245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d67eab3f541%3A0x5715e1e5c1ff5470!2sLevel%201%2F9%20Star%20Cres%2C%20Docklands%20VIC%203008%2C%20Australia!5e0!3m2!1sen!2s!4v1767817680966!5m2!1sen!2s"  className='h-full w-full'></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
