import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(req: Request) {
  const { html } = await req.json()
  const isServer = process.env.NODE_ENV === 'production'

  if (!html) {
    return NextResponse.json({ error: 'No HTML provided' }, { status: 400 })
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: isServer ? '/snap/bin/chromium' : undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: 'networkidle0' })

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
  })

  await browser.close()

  return new NextResponse(Buffer.from(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="report.pdf"',
    },
  })
}
