/* All brand copy carried over from the reference hempay-landing site,
   plus feature detail drawn from the Hempay API. */

export const LINKS = {
  whatsapp: 'https://wa.me/your-number',
  telegram: 'https://t.me/your-bot',
  appStore: 'https://apps.apple.com/app/hempay',
  playStore: 'https://play.google.com/store/apps/details?id=com.hempay',
}

export const COMPANY = {
  name: 'HEMPAY TECH INNOVATIONS LIMITED',
  rc: 'RC - 9198815',
  tagline: 'Creating a New Era of Financial Freedom with Innovative Payments Solutions',
}

export interface Currency {
  code: string
  symbol: string
  name: string
  hue: string // card tint
}

/* The 11 supported currencies → the 11 virtual cards */
export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', hue: '#e89a4f' },
  { code: 'EUR', symbol: '€', name: 'Euro', hue: '#8fb7e8' },
  { code: 'GBP', symbol: '£', name: 'British Pound', hue: '#c98fe8' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', hue: '#58c27d' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', hue: '#e88f8f' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar', hue: '#e8c98f' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar', hue: '#8fe8d5' },
  { code: 'CHF', symbol: '₣', name: 'Swiss Franc', hue: '#e88fbf' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', hue: '#e8724f' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', hue: '#d9c85a' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', hue: '#e8b25e' },
]

export interface Feature {
  index: string
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    index: '01',
    title: 'Seamless Swaps, Effortless Payments',
    description:
      'Hempay makes currency exchange a breeze. Swap currencies instantly and make payments globally with ease.',
  },
  {
    index: '02',
    title: 'Multi Language Support',
    description:
      "Unlock financial freedom: Hempay's multi language support welcomes you home. Speak your language, manage your money.",
  },
  {
    index: '03',
    title: 'Multi Virtual Cards, up to Eleven',
    description:
      'Enjoy the sweetness of multi currency flow. Create up to 11 virtual cards in different currencies for your needs.',
  },
  {
    index: '04',
    title: 'Stack Your Coins, Diversify Your Bag',
    description:
      'Hempay speaks all money languages, from Naira to USD to Yen. Diversify your portfolio with ease.',
  },
  {
    index: '05',
    title: 'Customise with Hempay',
    description:
      "Card design so lit, it's got its own hype. Customise your cards and make them uniquely yours.",
  },
  {
    index: '06',
    title: 'Tap into Tomorrow',
    description:
      'Next-gen payments for the next-gen you. Experience the future of finance with cutting-edge technology.',
  },
  {
    index: '07',
    title: 'WhatsApp & Telegram Bots',
    description:
      'Access Hempay anywhere, anytime. Use our WhatsApp or Telegram bots to create cards, make payments, and manage your account — no app download needed.',
  },
]

export interface Service {
  title: string
  description: string
  items: string[]
}

export const SERVICES: Service[] = [
  {
    title: 'Global Payments',
    description: 'Make payments worldwide with multi-currency support',
    items: ['USD', 'EUR', 'GBP', 'NGN', 'JPY'],
  },
  {
    title: 'Virtual Cards',
    description: 'Create up to 11 virtual cards in different currencies',
    items: ['USD Card', 'EUR Card', 'GBP Card', 'Multi-Currency'],
  },
  {
    title: 'Currency Exchange',
    description: 'Seamless swaps between currencies',
    items: ['Instant Exchange', 'Best Rates', 'Low Fees', '24/7 Available'],
  },
  {
    title: 'Multi-Language Support',
    description: 'Access your account in your preferred language',
    items: ['English', 'French', 'Spanish', 'More Languages'],
  },
  {
    title: 'Enterprise Solutions',
    description: 'Tailored solutions for businesses',
    items: ['SME', 'Enterprise', 'API Access', 'Custom Solutions'],
  },
  {
    title: 'Secure & Fast',
    description: 'Bank-grade security with instant transactions',
    items: ['Encrypted', 'Fast Processing', '24/7 Support', 'Global Reach'],
  },
  {
    title: 'Multiple Access Points',
    description: 'Use our app, WhatsApp bot, or Telegram bot',
    items: ['Mobile App', 'WhatsApp Bot', 'Telegram Bot', 'Web Platform'],
  },
]

