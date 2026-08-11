import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

const MAX_BODY_BYTES = 10_000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 10

const rateLimit = new Map<string, number[]>()

function rateLimited(key: string): boolean {
  const now = Date.now()
  const hits = (rateLimit.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (hits.length >= RATE_LIMIT_MAX) {
    rateLimit.set(key, hits)
    return true
  }
  hits.push(now)
  rateLimit.set(key, hits)
  return false
}

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '')
  const withoutCountryCode = cleaned.replace(/^91/, '')
  return /^[6-9]\d{9}$/.test(withoutCountryCode)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 })
  }

  if (rateLimited(getClientIp(request))) {
    return NextResponse.json({ error: 'Too many requests, please try again later' }, { status: 429 })
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  const rawBody = await request.text()
  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  let body: unknown
  try {
    body = rawBody ? JSON.parse(rawBody) : {}
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, phone, email, company, message } = (body ?? {}) as Record<string, unknown>

  const cName = clean(name)
  const cPhone = clean(phone)
  const cEmail = clean(email)
  const cCompany = clean(company)
  const cMessage = clean(message)

  if (!cName || cName.length < 2 || cName.length > 100) {
    return NextResponse.json({ error: 'Name must be 2-100 characters' }, { status: 400 })
  }
  if (!cPhone || !isValidPhone(cPhone)) {
    return NextResponse.json({ error: 'Enter a valid 10-digit Indian mobile number' }, { status: 400 })
  }
  if (!cCompany || cCompany.length > 150) {
    return NextResponse.json({ error: 'Company name must be 1-150 characters' }, { status: 400 })
  }
  if (cMessage.length < 10 || cMessage.length > 2000) {
    return NextResponse.json({ error: 'Message must be 10-2000 characters' }, { status: 400 })
  }
  if (cEmail.length > 200 || (cEmail && !EMAIL_RE.test(cEmail))) {
    return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 })
  }

  try {
    const { db } = await connectToDatabase()

    const enquiry = {
      name: cName,
      phone: cPhone,
      email: cEmail,
      company: cCompany,
      message: cMessage,
      createdAt: new Date(),
    }

    const result = await db.collection('enquiries').insertOne(enquiry)

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    })
  } catch (error) {
    console.error('Enquiry submission error:', error)
    return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
  }
}
