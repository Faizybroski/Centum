'use client'

import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 text-center">Terms of Services & Privacy Policy</h1>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Introduction</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Centum Health ("we," "our," or "us") values your trust. This Privacy & Security Policy explains in detail how we collect, use, share, and protect your personal and health information when you use the Centum Health
            Tracker platform.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-2">We collect the following types of information:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-base leading-relaxed">
            <li>
              <span className="font-medium">Personal Information:</span> Name, date of birth, gender, email address, phone number, emergency contacts.
            </li>
            <li>
              <span className="font-medium">Health Information:</span> Medical history, family history, lifestyle habits (diet, exercise, sleep, stress, substance use), health goals, lab results, biomarker data, and other
              data relevant to your health.
            </li>
            <li>
              <span className="font-medium">Account Information:</span> Username, password, authentication details, and other security credentials.
            </li>
            <li>
              <span className="font-medium">Usage Information:</span> IP address, browser type, device info, app usage, and analytics data collected through cookies and similar technologies.
            </li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-2">We use your information for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-base leading-relaxed">
            <li>To create, verify, and manage your account.</li>
            <li>To provide personalized health insights, biomarker analysis, and recommendations.</li>
            <li>To enable secure practitioner collaboration and support.</li>
            <li>To improve our services, develop new features, and enhance user experience.</li>
            <li>To communicate updates, reports, and important announcements.</li>
            <li>To comply with applicable legal and regulatory requirements.</li>
          </ul>
        </section>

        {/* How We Share Data */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">How We Share Data</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-2">We may share information with:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-base leading-relaxed">
            <li>Accredited laboratories and healthcare practitioners strictly for the purpose of providing health tracking and diagnostic services.</li>
            <li>Trusted service providers (data hosting, analytics, support), under strict contractual obligations.</li>
            <li>Legal authorities when required by law, regulation, or valid legal process.</li>
            <li>In case of business transfers (such as mergers or acquisitions), subject to continued protection of your data.</li>
          </ul>
          <p className="text-base text-gray-700 mt-3">We do not sell personal information to third parties.</p>
        </section>

        {/* Data Storage & Retention */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Storage & Retention</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            All data is stored securely using industry-standard encryption in Australian data centers or compliant cloud platforms. Personal and health data are retained only for as long as your account is active, or as long
            as necessary to deliver services and comply with legal obligations. Data may be retained beyond account closure to resolve disputes and enforce agreements.
          </p>
        </section>

        {/* Security Measures */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Security Measures</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-2">We implement rigorous technical and organizational safeguards, including:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-base leading-relaxed">
            <li>AES-256 encryption at rest.</li>
            <li>TLS 1.3 encryption in transit.</li>
            <li>Role-based access controls (RBAC) with least-privilege principles.</li>
            <li>Continuous monitoring, logging, and intrusion detection.</li>
            <li>Regular vulnerability scanning, penetration testing, and security audits.</li>
          </ul>
        </section>

        {/* User Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">User Rights</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-2">You have the following rights with respect to your data:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-base leading-relaxed">
            <li>Access: Request a copy of your personal data.</li>
            <li>Correction: Request corrections to inaccurate or incomplete data.</li>
            <li>Deletion: Request deletion of your data, subject to legal and operational exceptions.</li>
            <li>Objection: Object to processing for specific purposes.</li>
            <li>Withdrawal of Consent: Withdraw your consent to data usage at any time.</li>
          </ul>
          <p className="text-base text-gray-700 mt-3">To exercise these rights, please contact us via the details below.</p>
        </section>

        {/* Cookies & Children */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Cookies & Similar Technologies</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            We use cookies and similar tools to personalize content, analyze usage, and improve platform performance. You can manage cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Children’s Privacy</h2>
          <p className="text-base text-gray-700 leading-relaxed">Centum Health Tracker is not directed towards children under 18. We do not knowingly collect or process personal data from children.</p>
        </section>

        {/* Breach & Partners */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Breach Notification</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            In the event of a data breach likely to result in a risk to your rights and freedoms, we will notify affected users promptly and take all required legal and remedial actions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Practitioner & Partner Obligations</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            All practitioners, laboratories, and business partners accessing Centum Health data are required to comply with this Privacy & Security Policy and implement appropriate safeguards.
          </p>
        </section>

        {/* Policy Updates & Legal Compliance */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
          <p className="text-base text-gray-700 leading-relaxed">We may update this Privacy & Security Policy periodically. Material updates will be communicated and the 'Last Updated' date will be revised.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Legal Compliance</h2>
          <p className="text-base text-gray-700 leading-relaxed">We comply with applicable privacy and healthcare regulations including GDPR and HIPAA (where relevant), alongside Australian data protection requirements.</p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-base text-gray-700 leading-relaxed">For questions, concerns, or to exercise your rights, contact us:</p>
          <ul className="list-disc list-inside space-y-1 text-base text-gray-700 mt-3">
            <li>Centum Health Privacy Office</li>
            <li>
              Email:{' '}
              <a href="mailto:info@centumhealth.com" className="text-primary font-medium">
                info@centumhealth.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
