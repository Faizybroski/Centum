import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import moment from 'moment'

interface Props {
  form: any
  name?: string
  label?: string
  placeholder?: string
  format?: 'MM/DD/YYYY' | 'MM/YYYY'
  disablePast?: boolean
  disableFuture?: boolean
}

export default function DatePickerInput({ 
  form, 
  name = 'date_of_birth', 
  label = 'Date of Birth', 
  placeholder = 'MM/DD/YYYY',
  format = 'MM/DD/YYYY',
  disablePast = false,
  disableFuture = true
}: Props) {
  const [inputValue, setInputValue] = useState('')
  const [month, setMonth] = useState<Date>(new Date())

  const getDisabledDates = (date: Date) => {
    if (disablePast && moment(date).isBefore(moment(), 'day')) return true
    if (disableFuture && moment(date).isAfter(moment(), 'day')) return true
    return false
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10 pointer-events-none" />
                    <Input
                      placeholder={placeholder}
                      className="text-gray-800 placeholder:text-gray-400 placeholder:text-sm pl-10 h-12 border-gray-200 focus:border-green-500"
                      value={inputValue || (field.value ? moment(field.value, format, true).isValid() ? moment(field.value, format).format(format) : field.value : '')}
                      onChange={(e) => {
                        const val = e.target.value
                        setInputValue(val)
                        const parsed = moment(val, format, true)
                        if (parsed.isValid()) {
                          field.onChange(val)
                          setMonth(moment(parsed).startOf('month').toDate())
                        } else {
                          field.onChange(val)
                        }
                      }}
                    />
                  </div>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {format === 'MM/YYYY' ? (
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Month</label>
                        <select
                          className="w-full p-2 border rounded-md focus:border-green-500 focus:outline-none"
                          value={field.value ? moment(field.value, format, true).isValid() ? moment(field.value, format).format('MM') : '' : ''}
                          onChange={(e) => {
                            const month = e.target.value
                            const year = field.value ? moment(field.value, format, true).isValid() ? moment(field.value, format).format('YYYY') : new Date().getFullYear().toString() : new Date().getFullYear().toString()
                            if (month && year) {
                              const formatted = `${month}/${year}`
                              field.onChange(formatted)
                              setInputValue(formatted)
                            }
                          }}
                        >
                          <option value="">Select Month</option>
                          {Array.from({ length: 12 }, (_, i) => {
                            const monthNum = String(i + 1).padStart(2, '0')
                            const monthName = moment().month(i).format('MMMM')
                            return (
                              <option key={monthNum} value={monthNum}>
                                {monthName}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Year</label>
                        <select
                          className="w-full p-2 border rounded-md focus:border-green-500 focus:outline-none"
                          value={field.value ? moment(field.value, format, true).isValid() ? moment(field.value, format).format('YYYY') : '' : ''}
                          onChange={(e) => {
                            const year = e.target.value
                            const month = field.value ? moment(field.value, format, true).isValid() ? moment(field.value, format).format('MM') : '01' : '01'
                            if (month && year) {
                              const formatted = `${month}/${year}`
                              field.onChange(formatted)
                              setInputValue(formatted)
                            }
                          }}
                        >
                          <option value="">Select Year</option>
                          {Array.from({ length: 21 }, (_, i) => {
                            const year = new Date().getFullYear() + i
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={moment(field.value, format, true).isValid() ? moment(field.value, format).toDate() : undefined}
                    onSelect={(date) => {
                      const formatted = date ? moment(date).format(format) : ''
                      field.onChange(formatted)
                      setInputValue(formatted)
                      setMonth(
                        moment(date ?? new Date())
                          .startOf('month')
                          .toDate(),
                      )
                    }}
                    month={month}
                    onMonthChange={setMonth}
                    disabled={getDisabledDates}
                    defaultMonth={new Date()}
                    startMonth={disablePast ? new Date() : undefined}
                    endMonth={disableFuture ? undefined : new Date(new Date().getFullYear() + 20, 11)}
                  />
                )}
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
