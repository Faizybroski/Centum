const colorClasses = {
  green: {
    hoverBg: 'hover:bg-green-50',
    dot: 'bg-green-500',
    text: 'text-green-600',
    from: 'from-green-400',
    to: 'to-green-600',
  },
  red: {
    hoverBg: 'hover:bg-red-50',
    dot: 'bg-red-500',
    text: 'text-red-600',
    from: 'from-red-400',
    to: 'to-red-600',
  },
  orange: {
    hoverBg: 'hover:bg-orange-50',
    dot: 'bg-orange-500',
    text: 'text-orange-600',
    from: 'from-orange-400',
    to: 'to-orange-600',
  },
}

interface BiomarkerRangeProps {
  label: string
  color: string // base color (e.g., green, red, orange)
  value: number
  percentage: number
  category: string
  delay?: number
  onClick: (category: string) => void
}

const BiomarkerRange: React.FC<BiomarkerRangeProps> = ({ label, color, value, percentage, category, delay = 0, onClick }) => {
  const c = colorClasses[color as keyof typeof colorClasses] || colorClasses.green

  return (
    <div className={`cursor-pointer ${c.hoverBg} p-3 rounded-lg transition-all duration-200`} onClick={() => onClick(category)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${c.dot} rounded-full`}></div>
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className={`text-sm font-bold ${c.text}`}>{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${c.from} ${c.to} h-2 rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: `${percentage}%`,
            transitionDelay: `${delay}ms`,
          }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{percentage}% of total</p>
    </div>
  )
}

export default BiomarkerRange
