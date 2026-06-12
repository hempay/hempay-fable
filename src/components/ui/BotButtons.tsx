import { LINKS } from '../../data/content'
import { WhatsAppIcon, TelegramIcon } from './icons'

interface BotButtonsProps {
  className?: string
}

/* WhatsApp + Telegram launch pills — used in hero, download & CTA */
export default function BotButtons({ className = '' }: BotButtonsProps) {
  return (
    <div className={`flex flex-col items-center gap-3 sm:flex-row ${className}`}>
      <a
        href={LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full items-center justify-center gap-2.5 rounded-full border border-leaf/30 bg-leaf/10 px-6 py-3 text-sm font-bold text-leaf transition-all duration-300 hover:-translate-y-0.5 hover:bg-leaf/20 hover:shadow-[0_8px_30px_-8px_rgba(88,194,125,0.5)] sm:w-auto"
      >
        <WhatsAppIcon />
        WhatsApp Bot
      </a>
      <a
        href={LINKS.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full items-center justify-center gap-2.5 rounded-full border border-sky/30 bg-sky/10 px-6 py-3 text-sm font-bold text-sky transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky/20 hover:shadow-[0_8px_30px_-8px_rgba(84,169,235,0.5)] sm:w-auto"
      >
        <TelegramIcon />
        Telegram Bot
      </a>
    </div>
  )
}
