export const FAQ_CATEGORIES = [
  'General',
  'Billing',
  'Account',
  'Membership',
  'Technical',
] as const

export type FAQCategory = (typeof FAQ_CATEGORIES)[number]

export const categoryPriority = new Map(
  FAQ_CATEGORIES.map((cat, index) => [cat, index])
)

export const isFAQCategory = (value: string): value is FAQCategory => {
  return FAQ_CATEGORIES.includes(value as FAQCategory)
}