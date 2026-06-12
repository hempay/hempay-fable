/* Legal copy for Hempay. Tailored to the product (multi-currency virtual
   cards, transfers, FX, bill payments, QR, chat bots, tiered KYC).
   Plain-English where possible. Have counsel review before launch. */

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }

export interface LegalSection {
  id: string
  heading: string
  body: LegalBlock[]
}

export interface LegalDoc {
  kind: 'terms' | 'privacy'
  eyebrow: string
  title: string
  accent: string // the italic-serif part of the title
  updated: string
  intro: string
  sections: LegalSection[]
}

const COMPANY = 'HEMPAY TECH INNOVATIONS LIMITED (RC - 9198815)'
const UPDATED = 'June 12, 2026'
const SUPPORT_EMAIL = 'support@hempay.app'
const PRIVACY_EMAIL = 'privacy@hempay.app'

/* ─────────────────────────── TERMS ─────────────────────────── */
export const TERMS: LegalDoc = {
  kind: 'terms',
  eyebrow: 'Legal',
  title: 'Terms of',
  accent: 'Service',
  updated: UPDATED,
  intro: `These Terms of Service ("Terms") govern your access to and use of the Hempay app, website, WhatsApp and Telegram bots, and related services (together, the "Services"), operated by ${COMPANY} ("Hempay", "we", "us"). By creating an account or using the Services, you agree to these Terms.`,
  sections: [
    {
      id: 'acceptance',
      heading: '1. Acceptance of Terms',
      body: [
        {
          type: 'p',
          text: 'By accessing or using the Services through any channel — our mobile app, website, WhatsApp bot, or Telegram bot — you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, do not use the Services.',
        },
        {
          type: 'p',
          text: 'We may update these Terms from time to time. Material changes will be communicated through the app or by email, and your continued use after the effective date constitutes acceptance.',
        },
      ],
    },
    {
      id: 'eligibility',
      heading: '2. Eligibility',
      body: [
        { type: 'p', text: 'To use Hempay, you must:' },
        {
          type: 'ul',
          items: [
            'Be at least 18 years old, or the age of legal majority in your jurisdiction.',
            'Have the legal capacity to enter into a binding agreement.',
            'Not be barred from using financial services under any applicable law or sanctions list.',
            'Provide accurate, current, and complete information during registration and verification.',
          ],
        },
      ],
    },
    {
      id: 'accounts',
      heading: '3. Accounts & Verification',
      body: [
        {
          type: 'p',
          text: 'You are responsible for maintaining the confidentiality of your account credentials, PIN, biometric data, and one-time passwords, and for all activity under your account. Notify us immediately of any unauthorised use.',
        },
        {
          type: 'p',
          text: 'Hempay operates a tiered verification (KYC) system. Higher tiers unlock higher limits and additional features and require additional identity documentation. We may verify new devices via OTP and may request re-verification at any time to comply with regulatory obligations.',
        },
      ],
    },
    {
      id: 'services',
      heading: '4. The Services',
      body: [
        { type: 'p', text: 'Subject to eligibility and verification, Hempay enables you to:' },
        {
          type: 'ul',
          items: [
            'Create up to 11 multi-currency virtual cards (USD, EUR, GBP, NGN, and more).',
            'Exchange between supported currencies at the rates displayed at the time of the transaction.',
            'Send and receive local and international transfers, including bank transfers to Nigerian banks (NUBAN).',
            'Make bill payments such as airtime, data, electricity, and TV subscriptions.',
            'Send and receive payments via QR code, and chat with other users.',
            'Manage everything via the mobile app, WhatsApp bot, or Telegram bot.',
          ],
        },
        {
          type: 'p',
          text: 'Certain services are provided in partnership with licensed financial institutions and card issuers. Availability of specific currencies, cards, and features may vary by region and verification tier.',
        },
      ],
    },
    {
      id: 'fees',
      heading: '5. Fees & Exchange Rates',
      body: [
        {
          type: 'p',
          text: 'Applicable fees for card creation, transfers, currency exchange, and bill payments are displayed before you confirm a transaction. Exchange rates are dynamic and the rate shown at confirmation applies to that transaction. By confirming, you accept the quoted amount and any disclosed fees.',
        },
      ],
    },
    {
      id: 'acceptable-use',
      heading: '6. Acceptable Use',
      body: [
        { type: 'p', text: 'You agree not to use the Services to:' },
        {
          type: 'ul',
          items: [
            'Engage in money laundering, terrorist financing, fraud, or any unlawful activity.',
            'Conduct transactions involving prohibited goods, sanctioned parties, or restricted jurisdictions.',
            'Circumvent verification limits, impersonate others, or provide false information.',
            'Interfere with, reverse-engineer, or attempt to gain unauthorised access to the Services.',
          ],
        },
        {
          type: 'p',
          text: 'We may suspend, freeze, or terminate accounts and report activity to regulators or law enforcement where we reasonably suspect a breach of these Terms or applicable law.',
        },
      ],
    },
    {
      id: 'transactions',
      heading: '7. Transactions & Settlement',
      body: [
        {
          type: 'p',
          text: 'Transactions are generally processed in real time, but settlement times may vary depending on the network, partner institutions, and recipient banks. You are responsible for ensuring all transaction details (amounts, recipients, account numbers) are correct before confirming. Completed transactions to a correctly specified recipient may be irreversible.',
        },
      ],
    },
    {
      id: 'cards',
      heading: '8. Virtual Cards',
      body: [
        {
          type: 'p',
          text: 'Virtual cards are issued for use at merchants that accept the relevant card network. You must keep card details secure. We may decline, limit, or freeze card transactions to manage risk, comply with law, or honour merchant and network rules. Cards remain the property of the issuer and may be deactivated in accordance with these Terms.',
        },
      ],
    },
    {
      id: 'ip',
      heading: '9. Intellectual Property',
      body: [
        {
          type: 'p',
          text: 'The Services, including all software, designs, logos, and content, are owned by Hempay or its licensors and are protected by intellectual-property laws. We grant you a limited, non-exclusive, non-transferable, revocable licence to use the Services for their intended purpose. You may not copy, modify, distribute, or create derivative works without our written consent.',
        },
      ],
    },
    {
      id: 'disclaimers',
      heading: '10. Disclaimers & Limitation of Liability',
      body: [
        {
          type: 'p',
          text: 'The Services are provided "as is" and "as available". To the maximum extent permitted by law, Hempay disclaims all warranties, express or implied. We are not liable for indirect, incidental, special, or consequential damages, or for losses arising from circumstances beyond our reasonable control, including network outages or third-party failures.',
        },
      ],
    },
    {
      id: 'termination',
      heading: '11. Suspension & Termination',
      body: [
        {
          type: 'p',
          text: 'You may close your account at any time, subject to settling outstanding obligations. We may suspend or terminate your access if you breach these Terms, if required by law, or to protect the Services and other users. On termination, available balances will be returned in accordance with applicable law, less any amounts owed.',
        },
      ],
    },
    {
      id: 'governing-law',
      heading: '12. Governing Law',
      body: [
        {
          type: 'p',
          text: 'These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict-of-law principles. Disputes shall be subject to the exclusive jurisdiction of the competent courts of Nigeria, subject to any mandatory consumer-protection rights you may have.',
        },
      ],
    },
    {
      id: 'contact',
      heading: '13. Contact Us',
      body: [
        {
          type: 'p',
          text: `Questions about these Terms? Reach our support team in the app, via the WhatsApp or Telegram bots, or by email at ${SUPPORT_EMAIL}. ${COMPANY}.`,
        },
      ],
    },
  ],
}

