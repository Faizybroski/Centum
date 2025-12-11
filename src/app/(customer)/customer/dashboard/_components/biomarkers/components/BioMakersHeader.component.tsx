import { TestTube, Activity } from 'lucide-react'
import React from 'react'

// export default function BioMakersHeader({ totalMarkers, percentage }: { totalMarkers: number; percentage: number }) {
export default function BioMakersHeader() {
  return (
  //   <div className="flex items-center justify-between mb-6">
  //     <div className="flex items-center gap-3">
  //       <div className="p-2 bg-blue-100 rounded-lg">
  //         <TestTube className="h-6 w-6 text-blue-600" />
  //       </div>
  //       <div>
  //         <h3 className="text-lg font-semibold text-gray-900">Biomarkers</h3>
  //         <p className="text-xs text-gray-500">{totalMarkers} total markers</p>
  //       </div>
  //     </div>
  //     <div className="text-right">
  //       <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
  //       <p className="text-xs text-gray-500">in optimal range</p>
  //     </div>
  //   </div>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gray-200 rounded-full">
          <Activity className="h-4 w-4 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Biomarkers</h3>
          <p className="text-xs text-gray-500">Overall health makers remain stable this month.</p>
        </div>
      </div>
    </div>
  )
}
