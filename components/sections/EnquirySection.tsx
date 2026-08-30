'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  CheckCircle2,
  Phone,
  MapPin,
  Shield,
  Zap,
  Building2,
  Truck,
  MessageSquare,
  Sparkles,
  User,
  Mail,
  FileText,
  Layers,
} from 'lucide-react'
import MagneticButton from '@/components/motion/MagneticButton'

interface FormData {
  name: string
  phone: string
  email: string
  company: string
  quantity: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  company?: string
  message?: string
  email?: string
  quantity?: string
}

const QUANTITY_OPTIONS = ['25–50 Units', '50–100 Units', '100–250 Units', '250–500+ Units']

const TRUST_BADGES = [
  { icon: Shield, label: 'Archival 280 GSM Cotton', color: '#1B4332' },
  { icon: Zap, label: '24h Rapid Turnaround', color: '#C07D38' },
  { icon: Building2, label: 'Bespoke Corporate Foil', color: '#8C5E3C' },
  { icon: Truck, label: 'Safe All-India Shipping', color: '#1B4332' },
]

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '')
  const withoutCountryCode = cleaned.replace(/^91/, '')
  return /^[6-9]\d{9}$/.test(withoutCountryCode)
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Full name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!data.phone.trim()) {
    errors.phone = 'Mobile number is required'
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number'
  }

  if (!data.company.trim()) {
    errors.company = 'Company / Studio name is required'
  }

  if (
    data.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  ) {
    errors.email = 'Please enter a valid email address'
  }

  return errors
}

