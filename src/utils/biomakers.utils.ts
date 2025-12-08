import { BiomarkerData } from '@/components/reportSummary/clinicalSummary/ClinicalSummary.type'

export function getTotalBiomarkerCount(...biomarkerGroups: (BiomarkerData | undefined)[]): number {
  return biomarkerGroups.reduce((total, group) => {
    return total + getBiomarkerCount(group)
  }, 0)
}

export function getBiomarkerCount(data: BiomarkerData | undefined): number {
  return data && typeof data === 'object' ? Object.keys(data).length : 0
}

export function convertBiomarkers(obj: BiomarkerData) {
  return Object.entries(obj).map(([key, value]) => ({
    ...value,
  }))
}
export const getBioMakersCategoryColor = (status: string) => {
  switch (status) {
    case 'Optimal':
      return 'bg-green-500 text-white px-2 py-1 rounded-lg'
    case 'Good':
      return 'bg-green-500 text-white px-2 py-1 rounded-lg'
    case 'Average':
      return 'bg-orange-500 text-white px-2 py-1 rounded-lg'
    case 'Critical':
      return 'bg-red-500 text-white px-2 py-1 rounded-lg'
    case 'Needs Attention':
      return 'bg-red-500 text-white px-2 py-1 rounded-lg'
    default:
      return 'bg-gray-400 text-white px-2 py-1 rounded-lg'
  }
}

export const getBioMakersTextColor = (category: string) => {
  if (category === 'Good' || category === 'Optimal') {
    return 'text-green-700'
  } else if (category === 'Average') {
    return 'text-orange-700'
  } else if (category === 'Critical' || category === 'Needs Attention') {
    return 'text-red-700'
  } else if (category === 'Invalid') {
    return 'text-gray-600'
  }
  return 'text-gray-700'
}
