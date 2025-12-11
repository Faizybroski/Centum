interface BiomarkerRangeProps {
  label: string
  value: number
  percentage: number
  category: string
  delay?: number
  onClick: (category: string) => void
}

const BiomarkerRange: React.FC<BiomarkerRangeProps> = ({ label, value, percentage, category, delay = 0, onClick }) => {
  return (
    <div className={`cursor-pointer py-3 rounded-lg transition-all duration-200 group`} onClick={() => onClick(category)}>
      <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700 group-hover:text-primary">{label}</span>
        <span className={`text-sm font-bold text-gray-900 group-hover:text-primary`}>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`bg-primary h-2 rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: `${percentage}%`,
            transitionDelay: `${delay}ms`,
          }}
        ></div>
      </div>
      {/* <p className="text-xs text-gray-500 mt-1">{percentage}% of total</p> */}
    </div>
  )
}

export default BiomarkerRange