export interface Step {
  number: string
  title: string
  description: string
}

export const STEPS: Step[] = [
  {
    number: '01',
    title: 'Choose Your Platform',
    description:
      'Start via our mobile app, WhatsApp bot, or Telegram bot. No app download needed for bots!',
  },
  {
    number: '02',
    title: 'Create Virtual Cards',
    description:
      'Generate virtual cards in multiple currencies — USD, EUR, GBP, and more. All through chat or app.',
  },
  {
    number: '03',
    title: 'Make Global Payments',
    description:
      'Use your virtual cards to pay for services worldwide. Fast and secure transactions.',
  },
  {
    number: '04',
    title: 'Manage Your Portfolio',
    description:
      'Track transactions, swap currencies, and manage all your cards — via app or chat bots.',
  },
]

export interface FAQEntry {
  question: string
  answer: string
}

export const FAQS: FAQEntry[] = [
  {
    question: 'How do I get started with Hempay?',
    answer:
      'You can get started in three ways: 1) Download our mobile app from the App Store or Google Play, 2) Chat with our WhatsApp bot, or 3) Use our Telegram bot. No app download needed for the bots!',
  },
  {
    question: 'Is Hempay safe and secure?',
    answer:
      'Yes, absolutely! We use bank-grade encryption and comply with international security standards. Your financial information is protected with the highest level of security.',
  },
  {
    question: 'How many virtual cards can I create?',
    answer:
      'You can create up to 11 virtual cards in different currencies. Each card can be customized and used for global payments.',
  },
  {
    question: 'What currencies are supported?',
    answer:
      'Hempay supports multiple currencies including USD, EUR, GBP, NGN, JPY, and more. You can swap between currencies seamlessly.',
  },
  {
    question: 'How do I contact support?',
    answer:
      "Our support team is available 24/7. You can reach us through the app, email, or our help center. We're here to assist you with any questions or issues.",
  },
  {
    question: 'Is there a mobile app?',
    answer:
      'Yes! Hempay is available on both iOS and Android. You can also use our WhatsApp or Telegram bots without downloading any app. All three options give you full access to create virtual cards and make payments.',
  },
  {
    question: 'Do I need to download an app to use WhatsApp or Telegram bots?',
    answer:
      'No! The WhatsApp and Telegram bots work directly in your messaging apps. Just start a chat and you can create virtual cards, make payments, and manage your account — all without downloading anything.',
  },
]

export interface ChatMessage {
  from: 'bot' | 'user'
  text: string
}

export const CHAT_SCRIPT: ChatMessage[] = [
  { from: 'bot', text: 'Hi! 👋 Welcome to Hempay. Create your multi-currency virtual card today!' },
  { from: 'user', text: 'Create USD virtual card' },
  { from: 'bot', text: '✅ Your USD virtual card has been created! Card ending in 1234 is ready to use.' },
  { from: 'user', text: 'Swap ₦50,000 to USD' },
  { from: 'bot', text: '💱 Done! $33.86 added to your USD wallet at today\'s best rate.' },
]

export const FOOTER_LINKS = {
  Solutions: [
    { href: '#services', label: 'Enterprise' },
    { href: '#services', label: 'SME' },
    { href: '#services', label: 'Personal' },
  ],
  Partners: [
    { href: '#', label: 'Partners' },
    { href: '#', label: 'Integrations' },
    { href: '#', label: 'Developers' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/terms', label: 'Compliance' },
  ],
  Support: [
    { href: '/help', label: 'Help Center' },
    { href: '/support', label: 'Contact Us' },
    { href: '#faq', label: 'FAQ' },
  ],
}
