import React from 'react'

interface SummaryAddOnProps {
  title: string
  icon: React.ReactNode
  items: string[]
  borderColor: string // Tailwind border color class, e.g. "border-green-200"
  bgColor: string // Tailwind background color class, e.g. "bg-green-50"
  textColor: string // Tailwind text color class, e.g. "text-green-800"
}

export const SummaryAddOn: React.FC<SummaryAddOnProps> = ({ title, icon, items, borderColor, bgColor, textColor }) => {
  if (!items || items.length === 0) return null

  return (
    <div className={`p-4 border ${borderColor} ${bgColor} rounded-lg`}>
      <h4 className={`flex items-center gap-2 font-semibold mb-3 ${textColor}`}>
        {icon}
        {title}
      </h4>
      <div className={`space-y-2 text-sm ${textColor}`}>
        {items.map((item, index) => (
          <div key={index} className="font-medium">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
