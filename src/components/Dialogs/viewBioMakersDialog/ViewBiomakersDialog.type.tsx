import { UserDashboardDTO } from '@/dto/userDashboard.dto'

export type ViewBioMakersDialogProps = {
  showViewBioMakersOpen: boolean
  setShowViewBioMakersOpen: (show: boolean) => void
  selectedKey: 'good_biomarkers' | 'normal_biomarkers' | 'critical_biomarkers' | 'all' | null
  data: UserDashboardDTO | undefined
}