export default function EnquirySection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    quantity: '50–100 Units',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const finalPayload = {
        ...formData,
        message: formData.message.trim() || `Quantity: ${formData.quantity}`,
      }

      // Save enquiry to MongoDB database
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save enquiry')
      }

      setIsSubmitted(true)

      // Direct WhatsApp handoff
      const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918608059455'
      const msg = encodeURIComponent(
        `*New Wall Calendar Enquiry*\n` +
          `Name: ${formData.name}\n` +
          `Phone: ${formData.phone}\n` +
          `Company: ${formData.company}\n` +
          `Email: ${formData.email || 'N/A'}\n` +
          `Order Size: ${formData.quantity}\n\n` +
          `Requirement: ${formData.message || 'Please send catalog and bulk quote'}`
      )

      setTimeout(() => {
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
      }, 600)
    } catch {
      setErrors({ message: 'Something went wrong. Please try again or call us directly.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="enquiry"
      className="pt-8 sm:pt-14 lg:pt-16 pb-16 sm:pb-32 lg:pb-36 bg-[#FAF7F2] relative overflow-hidden border-b border-[#E2DDD3]"
    >
      {/* Giant Ambient Background Typography Watermark */}
      <div
        className="absolute top-1/3 -left-12 pointer-events-none select-none overflow-hidden opacity-[0.032] z-0"
        aria-hidden="true"
      >
        <span className="font-serif text-[22vw] leading-none whitespace-nowrap text-[#121413]">
          BESPOKE
        </span>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#121413_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Editorial Contact Narrative & Touchpoints */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 sm:space-y-10">
            <div className="space-y-4 sm:space-y-6">
              {/* Animated Kicker Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] animate-ping" />
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#1B4332] bg-[#EBF2EC] border border-[#DCE8DE] px-3.5 py-1 rounded-full shadow-sm">
                  Bespoke Orders & Inquiries
                </span>
              </motion.div>

              {/* Masked Headline Reveal */}
              <div className="overflow-hidden space-y-1">
                <motion.h2
                  initial={{ y: '100%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-extrabold text-editorial-lg text-[#121413] tracking-tight uppercase leading-[0.95]"
                >
                  Let’s make it <br />
                  <span className="font-serif font-normal italic text-[#1B4332] capitalize">
                    Uniquely yours.
                  </span>
                </motion.h2>
              </div>

              {/* Editorial Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-[#4A4D49] leading-relaxed font-sans font-normal"
              >
                Whether you need a custom corporate run of luxury wall calendars with metallic gold foil debossing
                or bespoke gifting for your studio, we craft each piece with utmost precision.
              </motion.p>
            </div>

            {/* Direct Studio Contact Cards with Hover Micro-Animations */}
            <div className="space-y-3 sm:space-y-4 pt-4 border-t border-[#E2DDD3]">
              {/* Phone & WhatsApp Card */}
              <motion.a
                href="https://wa.me/918608059455"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E2DDD3] hover:border-[#1B4332] transition-all group shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#EBF2EC] border border-[#DCE8DE] flex items-center justify-center text-[#1B4332] group-hover:bg-[#1B4332] group-hover:text-white transition-colors shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#737770] font-bold block">
                    Direct Phone / WhatsApp Order
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#121413] group-hover:text-[#1B4332] transition-colors">
                    +91 86080 59455
                  </span>
                </div>
              </motion.a>

              {/* Studio Location Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E2DDD3] shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FAF5E6] border border-[#F0E5CA] flex items-center justify-center text-[#C07D38] shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#737770] font-bold block">
                    Studio Location
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#121413]">
                    1, Thendral Nagar South, K.K.Nagar, Trichy 620021, Tamil Nadu
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Trust Badges Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2">
              {TRUST_BADGES.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs text-[#121413] font-semibold bg-white p-3 sm:p-3.5 rounded-2xl border border-[#E2DDD3] shadow-sm"
                >
                  <b.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: b.color }} strokeWidth={2.4} />
                  <span>{b.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Ultra-Attractive Interactive Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-gradient-to-br from-white via-[#FCFBF8] to-[#FAF5EC] rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-12 lg:p-14 border-2 border-[#E2DDD3] hover:border-[#1B4332]/40 shadow-xl sm:shadow-2xl shadow-[#121413]/10 relative overflow-hidden flex flex-col justify-between transition-colors duration-500"
          >
            {/* Shimmer Light Sweep on Hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B4332]/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="py-20 text-center flex flex-col items-center justify-center space-y-6 my-auto z-10 relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-[#1B4332] text-white flex items-center justify-center shadow-xl shadow-[#1B4332]/30"
                  >
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#121413]">
                      Enquiry Registered!
                    </h3>
                    <p className="text-base text-[#4A4D49] max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Your wall calendar customization inquiry has been registered. Redirecting to WhatsApp for instant confirmation.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        company: '',
                        quantity: '50–100 Units',
                        message: '',
                      })
                    }}
                    className="text-xs font-mono font-bold uppercase tracking-widest text-[#1B4332] hover:text-[#122F23] underline pt-4 cursor-pointer transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8 relative z-10"
                  initial={{ opacity: 1 }}
                >
                  {/* Attractive Header Card with Enquire Us Title */}
                  <div className="border-b border-[#ECE7DE] pb-6 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1B4332]">
                          Instant Price Estimate & Samples
                        </span>
                      </div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#121413]">
                        Enquire Us
                      </h3>
                      <p className="text-xs sm:text-sm text-[#737770] font-sans mt-1">
                        Fill out the details below and we will prepare custom pricing and physical proofs.
                      </p>
                    </div>
                    <span className="hidden sm:flex w-11 h-11 rounded-2xl bg-[#FAF5E6] border border-[#F0E5CA] items-center justify-center text-[#C07D38] shadow-sm">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </span>
                  </div>

                  {/* Interactive Quantity Selector Chips */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#737770] font-bold mb-3 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Estimated Order Quantity</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {QUANTITY_OPTIONS.map((opt) => {
                        const isSelected = formData.quantity === opt
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, quantity: opt }))}
                            className={`py-3 px-3 rounded-2xl text-xs font-mono font-bold transition-all duration-300 border cursor-pointer text-center ${
                              isSelected
                                ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md scale-[1.02] ring-2 ring-[#1B4332]/20'
                                : 'bg-white text-[#4A4D49] hover:text-[#121413] border-[#E2DDD3] hover:border-[#1B4332]/40'
                            }`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Contact Fields (Luxury Cards Layout) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E2DDD3] focus-within:border-[#1B4332] focus-within:ring-2 focus-within:ring-[#1B4332]/10 transition-all shadow-sm">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#737770] font-bold flex items-center gap-1.5 mb-1">
                        <User className="w-3.5 h-3.5 text-[#1B4332]" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={handleChange('name')}
                        placeholder="Arun Kumar"
                        className="w-full bg-transparent text-base sm:text-lg text-[#121413] font-semibold placeholder:text-[#A6AAA2] focus:outline-none"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 mt-1 font-sans font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Mobile WhatsApp Number */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E2DDD3] focus-within:border-[#1B4332] focus-within:ring-2 focus-within:ring-[#1B4332]/10 transition-all shadow-sm">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#737770] font-bold flex items-center gap-1.5 mb-1">
                        <Phone className="w-3.5 h-3.5 text-[#1B4332]" />
                        <span>Mobile (WhatsApp) *</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        placeholder="98765 43210"
                        className="w-full bg-transparent text-base sm:text-lg text-[#121413] font-semibold placeholder:text-[#A6AAA2] focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1 font-sans font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Company / Brand Name */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E2DDD3] focus-within:border-[#1B4332] focus-within:ring-2 focus-within:ring-[#1B4332]/10 transition-all shadow-sm">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#737770] font-bold flex items-center gap-1.5 mb-1">
                        <Building2 className="w-3.5 h-3.5 text-[#1B4332]" />
                        <span>Company / Studio *</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={handleChange('company')}
                        placeholder="Atelier Studio"
                        className="w-full bg-transparent text-base sm:text-lg text-[#121413] font-semibold placeholder:text-[#A6AAA2] focus:outline-none"
                      />
                      {errors.company && (
                        <p className="text-xs text-red-600 mt-1 font-sans font-medium">
                          {errors.company}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E2DDD3] focus-within:border-[#1B4332] focus-within:ring-2 focus-within:ring-[#1B4332]/10 transition-all shadow-sm">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#737770] font-bold flex items-center gap-1.5 mb-1">
                        <Mail className="w-3.5 h-3.5 text-[#1B4332]" />
                        <span>Email (Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        placeholder="contact@company.com"
                        className="w-full bg-transparent text-base sm:text-lg text-[#121413] font-semibold placeholder:text-[#A6AAA2] focus:outline-none"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1 font-sans font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Optional Notes / Message */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E2DDD3] focus-within:border-[#1B4332] focus-within:ring-2 focus-within:ring-[#1B4332]/10 transition-all shadow-sm">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#737770] font-bold flex items-center gap-1.5 mb-1">
                      <FileText className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>Requirements / Message (Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={handleChange('message')}
                      placeholder="e.g. We require delivery before November 15th with gold hot foil debossed logos..."
                      className="w-full bg-transparent text-sm sm:text-base text-[#121413] placeholder:text-[#A6AAA2] focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button & Response Promise */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[#ECE7DE]">
                    <MagneticButton as="div" data-cursor="cta">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-wipe w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#1B4332] hover:bg-[#122F23] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-10 py-5 rounded-full shadow-xl shadow-[#1B4332]/25 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 text-white" />
                        {isSubmitting ? (
                          <span>Sending Enquiry...</span>
                        ) : (
                          <>
                            <span>Enquire Us</span>
                            <ArrowUpRight className="w-4 h-4 text-white stroke-[2.6]" />
                          </>
                        )}
                      </button>
                    </MagneticButton>

                    <div className="flex items-center gap-2.5 text-xs text-[#737770] font-sans font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] animate-pulse" />
                      <span>Direct WhatsApp response with sample mockups</span>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
