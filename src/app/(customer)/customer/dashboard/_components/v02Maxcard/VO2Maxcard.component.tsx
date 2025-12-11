'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useUpdateVo2MaxMutation } from '@/redux/services/dashboard.api'
import { useReduxSelector } from '@/hooks/redux.hook'
import { getVo2Category, Sex } from './vo2.utils'
import { Heart } from 'lucide-react'

export default function VO2Maxcard({ vo2Max = '0', chronologicalAge }: { vo2Max: string | number; chronologicalAge?: number }) {
  const { gender } = useReduxSelector((s) => s.user.userProfile)
  const sex = gender?.toLowerCase() as Sex | undefined
  const age = chronologicalAge ?? 0

  const [calculatedVo2Max, setCalculatedVo2Max] = useState<number>(Number(vo2Max))
  const [hrMax, setHrMax] = useState('')
  const [hrRest, setHrRest] = useState('')
  const [showVo2MaxModal, setShowVo2MaxModal] = useState(false)

  const [updateVo2Max] = useUpdateVo2MaxMutation()

  const calculateVo2Max = () => {
    const maxHR = parseFloat(hrMax)
    const restHR = parseFloat(hrRest)

    if (isNaN(maxHR) || isNaN(restHR) || maxHR <= restHR) {
      toast.error('Please enter valid heart rate values. Max HR should be greater than Rest HR.')
      return
    }

    if (maxHR < 10 || maxHR > 220) {
      toast.error('Maximum Heart Rate (HRmax) must be between 10 and 220 bpm.')
      return
    }

    if (restHR < 10 || restHR > 220) {
      toast.error('Resting Heart Rate (HRrest) should be between 10 and 220 bpm.')
      return
    }

    // Standard VO2 Max calculation using heart rate reserve
    const vo2MaxValue = 15 * (maxHR / restHR)
    updateVo2Max({ vo2_max: vo2MaxValue.toFixed(1) })
    setCalculatedVo2Max(vo2MaxValue)
    setShowVo2MaxModal(false)

    toast.success(`Your new VO2 Max is ${vo2MaxValue.toFixed(1)} ml/kg/min`)
  }

  const displayedVo2 = Number(vo2Max) > 0 ? Number(vo2Max) : calculatedVo2Max
  // If gender is male/female, use getVo2Category; if "other", show neutral
  const vo2Category =
    sex === 'male' || sex === 'female'
      ? age >= 20
        ? getVo2Category(sex, age, displayedVo2)
        : { label: 'Your cardiovascular fitness', bgClass: 'bg-blue-500' }
      : { label: 'Your cardiovascular fitness', bgClass: 'bg-blue-500' }

  return (
    <div>
      <Card className={`text-white border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)]`}>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <h3 className="text-sm mb-2 flex gap-3 items-center">
              <Heart className="w-6 h-6" />
              VO2 MAX
            </h3>{' '}
            <Button className="h-7 px-4 py-0 text-xs bg-white/10 hover:bg-white/20 font-normal text-white border-white/30 hover:border-white/50" onClick={() => setShowVo2MaxModal(true)}>
              Manage
            </Button>
          </div>
          <div className="text-4xl font-bold mb-5 min-h-2.5">
            <span>{displayedVo2 > 0 ? displayedVo2.toFixed(1) : '0'}</span>
            <span className="text-xs font-normal ml-3">ml/kg/min</span>
          </div>{' '}
          {/* <p className={`text-sm font-semibold mb-4 text-white`}>{vo2Category.label}</p> */}
          <p className="mt-3 pt-3 text-xs leading-tight border-t border-t-[2px] border-white/10 text-white/50">Elite cardiovascular fitness level</p>
        </CardContent>
      </Card>

      {/* VO2 Max Management Modal */}
      <Dialog open={showVo2MaxModal} onOpenChange={setShowVo2MaxModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>VO2 Max Estimator</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hrMax">Maximum Heart Rate (HRmax)</Label>
                <Input id="hrMax" type="number" placeholder="Enter maximum heart rate" value={hrMax} onChange={(e) => setHrMax(e.target.value)} className="w-full" />
                <p className="text-xs text-gray-500">Your maximum heart rate during intense exercise (usually 220 - age)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hrRest">Resting Heart Rate (HRrest)</Label>
                <Input id="hrRest" type="number" placeholder="Enter resting heart rate" value={hrRest} onChange={(e) => setHrRest(e.target.value)} className="w-full" />
                <p className="text-xs text-gray-500">Your heart rate when completely at rest (typically 60-100 bpm)</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowVo2MaxModal(false)}>
                Cancel
              </Button>
              <Button onClick={calculateVo2Max} disabled={!hrMax || !hrRest}>
                Calculate VO2 Max
              </Button>
            </div>
          </div>
          <div className="text-xs text-gray-700">VO2 Max is an estimate figure based on user input data</div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
