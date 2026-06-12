import type { CSSProperties } from 'react'
import type { Currency } from '../../data/content'

interface VCardProps {
  currency: Currency
  className?: string
  style?: CSSProperties
  number?: string
}

/* A Hempay virtual card face. Tinted per currency. */
export default function VCard({ currency, className = '', style, number = '•••• 4291' }: VCardProps) {
  return (
    <div
      className={`vcard select-none ${className}`}
      style={
        {
          background: `
            radial-gradient(120% 160% at 85% -20%, ${currency.hue}33 0%, transparent 50%),
            radial-gradient(100% 140% at 0% 110%, ${currency.hue}1f 0%, transparent 55%),
            linear-gradient(150deg, #2a1810 0%, #170d07 55%, #0f0804 100%)
          `,
          ...style,
        } as CSSProperties
      }
    >
      {/* top row: brand + currency code */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-[6.5%]">
        <img src="/logo.png" alt="" className="h-[18%] w-auto max-h-7 opacity-90" draggable={false} />
        <div className="text-right">
          <span
            className="font-display block text-[clamp(0.7rem,4cqw,1.05rem)] font-semibold leading-none tracking-wide"
            style={{ color: currency.hue }}
          >
            {currency.code}
          </span>
          <span className="mt-1 block text-[clamp(0.45rem,2.4cqw,0.65rem)] font-medium text-cream/45">
            {currency.name}
          </span>
        </div>
      </div>

      {/* chip */}
      <div
        className="absolute left-[6.5%] top-[38%] h-[16%] w-[13%] rounded-[18%] border border-gold/40"
        style={{ background: 'linear-gradient(135deg, #f6c987, #c96f2e)' }}
      >
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/30" />
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/30" />
      </div>

      {/* number + footer */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-[6.5%]">
        <div>
          <span className="block font-mono text-[clamp(0.6rem,4.2cqw,1rem)] tracking-[0.18em] text-cream/85">
            {number}
          </span>
          <span className="mt-1.5 block text-[clamp(0.45rem,2.4cqw,0.62rem)] font-semibold uppercase tracking-[0.22em] text-cream/40">
            Hempay Virtual
          </span>
        </div>
        <span className="font-display text-[clamp(1rem,7cqw,1.8rem)] font-semibold" style={{ color: currency.hue }}>
          {currency.symbol}
        </span>
      </div>
    </div>
  )
}
