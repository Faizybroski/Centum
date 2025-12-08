import z, { ZodString } from 'zod'
import moment from 'moment'
import { charLimitMax_50, charLimitMin_1, MAX_FILE_SIZE, messages } from './constantMessage.utils'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

// password complexity validator
export const passwordComplexity = (messagePrefix = 'Password') => {
  return z
    .string()
    .trim()
    .min(charLimitMin_1)
    .max(charLimitMax_50)
    .refine((val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\S]{8,}$/.test(val), {
      message: `${messagePrefix} must be at least 8 characters and include uppercase, lowercase, number, and special character with no spaces`,
    })
}

// realistic date validator
export const realisticDateValidator = ({ invalidMessage = messages?.invalidDateFormat, requiredMessage = messages?.required }: { invalidMessage?: string; requiredMessage?: string }) => {
  return z
    .string({
      required_error: requiredMessage,
      invalid_type_error: invalidMessage,
    })
    .refine(
      (val) => {
        if (!val) return false // for required
        const parsed = moment(val, 'MM/DD/YYYY', true)
        return parsed.isValid()
      },
      {
        message: invalidMessage,
      },
    )
    .refine(
      (val) => {
        const parsed = moment(val, 'MM/DD/YYYY', true)
        return parsed.isSameOrAfter(moment('01/01/1950', 'MM/DD/YYYY')) && parsed.isSameOrBefore(moment())
      },
      {
        message: invalidMessage,
      },
    )
}

// australian phone validator
export const australianPhoneValidator = (invalidMessage = messages?.invalidPhoneNumber) =>
  z
    .string()
    .min(charLimitMin_1)
    .refine(
      (value) => {
        const phone = parsePhoneNumberFromString(value, 'AU')
        return phone?.isValid() ?? false
      },
      {
        message: invalidMessage,
      },
    )

// pdf file validator
export const pdfFileValidator = () => {
  return z
    .custom<File>((file) => file instanceof File, {
      message: 'Invalid file',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'Only PDF files are allowed',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'File must be under 5MB',
    })
}

// no spaces validator
export const noSpaces = () => {
  return (schema: ZodString) =>
    schema.refine((val) => !/\s/.test(val), {
      message: messages.invalidType,
    })
}

// Medicare Card Number validator (10 digits only)
export const medicareCardNumberValidator = (invalidMessage = 'Invalid Medicare Card Number') =>
  z
    .string()
    .min(1, 'Medicare Card Number is required')
    .refine(
      (value) => {
        // Medicare card number is exactly 10 digits, first digit is 2-6
        const cleanValue = value.replace(/\s/g, '')
        return /^[0-9]\d{9}$/.test(cleanValue) && cleanValue.length === 10
      },
      {
        message: 'Medicare card number must be exactly 10 digits',
      },
    )

// Medicare Individual Reference Number (IRN) validator - separate field
export const medicareIRNValidator = (invalidMessage = 'Invalid Medicare Individual Reference Number') =>
  z
    .string()
    .min(1, 'Medicare IRN is required')
    .refine(
      (value) => {
        // IRN is 1 digit, cannot be 0
        return /^[1-9]$/.test(value)
      },
      {
        message: 'IRN must be 1 digit number and cannot be 0',
      },
    )

// Medicare Expiry Date validator (MM/YYYY format)
export const medicareExpiryValidator = ({ invalidMessage = 'Invalid Medicare expiry date', requiredMessage = 'Medicare expiry date is required' }: { invalidMessage?: string; requiredMessage?: string }) => {
  return z
    .string({
      required_error: requiredMessage,
      invalid_type_error: invalidMessage,
    })
    .refine(
      (val) => {
        if (!val) return false // for required
        const parsed = moment(val, 'MM/YYYY', true)
        return parsed.isValid() && /^(0[1-9]|1[0-2])\/\d{4}$/.test(val)
      },
      {
        message: 'Date must be in MM/YYYY format with valid month (01-12)',
      },
    )
    .refine(
      (val) => {
        const parsed = moment(val, 'MM/YYYY', true)
        const currentDate = moment()

        // Medicare expiry date must be current month/year or future
        return parsed.isSameOrAfter(currentDate, 'month')
      },
      {
        message: 'Medicare card has expired',
      },
    )
}
