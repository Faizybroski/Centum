type EventParams = {
  [key: string]: string | number | boolean | undefined
}

export const sendEvent = (eventName: string, params?: EventParams) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', eventName, params)
  } else {
    console.log(`[Analytics] ${eventName}`, params)
  }
}

export const ANALYTICS_EVENTS = {
  // Public / Marketing
  MEMBERSHIP_CTA_CLICK: 'membership_cta_click',
  WAITLIST_FORM_START: 'waitlist_form_start',
  WAITLIST_FORM_COMPLETE: 'waitlist_form_complete',
  CONTACT_SUBMIT: 'contact_submit',
  NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',

  // Auth / User
  USER_REGISTER: 'user_register',
  USER_DELETE: 'user_delete',

  // Core Features
  HEALTH_ASSESSMENT_COMPLETE: 'health_assessment_complete',
  DOCUMENT_UPLOADED: 'document_uploaded',
  REPORT_VIEWED: 'report_viewed',
  REPORT_REGENERATED: 'report_regenerated',

  // Admin
  ADMIN_FAQ_PUBLISH: 'admin_faq_publish',
  ADMIN_WAITLIST_EXPORT: 'admin_waitlist_export',
  ADMIN_OCR_ERROR: 'admin_ocr_error',
}
