'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

interface Props {
  biologicalAge: number
  chronologicalAge: number
}

function formatNumber(num: number) {
  return Number.isInteger(num) ? num : num.toFixed(1)
}

export default function BiologicalAgecard({ biologicalAge, chronologicalAge }: Props) {
  const difference = chronologicalAge - biologicalAge
  const isYounger = difference > 0
  const isOlder = difference < 0
  const number = Math.abs(difference)

  const displayText = isYounger ? `${formatNumber(number)} years younger` : isOlder ? `${formatNumber(number)} years older` : 'the same as your chronological age'

  const textColor = isYounger ? 'text-yellow-300' : isOlder ? 'bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent' : 'text-white'

  return (
    <Card className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <h3 className="text-sm mb-2 flex gap-3 items-center">
          <Sparkles className="w-6 h-6" />
          Biological Age
        </h3>
        <div className="text-5xl font-bold my-2">{formatNumber(biologicalAge)}</div>
        <span className="text-green-100 text-sm">Your biological age is </span>
        <span className={`font-semibold`}>{displayText}</span>
        {difference !== 0 && <span className="text-green-100 text-sm"> than your chronological age</span>}
        {/* <hr className="my-3 border-gray-100" /> */}
        <p className="mt-3 pt-3 text-xs leading-tight border-t border-t-[2px] border-white/10 text-white/50">This indicates exceptional cellular health and longevity potential.</p>
      </CardContent>
    </Card>
  )
}
