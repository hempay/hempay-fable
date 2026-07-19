/* Content for the Help Center (/help) and Support (/support) pages.
   Support email is the canonical Hempay Finance inbox. */

export const SUPPORT_EMAIL = 'support@hempayfinance.com'

/* ─────────────────────── Help Center ─────────────────────── */

export interface HelpArticle {
  question: string
  answer: string
}

export interface HelpCategory {
  id: string
  title: string
  /* single-glyph label rendered in the category chip */
  icon: 'rocket' | 'card' | 'shield' | 'globe' | 'chat' | 'help'
  blurb: string
  articles: HelpArticle[]
}

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    icon: 'rocket',
    blurb: 'Create your account and make your first payment in minutes.',
    articles: [
      {
        question: 'How do I get started with Hempay?',
        answer:
          'Start in one of three ways: download the mobile app from the App Store or Google Play, chat with our WhatsApp bot, or use our Telegram bot. No download is needed for the bots — just start a chat and follow the prompts.',
      },
      {
        question: 'Do I need to download an app to use the WhatsApp or Telegram bots?',
        answer:
          'No. The bots run entirely inside your messaging apps. You can create virtual cards, make payments, and manage your account without installing anything.',
      },
      {
        question: 'What do I need to open an account?',
        answer:
          'A phone number and a valid means of identification. Higher account tiers unlock larger limits after completing additional KYC verification.',
      },
    ],
  },
  {
    id: 'virtual-cards',
    title: 'Virtual cards',
    icon: 'card',
    blurb: 'Create, fund, freeze, and manage your multi-currency cards.',
    articles: [
      {
        question: 'How many virtual cards can I create?',
        answer:
          'You can create up to 11 virtual cards, each in a different currency. Every card can be customised and used for payments anywhere cards are accepted online.',
      },
      {
        question: 'What currencies are supported?',
        answer:
          'Hempay supports multiple currencies including USD, EUR, GBP, NGN, JPY and more. You can swap between currencies seamlessly at competitive FX rates.',
      },
      {
        question: 'Can I freeze or delete a card?',
        answer:
          'Yes. You can freeze a card instantly to pause spending, unfreeze it when you are ready, or delete it entirely — all from the app or a bot chat.',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security & account',
    icon: 'shield',
    blurb: 'Keep your money and personal data protected.',
    articles: [
      {
        question: 'Is Hempay safe and secure?',
        answer:
          'Yes. We use bank-grade encryption and comply with international security standards. Your financial information is protected with the highest level of security available.',
      },
      {
        question: 'What should I do if I notice unusual activity?',
        answer:
          `Freeze the affected card immediately from the app or a bot, then contact our support team at ${SUPPORT_EMAIL}. We monitor accounts around the clock and will help you secure yours.`,
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments & transfers',
    icon: 'globe',
    blurb: 'Send, receive, and convert across borders.',
    articles: [
      {
        question: 'How do transfers and FX work?',
        answer:
          'Move money between your currency balances or send it onward at transparent exchange rates. Conversions and transfers are confirmed instantly in most corridors.',
      },
      {
        question: 'Are there fees?',
        answer:
          'Fees vary by transaction type and currency corridor. Applicable fees are always shown before you confirm a payment, so there are never surprises.',
      },
    ],
  },
]

/* ─────────────────────────── Support ─────────────────────────── */

export interface SupportChannel {
  id: string
  label: string
  value: string
  detail: string
  href: string
  /* external links open in a new tab */
  external?: boolean
  icon: 'mail' | 'whatsapp' | 'telegram' | 'app'
}

export const SUPPORT_CHANNELS: SupportChannel[] = [
  {
    id: 'email',
    label: 'Email us',
    value: SUPPORT_EMAIL,
    detail: 'Best for account questions and anything that needs a paper trail. We reply within one business day.',
    href: `mailto:${SUPPORT_EMAIL}?subject=Support%20request`,
    icon: 'mail',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'Chat with the Hempay bot',
    detail: 'Manage your account and get quick answers right inside WhatsApp.',
    href: 'https://wa.me/your-number',
    external: true,
    icon: 'whatsapp',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: 'Message @hempay_bot',
    detail: 'Prefer Telegram? Our bot does everything the app does.',
    href: 'https://t.me/your-bot',
    external: true,
    icon: 'telegram',
  },
  {
    id: 'app',
    label: 'In-app support',
    value: 'Open the Hempay app',
    detail: 'Signed in? Use in-app chat for the fastest, most secure help.',
    href: 'https://apps.apple.com/app/hempay',
    external: true,
    icon: 'app',
  },
]

export interface SupportTopic {
  value: string
  label: string
}

export const SUPPORT_TOPICS: SupportTopic[] = [
  { value: 'Account & verification', label: 'Account & verification' },
  { value: 'Virtual cards', label: 'Virtual cards' },
  { value: 'Payments & transfers', label: 'Payments & transfers' },
  { value: 'Security concern', label: 'Security concern' },
  { value: 'Sales enquiry', label: 'Sales enquiry' },
  { value: 'Something else', label: 'Something else' },
]
