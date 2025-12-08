import React from 'react'

export default function FormStepProgress({ steps, currentStep, forProfile }: { steps: any; currentStep: number; forProfile?: boolean }) {
  return (
    <div className="w-full max-w-2xl px-6">
      <div className="mb-8 mt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">Assessment Progress</span>
          <span className="text-sm text-gray-500">
            {currentStep + 1} of {forProfile ? steps.length - 1 : steps.length}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentStep + 1) / (forProfile ? steps.length - 1 : steps.length)) * 100}%` }} />
        </div>

        <div className="flex justify-between">
          {forProfile
            ? steps.slice(0, steps.length - 1).map((stepObj: any, i: number) => (
                <span key={i} className={`text-sm font-medium ${i <= currentStep ? 'text-green-600' : 'text-gray-400'}`}>
                  {stepObj.label}
                </span>
              ))
            : steps.map((stepObj: any, i: number) => (
                <span key={i} className={`text-sm font-medium ${i <= currentStep ? 'text-green-600' : 'text-gray-400'}`}>
                  {stepObj.label}
                </span>
              ))}
        </div>
      </div>
    </div>
  )
}
