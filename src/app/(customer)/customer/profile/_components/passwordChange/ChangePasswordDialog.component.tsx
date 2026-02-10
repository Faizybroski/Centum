'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Heart, Lock, Mail, Phone, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useChangePasswordMutation } from '@/redux/services/auth.api'
import { passSchema, TSchema } from './PasswordChangeForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'

export function ChangePasswordDialog({ open, onClose }: { open: boolean; onClose: (open: boolean) => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showNewAgainPassword, setShowNewAgainPassword] = useState(false)
  const changePassForm = useForm<TSchema>({
    resolver: zodResolver(passSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  })

  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const handleSubmit = async (data: TSchema) => {
    if (data.new_password !== data.confirm_new_password) {
      toast.error('New passwords do not match')
      return
    }

    try {
      await changePassword(data).unwrap()
      toast.success('Password updated successfully')
      changePassForm.reset({
        current_password: '',
        new_password: '',
        confirm_new_password: '',
      })
      onClose(false)
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to change password')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <Form {...changePassForm}>
          <form onSubmit={changePassForm.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={changePassForm.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your current password" className="pl-10 pr-12 h-12" {...field} />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {/* <Input placeholder="" {...field} type="password" /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Answer */}
            <FormField
              control={changePassForm.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input type={showNewPassword ? 'text' : 'password'} placeholder="Enter your new password" className="pl-10 pr-12 h-12" {...field} />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {/* <Input placeholder="Enter your new password" {...field} type="password" /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={changePassForm.control}
              name="confirm_new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password Again</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input type={showNewAgainPassword ? 'text' : 'password'} placeholder="Enter your new password again" className="pl-10 pr-12 h-12" {...field} />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowNewAgainPassword(!showNewAgainPassword)}>
                        {showNewAgainPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {/* <Input placeholder="Enter your new password again" {...field} type="password" /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onClose(false)}>
                Cancel
              </Button>
              <Button type="submit" className='bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)]'>{isLoading ? 'Updating...' : 'Change Password'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
