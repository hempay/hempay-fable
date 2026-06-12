/* Headless-Chrome verification: console errors, overflow check, screenshots */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const OUT = '/tmp/hempay-shots'
mkdirSync(OUT, { recursive: true })

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true },
]

const browser = await chromium.launch()

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.hasTouch ?? false,
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(`PAGEERROR: ${err.message}`))

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.waitForTimeout(4500) // let preloader finish + hero intro play

  // hero
  await page.screenshot({ path: `${OUT}/${vp.name}-1-hero.png` })

  // horizontal overflow check
  const overflow = await page.evaluate(() => {
    const w = document.documentElement.clientWidth
    const bad = []
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.width > 1 && (r.right > w + 1 || r.left < -1) && getComputedStyle(el).position !== 'fixed') {
        const cs = getComputedStyle(el)
        if (cs.visibility !== 'hidden' && cs.display !== 'none') {
          bad.push(`${el.tagName}.${String(el.className).slice(0, 60)} → left:${Math.round(r.left)} right:${Math.round(r.right)} (vw:${w})`)
        }
      }
    })
    return bad.slice(0, 12)
  })

  // scroll through and capture key sections
  const stops = [
    ['2-cardfan', 0.16],
    ['3-features', 0.36],
    ['4-chat', 0.5],
    ['5-services', 0.62],
    ['6-how', 0.74],
    ['7-download', 0.84],
    ['8-faq-cta', 0.92],
    ['9-footer', 1.0],
  ]
  const total = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)
  for (const [name, frac] of stops) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(total * frac))
    await page.waitForTimeout(1300)
    await page.screenshot({ path: `${OUT}/${vp.name}-${name}.png` })
  }

  console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`)
  console.log(`scrollHeight: ${total}`)
  console.log(`console errors: ${errors.length ? '\n  ' + errors.join('\n  ') : 'none'}`)
  console.log(`overflow offenders: ${overflow.length ? '\n  ' + overflow.join('\n  ') : 'none'}`)

  await ctx.close()
}

await browser.close()
console.log(`\nshots → ${OUT}`)
