import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.AUDIT_URL || 'http://127.0.0.1:4173/';
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = process.env.AUDIT_OUTPUT || path.resolve('artifacts/site-preview');
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: chromePath });
const sizes = [
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
];

const results = [];
for (const size of sizes) {
  const context = await browser.newContext({ viewport: size, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outputDir, `${size.name}.png`), fullPage: true });
  const audit = await page.evaluate(() => {
    const interactive = [...document.querySelectorAll('a[href], button, input, textarea, select')];
    const tinyTargets = interactive
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return { tag: element.tagName, text: (element.textContent || element.getAttribute('aria-label') || '').trim().slice(0, 60), width: Math.round(rect.width), height: Math.round(rect.height) };
      })
      .filter((item) => item.width > 0 && item.height > 0 && (item.width < 24 || item.height < 24));
    return {
      title: document.title,
      lang: document.documentElement.lang,
      h1Count: document.querySelectorAll('h1').length,
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      missingLabels: [...document.querySelectorAll('input, textarea, select')].filter((field) => !field.id || !document.querySelector(`label[for="${field.id}"]`)).length,
      emptyLinks: [...document.querySelectorAll('a[href]')].filter((link) => !link.textContent?.trim() && !link.getAttribute('aria-label')).length,
      tinyTargets,
    };
  });

  await page.goto(`${baseUrl}#sobre-mi`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
  audit.anchorSpacing = await page.evaluate(() => {
    const header = document.querySelector('header');
    const kicker = document.querySelector('[data-od-id="about"] .section-kicker');
    if (!header || !kicker) return null;
    return Math.round(kicker.getBoundingClientRect().top - header.getBoundingClientRect().bottom);
  });

  await page.goto(`${baseUrl}#laboratorio`, { waitUntil: 'networkidle' });
  if (size.width < 768) {
    await page.getByRole('button', { name: 'Expandir controles del laboratorio' }).click();
  }
  const visualizer = page.locator('[data-od-id="audio-visualizer"]');
  await visualizer.scrollIntoViewIfNeeded();
  await visualizer.screenshot({ path: path.join(outputDir, `${size.name}-audio.png`) });
  audit.audioVisualizer = await visualizer.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const canvas = element.querySelector('canvas')?.getBoundingClientRect();
    return {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      canvasWidth: Math.round(canvas?.width || 0),
      canvasHeight: Math.round(canvas?.height || 0),
      overflow: element.scrollWidth - element.clientWidth,
    };
  });

  await visualizer.getByRole('button', { name: 'Usar fósforo amber' }).click();
  await page.waitForTimeout(120);
  audit.brandSync = await page.evaluate(() => ({
    documentTheme: document.documentElement.dataset.brandTheme,
    visualizerTheme: document.querySelector('[data-od-id="audio-visualizer"]')?.getAttribute('data-visualizer-theme'),
    accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
  }));
  if (size.width === 1440) {
    await visualizer.screenshot({ path: path.join(outputDir, `${size.name}-audio-amber.png`) });
  }

  if (size.width === 1440) {
    await visualizer.getByRole('button', { name: /Activar Concierto/ }).click();
    await page.waitForTimeout(350);
    const graphModes = [
      ['waveform', 'Osciloscopio Temporal V(t)'],
      ['spectrum', 'Espectro FFT de Fourier F(ω)'],
      ['lissajous', 'Fase Estéreo & Lissajous Φ(x,y)'],
      ['polar', 'Resonancia Armónica Cuántica Polar r(θ)'],
    ];
    for (const [name, title] of graphModes) {
      await visualizer.locator(`button[title="${title}"]`).click();
      await page.waitForTimeout(180);
      await visualizer.screenshot({ path: path.join(outputDir, `${size.name}-${name}.png`) });
    }
  }

  if (size.width === 360) {
    const menu = page.locator('button[aria-controls="mobile-navigation"]');
    await menu.click();
    audit.menuExpanded = await menu.getAttribute('aria-expanded');
    await page.keyboard.press('Escape');
    audit.menuClosedWithEscape = (await menu.getAttribute('aria-expanded')) === 'false';
  }
  results.push({ size, audit, consoleErrors });
  await context.close();
}

const heroContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const heroPage = await heroContext.newPage();
await heroPage.goto(baseUrl, { waitUntil: 'networkidle' });
await heroPage.waitForTimeout(1200);
await heroPage.screenshot({ path: path.join(outputDir, 'desktop-1440-hero-live.png') });
const heroVisual = await heroPage.evaluate(() => {
  const stage = document.querySelector('.scene-stage')?.getBoundingClientRect();
  const hero = document.querySelector('#hero')?.getBoundingClientRect();
  const image = document.querySelector('.hero-editorial img')?.getBoundingClientRect();
  return {
    sceneHeight: Math.round(stage?.height || 0),
    sceneBottom: Math.round(stage?.bottom || 0),
    heroBottom: Math.round(hero?.bottom || 0),
    imageWidth: Math.round(image?.width || 0),
    imageHeight: Math.round(image?.height || 0),
  };
});
await heroPage.evaluate(() => window.scrollTo(0, 650));
await heroPage.waitForTimeout(400);
await heroPage.screenshot({ path: path.join(outputDir, 'desktop-1440-scene-transition.png') });
results.push({ size: { name: 'hero-live', width: 1440, height: 1000 }, audit: heroVisual, consoleErrors: [] });
await heroContext.close();

await browser.close();
await fs.writeFile(path.join(outputDir, 'audit.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
