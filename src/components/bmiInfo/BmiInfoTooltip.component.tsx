'use client'

import React, { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function BmiInfoTooltip() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          type="button"
          onMouseEnter={!isTouchDevice ? () => setOpen(true) : undefined}
          onMouseLeave={!isTouchDevice ? () => setOpen(false) : undefined}
          onClick={isTouchDevice ? () => setOpen((prev) => !prev) : undefined}
        >
          <Info className="w-5 h-5 text-muted-foreground cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="p-0 max-w-sm -translate-x-3 sm:translate-x-4 text-sm bg-background text-gray-600 rounded-md shadow-xl overflow-hidden"
        onMouseEnter={!isTouchDevice ? () => setOpen(true) : undefined}
        onMouseLeave={!isTouchDevice ? () => setOpen(false) : undefined}
      >
        <div className="font-semibold text-white bg-black p-3">How to Calculate BMI (Metric Units)</div>
        <div className="flex flex-col gap-6 p-6 space-y-6">
          <div>
            <span className="font-semibold">Formula:</span>
            <br />
            BMI = <span className="font-mono font-semibold">weight (kg)</span> ÷ <span className="font-mono font-semibold">height² (m²)</span>
          </div>
          <div>
            <span className="font-semibold">Example:</span>
            <ul className="list-disc ml-5">
              <li className="text-gray-500 mt-3">Height = 1.75 m → height² = 1.75 × 1.75 = 3.06</li>
              <li className="text-gray-500 mt-3">Weight = 75 kg</li>
            </ul>
          </div>
          <div className="font-semibold">
            BMI = 75 ÷ 3.06 = <span className="text-black font-bold">24.5</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
