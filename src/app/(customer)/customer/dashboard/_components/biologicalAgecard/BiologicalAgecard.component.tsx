'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

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
    <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 text-center">
        <h3 className="text-3xl font-bold mb-2">Biological Age</h3>
        <div className="text-5xl font-bold mb-2 h-10">{formatNumber(biologicalAge)}</div>
        <p className="text-green-100 text-sm">Your biological age is</p>
        <p className={`text-md font-bold ${textColor}`}>{displayText}</p>
        {difference !== 0 && <p className="text-green-100 text-sm">than your chronological age</p>}
      </CardContent>
    </Card>
  )
}
