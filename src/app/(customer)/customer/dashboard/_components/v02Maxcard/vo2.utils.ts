export type Sex = 'male' | 'female'

interface Vo2Band {
  band: [number, number] | [number]
  thresholds: {
    optimal: number
    average: [number, number]
    poor: number
  }
}

export interface Vo2Labels {
  optimal: string
  average: string
  poor: string
}

export interface Vo2BgColors {
  optimal: string
  average: string
  poor: string
}

// Default labels
export const defaultVo2Labels: Vo2Labels = {
  optimal: 'Optimal VO2 max for your age',
  average: 'Average VO2 max for your age',
  poor: 'Poor VO2 max for your age',
}

// Default card background colors
export const defaultVo2BgColors: Vo2BgColors = {
  optimal: 'bg-gradient-to-br from-blue-400 to-blue-500',
  average: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
  poor: 'bg-gradient-to-br from-red-500 to-red-600',
}

// Thresholds per sex
export const vo2Thresholds: Record<Sex, Vo2Band[]> = {
  male: [
    { band: [20, 29], thresholds: { optimal: 55, average: [38, 55], poor: 38 } },
    { band: [30, 39], thresholds: { optimal: 52, average: [35, 52], poor: 35 } },
    { band: [40, 49], thresholds: { optimal: 48, average: [32, 48], poor: 32 } },
    { band: [50, 59], thresholds: { optimal: 44, average: [29, 44], poor: 29 } },
    { band: [60, 69], thresholds: { optimal: 40, average: [26, 40], poor: 26 } },
    { band: [70], thresholds: { optimal: 36, average: [23, 36], poor: 23 } },
  ],
  female: [
    { band: [20, 29], thresholds: { optimal: 45, average: [31, 45], poor: 31 } },
    { band: [30, 39], thresholds: { optimal: 42, average: [28, 42], poor: 28 } },
    { band: [40, 49], thresholds: { optimal: 38, average: [25, 38], poor: 25 } },
    { band: [50, 59], thresholds: { optimal: 34, average: [22, 34], poor: 22 } },
    { band: [60, 69], thresholds: { optimal: 30, average: [19, 30], poor: 19 } },
    { band: [70], thresholds: { optimal: 26, average: [16, 26], poor: 16 } },
  ],
}

export const getVo2Category = (sex: Sex | undefined, age: number | undefined, vo2: number) => {
  if (!sex || age === undefined || !isFinite(vo2) || vo2 <= 0) {
    return { label: '—', colorClass: 'text-gray-100', bgClass: 'bg-blue-500' }
  }

  const bandData = vo2Thresholds[sex].find((t) => (t.band.length === 2 ? age >= t.band[0] && age <= t.band[1] : age >= t.band[0]))

  if (!bandData) return { label: '—', colorClass: 'text-gray-100', bgClass: 'bg-blue-500' }

  if (vo2 >= bandData.thresholds.optimal) return { label: defaultVo2Labels.optimal, colorClass: 'text-white', bgClass: defaultVo2BgColors.optimal }

  if (vo2 >= bandData.thresholds.average[0] && vo2 < bandData.thresholds.average[1]) return { label: defaultVo2Labels.average, colorClass: 'text-white', bgClass: defaultVo2BgColors.average }

  return { label: defaultVo2Labels.poor, colorClass: 'text-white', bgClass: defaultVo2BgColors.poor }
}
