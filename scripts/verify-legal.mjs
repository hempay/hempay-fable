/* Verify routing, legal pages, footer nav, and hero card interaction */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const OUT = '/tmp/hempay-shots'
mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch()
const errors = []

// ── desktop: direct-load legal pages ──
const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const dpage = await dctx.newPage()
dpage.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`))
dpage.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`))

for (const route of ['terms', 'privacy']) {
  await dpage.goto(`http://localhost:3000/${route}`, { waitUntil: 'networkidle' })
  await dpage.waitForTimeout(1800)
  await dpage.screenshot({ path: `${OUT}/legal-${route}-top.png` })
  const title = await dpage.title()
  const h1 = await dpage.locator('h1').first().innerText()
  const tocCount = await dpage.locator('aside nav li').count()
  const sectionCount = await dpage.locator('[data-legal-section]').count()
  console.log(`/${route}: title="${title}" h1="${h1.replace(/\n/g, ' ')}" toc=${tocCount} sections=${sectionCount}`)

  // click a TOC link → should scroll WITHIN page (not navigate home)
  await dpage.locator('aside nav a').nth(5).click()
  await dpage.waitForTimeout(1500)
  console.log(`  after TOC click → url=${new URL(dpage.url()).pathname} scrollY=${Math.round(await dpage.evaluate(() => window.scrollY))}`)
  await dpage.screenshot({ path: `${OUT}/legal-${route}-mid.png` })
}

// ── footer link from home → /privacy (SPA nav, no reload) ──
await dpage.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
await dpage.waitForTimeout(4500)
await dpage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
await dpage.waitForTimeout(1200)
await dpage.locator('footer a[href="/privacy"]').first().click()
await dpage.waitForTimeout(1500)
console.log(`footer→privacy: url=${new URL(dpage.url()).pathname} scrollY=${Math.round(await dpage.evaluate(() => window.scrollY))} (should be ~0)`)

// ── cross-doc link privacy → terms ──
await dpage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
await dpage.waitForTimeout(800)
await dpage.locator('a[href="/terms"]').last().click()
await dpage.waitForTimeout(1200)
console.log(`privacy→terms cross-link: url=${new URL(dpage.url()).pathname}`)

// ── header section link from legal page → home + scroll ──
await dpage.locator('header a[href="#services"]').click()
await dpage.waitForTimeout(2200)
console.log(`legal header #services: url=${new URL(dpage.url()).pathname} hash=${new URL(dpage.url()).hash} scrollY=${Math.round(await dpage.evaluate(() => window.scrollY))} (should be home, scrolled)`)

await dctx.close()

// ── hero card interaction ──
const cctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const cpage = await cctx.newPage()
cpage.on('pageerror', (e) => errors.push(`card PAGEERROR: ${e.message}`))
await cpage.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
await cpage.waitForTimeout(4500)
const cardBtns = cpage.locator('[data-hero-card]')
console.log(`hero cards: count=${await cardBtns.count()} (expect 3)`)
// read inner rotationY before/after click
const flipBefore = await cpage.evaluate(() => {
  const inner = document.querySelectorAll('[data-card-flip]')[2]
  return getComputedStyle(inner).transform
})
await cardBtns.nth(2).click()
await cpage.waitForTimeout(300)
await cpage.screenshot({ path: `${OUT}/hero-card-flipping.png` })
await cpage.waitForTimeout(1100)
const flipAfter = await cpage.evaluate(() => {
  const inner = document.querySelectorAll('[data-card-flip]')[2]
  return getComputedStyle(inner).transform
})
const hintGone = await cpage.evaluate(() => {
  const p = [...document.querySelectorAll('p')].find((el) => el.textContent.includes('Tap a card'))
  return p ? getComputedStyle(p).opacity : 'no-hint'
})
console.log(`card flip transform changed: ${flipBefore !== flipAfter} | hint opacity after click: ${hintGone}`)
await cpage.screenshot({ path: `${OUT}/hero-after-flip.png` })
await cctx.close()

await browser.close()
console.log('\nERRORS:', errors.length ? errors : 'none')
