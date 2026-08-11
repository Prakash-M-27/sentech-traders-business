'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Check,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Star,
  Zap,
  Truck,
  Shield,
} from 'lucide-react'
import FormInput from './FormInput'
import FormTextarea from './FormTextarea'

const TRUST_BADGES = [
  { icon: Shield, label: 'Premium Quality' },
  { icon: Zap, label: 'Fast Production' },
  { icon: Building2, label: 'Bulk Orders' },
  { icon: Truck, label: 'Nationwide Delivery' },
]

interface FormData {
  name: string
  phone: string
  email: string
  company: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  company?: string
  message?: string
}

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '')
  const withoutCountryCode = cleaned.replace(/^91/, '')
  return /^[6-9]\d{9}$/.test(withoutCountryCode)
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number'
  }

  if (!data.company.trim()) {
    errors.company = 'Company name is required'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Please provide more details (min 10 characters)'
  }

  return errors
}

export default function EnquirySection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save enquiry')
      }

      setIsSubmitted(true)

      const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'
      const msg = encodeURIComponent(
        `WELCOME ★!!!\n\n` +
        `Tip: Attach a high-quality photo in your message for the best print results.\n\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company}\n\n` +
        `Message: ${formData.message}`
      )
      window.location.href = `https://wa.me/${phone}?text=${msg}`
    } catch (err) {
      setErrors({ message: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="eq-section"
      id="enquiry"
    >
      <div className="eq-bg-pattern" aria-hidden="true" />

      <div className="eq-container">
        <div className="eq-header">
          <p className="eq-eyebrow">Custom Calendars</p>
          <h2 className="eq-title">Make it Yours.</h2>

          <div className="eq-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="eq-star-icon" fill="currentColor" />
            ))}
            <span className="eq-stars-text">Trusted by Businesses Across India</span>
          </div>

          <p className="eq-description">
            Tell us about your vision and we&apos;ll craft a premium calendar
            that reflects your brand and leaves a lasting impression.
          </p>

          <div className="eq-trust-badges">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="eq-badge">
                <badge.icon className="eq-badge-icon" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="eq-card">
          {isSubmitted ? (
            <div className="eq-success">
              <div className="eq-success-icon">
                <Check strokeWidth={2.5} />
              </div>
              <h3 className="eq-success-title">Enquiry Sent</h3>
              <p className="eq-success-text">
                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="eq-form">
              <div className="eq-grid">
                <FormInput
                  label="Name"
                  type="text"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={handleChange('name')}
                  error={errors.name}
                  icon={<User size={18} />}
                  index={0}
                  autoComplete="name"
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  placeholder="98765 43210"
                  required
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  error={errors.phone}
                  icon={<Phone size={18} />}
                  index={1}
                  autoComplete="tel"
                />
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange('email')}
                  icon={<Mail size={18} />}
                  index={2}
                  autoComplete="email"
                />
                <FormInput
                  label="Company Name"
                  type="text"
                  placeholder="Your company name"
                  required
                  value={formData.company}
                  onChange={handleChange('company')}
                  error={errors.company}
                  icon={<Building2 size={18} />}
                  index={3}
                  autoComplete="organization"
                />
                <FormTextarea
                  label="Message"
                  placeholder="Tell us about your requirements..."
                  required
                  value={formData.message}
                  onChange={handleChange('message')}
                  error={errors.message}
                  icon={<MessageSquare size={18} />}
                  index={4}
                  rows={5}
                />
                <p className="eq-photo-note">Tip: Attach a high-quality photo in your message for the best print results.</p>
              </div>

              {errors.message && (
                <p className="eq-error eq-error--form">{errors.message}</p>
              )}

              <div className="eq-submit-section">
                <div className="eq-submit-row">
                  <button
                    type="button"
                    className="eq-submit"
                    disabled={isSubmitting}
                    aria-label="Send enquiry via WhatsApp"
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="eq-spinner" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <ArrowRight className="eq-submit-arrow" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <div className="eq-submit-meta">
                    <p className="eq-response-time">
                      <span className="eq-response-dot" />
                      We&apos;ll respond within 24 hours.
                    </p>
                    <p className="eq-no-spam">No spam. No obligation. Free consultation.</p>
                  </div>
                </div>

                <div className="eq-whatsapp-note">
                  <Check aria-hidden="true" />
                  <span>Your enquiry will be saved and we&apos;ll respond within 24 hours</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
