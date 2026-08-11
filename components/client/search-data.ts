export interface SearchItem {
  title: string
  description: string
  href: string
  keywords: string[]
}

export const searchIndex: SearchItem[] = [
  { title: 'Daily calendar-1', description: 'Daily calendar', href: '#shop', keywords: ['daily', 'calendar', '1', 'wall', 'desk'] },
  { title: 'Daily calendar-2', description: 'Daily calendar', href: '#shop', keywords: ['daily', 'calendar', '2', 'desk', 'sunday'] },
  { title: 'Daily calendar-3', description: 'Daily calendar', href: '#shop', keywords: ['daily', 'calendar', '3', 'family', 'planner'] },
  { title: 'Daily calendar-4', description: 'Daily calendar', href: '#shop', keywords: ['daily', 'calendar', '4', 'photo', 'moments'] },
  { title: 'Collections', description: 'Shop all our calendars', href: '#shop', keywords: ['shop', 'collection', 'buy', 'calendar', 'store', 'purchase'] },
  { title: 'Custom calendars', description: 'Make it yours. Trusted by businesses across India.', href: '#enquiry', keywords: ['custom', 'make', 'yours', 'enquiry', 'bulk', 'business', 'corporate', 'brand', 'order', 'india'] },
  { title: 'Our story', description: 'Made for real life, not just pretty pictures.', href: '#about', keywords: ['story', 'about', 'why', 'sen tech', 'company', 'keepsake'] },
  { title: 'Contact us', description: 'Send an enquiry, we respond within 24 hours', href: '#enquiry', keywords: ['contact', 'email', 'phone', 'message', 'enquiry', 'talk'] },
  { title: 'Address', description: '1, Thendral Nagar South, Olaiyur Main Road, K.K.Nagar, Trichy 620021, Tamil Nadu', href: '#top', keywords: ['address', 'trichy', 'tamil nadu', 'location', 'store', 'kk nagar'] },
  { title: 'Phone', description: '8608059455', href: '#top', keywords: ['phone', 'call', 'contact', '8608059455'] },
  { title: 'Good days', description: 'Beautiful calendars designed to bring a little more intention to every day.', href: '#top', keywords: ['good days', 'hero', 'intention', 'beautiful', 'make room'] },
  { title: 'Made to be kept', description: 'Thoughtful design, printed on premium stock.', href: '#top', keywords: ['made to be kept', 'premium', 'stock', 'design', 'quality', 'promise'] },
  { title: 'Gallery', description: 'Good things, in their natural habitat. Follow along @sen_tech', href: '#top', keywords: ['gallery', 'community', 'instagram', 'sen_tech', 'photos', 'good things'] },
  { title: 'Shipping & returns', description: 'Delivery and returns help', href: '#top', keywords: ['shipping', 'returns', 'delivery', 'help', 'postage'] },
  { title: 'FAQ', description: 'Frequently asked questions', href: '#top', keywords: ['faq', 'help', 'questions', 'answers'] },
  { title: 'Trade program', description: 'Wholesale and business trade', href: '#top', keywords: ['trade', 'wholesale', 'program', 'business'] },
  { title: 'Privacy', description: 'Our privacy policy', href: '#top', keywords: ['privacy', 'legal', 'policy'] },
  { title: 'Terms', description: 'Terms of service', href: '#top', keywords: ['terms', 'legal', 'service'] },
  { title: 'Accessibility', description: 'Accessibility statement', href: '#top', keywords: ['accessibility', 'legal', 'support'] },
]

export function searchSite(query: string): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)
  return searchIndex
    .map((item) => {
      const haystack = [item.title, item.description, ...item.keywords].join(' ').toLowerCase()
      let score = 0
      for (const term of terms) {
        if (haystack.includes(term)) score += term.length
      }
      return { item, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
}