/* ────────────────────────── PRIVACY ────────────────────────── */
export const PRIVACY: LegalDoc = {
  kind: 'privacy',
  eyebrow: 'Legal',
  title: 'Privacy',
  accent: 'Policy',
  updated: UPDATED,
  intro: `This Privacy Policy explains how ${COMPANY} ("Hempay", "we", "us") collects, uses, shares, and protects your personal information when you use our app, website, WhatsApp and Telegram bots, and related services. We are committed to protecting your privacy and handling your data responsibly.`,
  sections: [
    {
      id: 'collect',
      heading: '1. Information We Collect',
      body: [
        { type: 'p', text: 'We collect the following categories of information:' },
        {
          type: 'ul',
          items: [
            'Identity & verification data: name, date of birth, government ID, photographs, and other KYC documentation.',
            'Contact data: email address, phone number, and messaging handles used with our bots.',
            'Financial data: virtual card details, transaction history, balances, beneficiaries, and exchange activity.',
            'Device & security data: device identifiers, biometric authentication signals, IP address, and OTP verification events.',
            'Usage data: how you interact with the app, website, and bots, including chat messages with our support and bots.',
          ],
        },
      ],
    },
    {
      id: 'use',
      heading: '2. How We Use Your Information',
      body: [
        { type: 'p', text: 'We use your information to:' },
        {
          type: 'ul',
          items: [
            'Provide, operate, and maintain the Services, including creating cards and processing transactions.',
            'Verify your identity and devices, and run our tiered KYC and fraud-prevention checks.',
            'Comply with anti-money-laundering, sanctions, tax, and other legal obligations.',
            'Communicate with you about transactions, security, and service updates.',
            'Improve and personalise the Services, and operate features like referrals and chat.',
          ],
        },
      ],
    },
    {
      id: 'legal-basis',
      heading: '3. Legal Bases for Processing',
      body: [
        {
          type: 'p',
          text: 'We process personal data where it is necessary to perform our contract with you, to comply with legal and regulatory obligations, to pursue our legitimate interests (such as security and fraud prevention) in a balanced way, or on the basis of your consent where required.',
        },
      ],
    },
    {
      id: 'sharing',
      heading: '4. How We Share Information',
      body: [
        { type: 'p', text: 'We may share your information with:' },
        {
          type: 'ul',
          items: [
            'Licensed financial partners, card issuers, and payment processors that help deliver the Services.',
            'Identity-verification, fraud-detection, and analytics providers acting on our behalf.',
            'Regulators, law-enforcement, and other authorities where required by law or to protect our users.',
            'Professional advisers and, in the event of a corporate transaction, a successor entity.',
          ],
        },
        { type: 'p', text: 'We do not sell your personal information.' },
      ],
    },
    {
      id: 'security',
      heading: '5. Data Security',
      body: [
        {
          type: 'p',
          text: 'We apply bank-grade encryption in transit and at rest, support biometric and two-factor authentication, and restrict access to personal data on a need-to-know basis. While no system is completely secure, we maintain technical and organisational measures designed to protect your information against unauthorised access, loss, or misuse.',
        },
      ],
    },
    {
      id: 'retention',
      heading: '6. Data Retention',
      body: [
        {
          type: 'p',
          text: 'We retain personal data for as long as your account is active and thereafter for the period required to meet legal, regulatory, accounting, and reporting obligations — particularly record-keeping rules applicable to financial institutions. When data is no longer required, we securely delete or anonymise it.',
        },
      ],
    },
    {
      id: 'rights',
      heading: '7. Your Rights',
      body: [
        { type: 'p', text: 'Subject to applicable law, you may have the right to:' },
        {
          type: 'ul',
          items: [
            'Access the personal data we hold about you and request a copy.',
            'Request correction of inaccurate or incomplete data.',
            'Request deletion of your data, where there is no overriding legal obligation to retain it.',
            'Object to or restrict certain processing, and withdraw consent where processing is based on consent.',
            'Lodge a complaint with the relevant data-protection authority.',
          ],
        },
        {
          type: 'p',
          text: `To exercise these rights, contact us at ${PRIVACY_EMAIL}. We may need to verify your identity before responding.`,
        },
      ],
    },
    {
      id: 'international',
      heading: '8. International Transfers',
      body: [
        {
          type: 'p',
          text: 'Because Hempay supports borderless payments, your information may be processed in countries other than your own. Where we transfer data internationally, we use appropriate safeguards to ensure it remains protected in line with this Policy and applicable law.',
        },
      ],
    },
    {
      id: 'cookies',
      heading: '9. Cookies & Tracking',
      body: [
        {
          type: 'p',
          text: 'Our website and app use cookies and similar technologies to keep you signed in, remember preferences, secure sessions, and understand usage. You can control cookies through your browser or device settings; disabling some may affect functionality.',
        },
      ],
    },
    {
      id: 'children',
      heading: '10. Children’s Privacy',
      body: [
        {
          type: 'p',
          text: 'The Services are not directed to individuals under 18, and we do not knowingly collect their personal data. If you believe a minor has provided us information, contact us and we will take appropriate steps to delete it.',
        },
      ],
    },
    {
      id: 'changes',
      heading: '11. Changes to This Policy',
      body: [
        {
          type: 'p',
          text: 'We may update this Privacy Policy periodically. We will post the updated version with a new effective date and, for material changes, notify you through the app or by email.',
        },
      ],
    },
    {
      id: 'contact',
      heading: '12. Contact Us',
      body: [
        {
          type: 'p',
          text: `For privacy questions or to exercise your rights, email ${PRIVACY_EMAIL} or reach us in the app and via our WhatsApp and Telegram bots. ${COMPANY}.`,
        },
      ],
    },
  ],
}
