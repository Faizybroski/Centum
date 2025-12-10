import { paths } from '@/navigate/paths'
type FAQ = {
  question: string
  answer: string | React.ReactNode
}
export const faqs: FAQ[] = [
  {
    question: 'Is my health information secure?',
    answer: 'Yes! We take your privacy and security very seriously. We use industry-standard security measures, including encryption, access controls, and regular security audits, to protect your information.',
  },
  {
    question: 'What information does Centum Health collect?',
    answer: 'We collect personal details (name, contact info), health data (medical history, lifestyle habits, biomarker and lab results), account credentials, and usage information such as device and session data.',
  },
  {
    question: 'How is my information used?',
    answer: 'Your information is used to deliver personalized health insights, manage your account, enable practitioner support, improve the Centum Health Tracker, and comply with legal and regulatory requirements.',
  },
  {
    question: 'Who has access to my data?',
    answer: 'Only authorized Centum staff, accredited laboratories, and your chosen healthcare practitioners may access data. Access is controlled through role-based permissions.',
  },
  {
    question: 'Do you share my personal information with third parties?',
    answer: 'We only share data with trusted service providers, laboratories, and practitioners who are under contractual obligations to protect confidentiality. We do not sell your personal data.',
  },
  {
    question: 'Where is my data stored?',
    answer: 'Data is securely stored in Australian data centers or compliant cloud platforms, protected by AES-256 encryption at rest and TLS 1.3 in transit.',
  },
  {
    question: 'How long do you keep my information?',
    answer: 'We retain your data for as long as your Centum Health account is active, or as long as needed to deliver services. We may also retain it to comply with laws, resolve disputes, or enforce agreements.',
  },
  {
    question: 'What security measures does Centum Health use?',
    answer: 'We implement encryption at rest and in transit, role-based access controls, continuous monitoring, penetration testing, and periodic security audits.',
  },
  {
    question: 'What happens if there is a data breach?',
    answer: 'If a breach occurs that risks your rights and freedoms, you will be notified promptly as required by law, and corrective measures will be taken immediately.',
  },
  {
    question: 'What rights do I have over my data?',
    answer: 'You have the right to access, correct, or delete your data, object to certain processing, and withdraw consent at any time. Requests can be made via our privacy contact details below.',
  },
  {
    question: 'Do you use cookies?',
    answer: 'Yes, we use cookies and similar technologies for improving your platform experience and analyzing usage. You can manage cookies in your browser settings.',
  },
  {
    question: 'Is the platform suitable for children?',
    answer: 'No. Centum Health Tracker is not designed for individuals under 18. We do not knowingly collect information from children.',
  },
  {
    question: 'How often is this FAQ reviewed?',
    answer: 'We periodically review and update this FAQ to reflect changes in regulation, security standards, and our practices.',
  },
  {
    question: 'How can I learn more about your privacy practices?',
    answer: (
      <>
        Please review our full{' '}
        <a href={paths.privacy()} className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </>
    ),
  },
  {
    question: 'How can I contact Centum Health about privacy or security?',
    answer: (
      <>
        You may contact our Privacy Office at{' '}
        <a href="mailto:info@centum.health" className="text-primary">
          info@centum.health
        </a>{' '}
        or reach us via our support channels for assistance.
      </>
    ),
  },
]
