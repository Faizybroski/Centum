export const paths = {
  auth: '/auth',
  admin: '/admin',
  customer: '/customer',

  // Project paths public
  home: () => '/',
  howItWorks: () => '/how-it-works',
  tests: () => '/tests',
  blog: () => '/blogs',
  about: () => '/about',
  contact: () => '/contact-us',
  pricing: () => '/pricing',
  // Project paths authenticate
  login: () => `${paths.auth}/login`,
  signup: () => `${paths.auth}/signup`,
  registrationSuccess: (email?: string) => (email ? `${paths.auth}/registration-success?email=${encodeURIComponent(email)}` : `${paths.auth}/registration-success`),
  forgotPassword: () => `${paths.auth}/forgot-password`,

  // Project paths customers
  customerProfile: () => `${paths.customer}/profile`,
  customerDashboard: () => `${paths.customer}/dashboard`,
  customerHistory: () => `${paths.customer}/report-history`,
  customerUpload: () => `${paths.customer}/upload-new-report`,
  customerHealthAssessment: () => `${paths.customer}/health-assessment`,
  customerReportSummary: (id: string) => `${paths.customer}/report/summary/${id}`,
  customerReportDetail: (id: string) => `${paths.customer}/report/detail/${id}`,
  customerBlog: () => `${paths.customer}/blogs`,
  //Extra resources
  privacy: () => `/privacy-policy`,
  // securityFaq: () => `/security-faq`,
  securityFaq: () => `/faq`,
  userGuide: () => `/user-guide`,
  // Project paths admin
  adminDashboard: () => `${paths.admin}/dashboard`,
  adminProfile: () => `${paths.admin}/profile`,
  adminUsers: () => `${paths.admin}/users`,
  adminUserDetail: (id: string) => `${paths.admin}/user-detail/${id}`,
  adminFailedReports: () => `${paths.admin}/failed-reports`,
  adminFAQs: () => `${paths.admin}/faq`,
}
