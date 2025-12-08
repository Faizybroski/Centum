import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, TSchema } from './ProfileForm.schema'
import { Heart, Save, CreditCard, HashIcon, Calendar as CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { useUpdateProfileMutation } from '@/redux/services/auth.api'
import { UserDTO } from '@/dto'
import { useReduxDispatch } from '@/hooks'
import { updateUser } from '@/redux/slices/user.slice'
import DatePickerInput from '@/components/dateInputPicker/DateInputPicker.component'

export default function ProfileForm({ userProfile }: { userProfile: UserDTO }) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const dispatch = useReduxDispatch()

  const profileForm = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: userProfile?.full_name || '',
      email: userProfile?.email || '',
      phone_number: userProfile?.phone_number || '',
      date_of_birth: userProfile?.date_of_birth ? moment(userProfile?.date_of_birth).format('MM/DD/YYYY') : undefined,
      gender: userProfile?.gender || '',
      individual_reference_number: userProfile?.individual_reference_number || '',
      madicare_card_number: userProfile?.madicare_card_number || '',
      madicare_expiry_date: userProfile?.madicare_expiry_date || '',
    },
  })

  const onSubmit = async (data: TSchema) => {
    const { email, ...rest } = data
    await updateProfile({ ...rest })
    dispatch(updateUser({ ...userProfile, ...rest }))
  }

  return (
    <>
      {/* Personal Information Form */}
      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              control={profileForm.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Of Birth */}
            <DatePickerInput form={profileForm} />

            {/* <FormField
              control={profileForm.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <button type="button" className={cn('w-full pl-3 pr-2 py-2 text-left border rounded-md shadow-sm flex justify-between items-center', !field.value && 'text-muted-foreground')}>
                          {field.value ? moment(field.value).format('MM-DD-YYYY') : <span>Select date</span>}
                          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                        </button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" captionLayout="dropdown" selected={field.value ? moment(field.value).toDate() : undefined} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={profileForm.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="border-gray-200 w-full h-20 py-6 pl-10">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Medicare Information Section */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Medicare Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={profileForm.control}
                name="individual_reference_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Individual Reference Number (IRN)</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <HashIcon className="absolute left-3 text-gray-400 h-4 w-4 z-10 pointer-events-none" />
                        <Input
                          {...field}
                          placeholder="Enter IRN (one digit)"
                          maxLength={1}
                          className="pl-10 h-12 w-full"
                          onChange={(e) => {
                            // Only allow digits 1-9, no 0
                            const value = e.target.value.replace(/[^1-9]/g, '')
                            field.onChange(value)
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="madicare_card_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicare Card Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10 pointer-events-none" />
                        <Input
                          {...field}
                          placeholder="Enter 10-digit card number"
                          maxLength={10}
                          className="pl-10 h-12"
                          onChange={(e) => {
                            // Only allow digits
                            const value = e.target.value.replace(/\D/g, '')
                            field.onChange(value)
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DatePickerInput form={profileForm} name="madicare_expiry_date" label="Medicare Expiry Date" format="MM/YYYY" placeholder="MM/YYYY" disablePast={true} disableFuture={false} />
            </div>
          </div>

          <div className="flex justify-center sm:justify-end">
            <Button type="submit" className="flex items-center gap-2 w-full sm:w-auto" disabled={isLoading}>
              <Save className="h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
