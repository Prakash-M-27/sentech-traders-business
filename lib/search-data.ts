export interface SearchItem {
  id: string
  title: string
  description: string
  category: 'Product' | 'Section' | 'Craft' | 'Contact'
  href: string
  keywords: string[]
}

export const searchIndex: SearchItem[] = [
  {
    id: 'cal-01',
    title: 'Daily Calendar — Edition 01',
    description: 'Sage Editorial Minimalist 280 GSM Cotton Stock',
    category: 'Product',
    href: '#collection',
    keywords: ['daily', 'calendar', '1', 'sage', 'desk', 'wall', 'minimalist', 'bestseller'],
  },
  {
    id: 'cal-02',
    title: 'Daily Calendar — Edition 02',
    description: 'Warm Ochre & Studio Planner with Archival Card',
    category: 'Product',
    href: '#collection',
    keywords: ['daily', 'calendar', '2', 'butter', 'ochre', 'planner', 'studio', 'desk'],
  },
  {
    id: 'cal-03',
    title: 'Daily Calendar — Edition 03',
    description: 'Terracotta & Clay Compact Daily Ritual Edition',
    category: 'Product',
    href: '#collection',
    keywords: ['daily', 'calendar', '3', 'coral', 'terracotta', 'clay', 'compact'],
  },
  {
    id: 'cal-04',
    title: 'Daily Calendar — Edition 04',
    description: 'Botanical Sky Family & Studio Wide Planner',
    category: 'Product',
    href: '#collection',
    keywords: ['daily', 'calendar', '4', 'sky', 'blue', 'family', 'wall', 'large'],
  },
  {
    id: 'craft-frames',
    title: 'Crafted Solid Wooden Frames',
    description: 'Sustainable Solid Teakwood & Oak Mounts',
    category: 'Craft',
    href: '#craftsmanship',
    keywords: ['wood', 'frames', 'wooden', 'teakwood', 'oak', 'mount', 'stand'],
  },
  {
    id: 'custom-corporate',
    title: 'Custom Corporate Calendars & Gifting',
    description: 'Gold foil debossing & custom branding for business orders',
    category: 'Section',
    href: '#enquiry',
    keywords: ['custom', 'corporate', 'bulk', 'branding', 'order', 'gifting', 'business', 'foil'],
  },
  {
    id: 'brand-story',
    title: 'Our Story & Craftsmanship',
    description: 'Why Sen Tech: Obsessing over tactile paper, brass binding, and intention',
    category: 'Craft',
    href: '#story',
    keywords: ['about', 'story', 'philosophy', 'paper', 'craftsmanship', 'trichy', 'intention'],
  },
  {
    id: 'contact-info',
    title: 'Contact & Trichy Studio Address',
    description: '1, Thendral Nagar South, K.K.Nagar, Trichy 620021 | +91 86080 59455',
    category: 'Contact',
    href: '#enquiry',
    keywords: ['contact', 'address', 'phone', 'location', 'trichy', 'whatsapp', 'tamil nadu', '8608059455'],
  },
  {
    id: 'testimonials-section',
    title: 'Community Reviews & Testimonials',
    description: 'Trusted by 100+ studios, architects, and corporate clients across India',
    category: 'Section',
    href: '#testimonials',
    keywords: ['reviews', 'testimonials', 'ratings', 'community', 'clients'],
  },
]

export function searchSite(query: string): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)
  return searchIndex
    .map((item) => {
      const haystack = [item.title, item.description, item.category, ...item.keywords].join(' ').toLowerCase()
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
