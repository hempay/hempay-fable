/* Interaction tests: mobile menu, FAQ accordion, anchor nav */
import { chromium } from 'playwright'

const browser = await chromium.launch()
const errors = []

// ── mobile menu ──
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
})
const mpage = await mctx.newPage()
mpage.on('pageerror', (e) => errors.push(`mobile PAGEERROR: ${e.message}`))
mpage.on('console', (m) => m.type() === 'error' && errors.push(`mobile: ${m.text()}`))
await mpage.goto('http://localhost:3000', { waitUntil: 'networkidle' })
await mpage.waitForTimeout(4500)
await mpage.tap('button[aria-label="Open menu"]')
await mpage.waitForTimeout(1200)
await mpage.screenshot({ path: '/tmp/hempay-shots/mobile-menu-open.png' })
// tap a link → should close + scroll
await mpage.tap('[data-menu-link][href="#faq"]')
await mpage.waitForTimeout(2200)
const mscroll = await mpage.evaluate(() => Math.round(window.scrollY))
console.log('mobile: menu link tap scrolled to', mscroll)
await mpage.screenshot({ path: '/tmp/hempay-shots/mobile-after-nav.png' })
await mctx.close()

// ── desktop FAQ + anchor ──
const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const dpage = await dctx.newPage()
dpage.on('pageerror', (e) => errors.push(`desktop PAGEERROR: ${e.message}`))
dpage.on('console', (m) => m.type() === 'error' && errors.push(`desktop: ${m.text()}`))
await dpage.goto('http://localhost:3000', { waitUntil: 'networkidle' })
await dpage.waitForTimeout(4500)
// header anchor
await dpage.click('header a[href="#faq"]')
await dpage.waitForTimeout(2200)
console.log('desktop: nav→#faq scrollY =', await dpage.evaluate(() => Math.round(window.scrollY)))
// open second FAQ
const q = dpage.locator('[data-faq-item] button').nth(1)
await q.click()
await dpage.waitForTimeout(900)
await dpage.screenshot({ path: '/tmp/hempay-shots/desktop-faq-open.png' })
console.log('desktop: faq#2 aria-expanded =', await q.getAttribute('aria-expanded'))

console.log('errors:', errors.length ? errors : 'none')
await dctx.close()
await browser.close()
