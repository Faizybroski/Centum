import { HealthReportDetail } from './HealthReport.dto'

export type UserDashboardDTO = HealthReportDetail & {
  chronological_age: string | number
  biological_age: string | number
  vo2_max: string | number
}
