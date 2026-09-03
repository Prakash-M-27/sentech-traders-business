export interface Product {
  id: string
  name: string
  subtitle: string
  mark: string
  tone: 'sage' | 'butter' | 'coral' | 'sky' | 'wood' | 'emerald'
  accentColor: string
  badge?: string
  photo: string
  lifestylePhoto?: string
  specs: {
    paper: string
    dimensions: string
    binding: string
    idealFor: string
  }
  description: string
  features: string[]
}

export const products: Product[] = [
  {
    id: 'daily-calendar-01',
    name: 'Daily Calendar — Edition 01',
    subtitle: 'Sage Editorial Minimalist',
    mark: '01',
    tone: 'sage',
    accentColor: '#1B4332',
    badge: 'Bestseller',
    photo: '/new_cal_1.jpeg',
    lifestylePhoto: '/header_image.png',
    specs: {
      paper: '280 GSM Archival Cotton Blend',
      dimensions: '148 × 210 mm (A5 Format)',
      binding: 'Dual-loop Brass Wire Binding',
      idealFor: 'Executive desks, minimalist studios & living rooms',
    },
    description:
      'Designed for mornings that deserve a little more intention. Crisp typography paired with generous negative space to let your day breathe.',
    features: [
      'Zero bleed-through archival ink absorption',
      'Micro-perforated tear-off daily leaves',
      'Integrated easel back for free-standing stability',
      'Subtle lunar & seasonal milestone markers',
    ],
  },
  {
    id: 'daily-calendar-02',
    name: 'Daily Calendar — Edition 02',
    subtitle: 'Warm Ochre & Studio Planner',
    mark: '02',
    tone: 'butter',
    accentColor: '#C07D38',
    photo: '/cal_2.jpeg',
    lifestylePhoto: '/sample cal.jpeg',
    specs: {
      paper: '300 GSM Heavyweight Uncoated Stock',
      dimensions: '150 × 220 mm',
      binding: 'Top-stitched Reinforced Header',
      idealFor: 'Creative desks, architects & daily goal setting',
    },
    description:
      'A warm, sunlit companion for thoughtful scheduling. Rich contrast and tactile texture that makes every handwritten note feel consequential.',
    features: [
      'Deep tactile textured paper grain',
      'Generous margin space for daily reflections',
      'Clean Sunday-to-Saturday layout clarity',
      'Hand-inspected print consistency',
    ],
  },
  {
    id: 'daily-calendar-03',
    name: 'Daily Calendar — Edition 03',
    subtitle: 'Terracotta & Clay Compact',
    mark: '03',
    tone: 'coral',
    accentColor: '#C86D51',
    photo: '/cal_3.jpeg',
    lifestylePhoto: '/ref.png',
    specs: {
      paper: '280 GSM FSC-Certified Textured Stock',
      dimensions: '130 × 190 mm',
      binding: 'Matte Black Twin Ring',
      idealFor: 'Bedside tables, coffee bars & compact spaces',
    },
    description:
      'Earth-toned warmth for quiet corners. Compact without compromising legibility, bringing artisanal poise to your daily rituals.',
    features: [
      'Warm earth-toned pigment printing',
      'Sturdy non-slip base mount',
      'Smooth 360-degree flip binding',
      'Includes bookmark ruler leaf',
    ],
  },
  {
    id: 'daily-calendar-04',
    name: 'Daily Calendar — Edition 04',
    subtitle: 'Botanical Sky & Family Edit',
    mark: '04',
    tone: 'sky',
    accentColor: '#4A7C8A',
    photo: '/cal_4.jpeg',
    lifestylePhoto: '/gpt_design.png',
    specs: {
      paper: '320 GSM Museum-Grade Ultra White',
      dimensions: '160 × 240 mm',
      binding: 'Gold Foil Stamped Header & Ring',
      idealFor: 'Family planning, shared workspaces & wall mounts',
    },
    description:
      'Expansive clarity designed for shared lives and ambitious timelines. Ample room for multiple schedules, birthdays, and reminders.',
    features: [
      'High-opacity stock for fountain pens & markers',
      'Optional wall hanging grommet included',
      'Monthly overview + daily ritual grid',
      'Gold foil embossed typography',
    ],
  },
  {
    id: 'crafted-wooden-frames',
    name: 'Crafted Solid Wooden Frames',
    subtitle: 'Sustainable Teakwood & Oak Mounts',
    mark: '05',
    tone: 'wood',
    accentColor: '#8C5E3C',
    badge: 'New Arrival',
    photo: '/new.jpeg',
    lifestylePhoto: '/new.jpeg',
    specs: {
      paper: 'Custom Solid Hardwood',
      dimensions: 'Precision Milled to Fit Sen Tech Editions',
      binding: 'Brass Alignment Pins',
      idealFor: 'Permanent desk displays, luxury gifting',
    },
    description:
      'Handcrafted by seasoned wood artisans from reclaimed teak and seasoned oak. Finished with organic beeswax for a rich, natural sheen.',
    features: [
      'Hand-routed precision paper holding channel',
      'Brass weighted counter-balance',
      'Laser-engraved Sen Tech serial authentication',
      'Aging gracefully with a natural patina',
    ],
  },
]

export const brandStats = [
  { value: 100, suffix: '+', label: 'Corporate Partners', sub: 'Across India' },
  { value: 280, suffix: ' GSM', label: 'Archival Stock', sub: 'Zero Bleed' },
  { value: 100, suffix: '%', label: 'Bespoke Customization', sub: 'Foil & Branding' },
  { value: 24, suffix: 'h', label: 'Enquiry Turnaround', sub: 'Direct Response' },
]

export const brandTestimonials = [
  {
    quote:
      'Hanging proudly on our studio wall, this calendar commands attention every day. The golden frame detailing, rich color vibrancy, and tear-off leaves are exquisite.',
    author: 'Arun Kumar',
    role: 'Creative Director',
    company: 'Atelier Design Studio, Bangalore',
    location: 'Bangalore',
  },
  {
    quote:
      'We ordered 250 bespoke wall calendars for our corporate clients across South India. The customized gold foil branding and solid wall-mount frame made an unforgettable impression.',
    author: 'Priya Sundaram',
    role: 'Head of Brand Operations',
    company: 'Sentech Corporate Partners',
    location: 'Chennai',
  },
  {
    quote:
      'In an era of digital screens, tearing off the daily leaf on our office wall brings a moment of focus and clarity to our entire team every morning.',
    author: 'Karthik Raja',
    role: 'Architect & Interior Designer',
    company: 'Studio K Designs',
    location: 'Trichy, Tamil Nadu',
  },
  {
    quote:
      'The rich gold foil embossing and handcrafted frame turn our reception wall into a statement gallery. It is functional wall art at its finest.',
    author: 'Divya Menen',
    role: 'Founder',
    company: 'Verdant Living Goods',
    location: 'Coimbatore',
  },
]
