import { projectMedia } from './media'

export interface Project {
  id: string
  title: string
  tagline: string
  tags: string[]
  type: 'Solo' | 'Team'
  description: string
  longDescription: string
  techStack: { name: string; usage: string }[]
  features: string[]
  architecture?: string
  screens?: string[]
  galleryImages: string[]
  galleryDescription: string
  videoUrl?: string
  coverImage: string
  videoPlaceholder?: string
  github?: string
  live?: string
  year: string
  level: 'Basic' | 'Intermediate' | 'Advanced'
}

export const projects: Project[] = [
  {
    id: 'tkstream',
    title: 'TkStream',
    tagline: 'TV & Mobile Streaming App  NiaziPlay scraper for big-screen experiences',
    tags: ['Flutter', 'Android TV', 'Web Scraping', 'HLS'],
    type: 'Solo',
    description: 'A sleek entertainment app for Android TV and mobile that scrapes NiaziPlay to surface series, historical dramas, and dubbed shows  no browser needed.',
    longDescription: `TkStream is a media streaming application built for big-screen Android TV experiences as well as mobile devices. 
    It provides a cinematic browsing experience that lets users explore multi-season shows from the NiaziPlay website directly inside a 
    native app  reading synopses, checking episode guides, and streaming HD video content without ever opening a browser.
    
    The app tackles a real problem: NiaziPlay has a massive catalogue of Urdu-dubbed and subtitled shows but no native Android TV client. 
    TkStream fills that gap by scraping the site's data and presenting it in a remote-control-friendly, focus-based UI.`,
    techStack: [
      { name: 'Flutter', usage: 'Cross-platform UI for TV & mobile' },
      { name: 'Dart', usage: 'Core application language' },
      { name: 'web_scraper', usage: 'HTML parsing & data extraction' },
      { name: 'video_player / better_player', usage: 'HLS .m3u8 playback' },
      { name: 'Provider', usage: 'State management' },
      { name: 'Android TV Leanback', usage: 'D-pad & remote navigation' },
    ],
    features: [
      'Visual poster grid  browse extensive catalogue of shows & historical dramas',
      'At-a-glance season counts and total episode counts per title',
      'Multi-season navigation with structured episode listings',
      'Hero banner with full synopsis, release year, and one-tap Play Now',
      '16:9 episode cards with thumbnails, durations & language tags (Urdu Dubbed, English Subs)',
      'Smooth HLS video playback  no buffering artefacts',
      'Watch-progress indicators on episode cards',
      'Full Android TV D-pad & remote control navigation',
    ],
    galleryImages: [
      ...projectMedia.tkstream.gallery,
    ],
    galleryDescription: 'TkStream brings a focused, remote-friendly streaming experience to Android TV and mobile. This gallery will show the browsing, show details, and playback screens as the project evolves.',
    videoUrl: projectMedia.tkstream.video,
    coverImage: projectMedia.tkstream.cover,
    videoPlaceholder: projectMedia.tkstream.preview,
    github: 'https://github.com/faizanali49/TkStream',
    year: '2026',
    level: 'Intermediate',
  },
  {
    id: 'glamgo',
    title: 'GlamGo',
    tagline: 'Premium salon discovery & appointment booking  end-to-end Flutter concept',
    tags: ['Flutter', 'Firebase', 'Riverpod', 'GoRouter'],
    type: 'Solo',
    description: 'A production-style salon booking app demonstrating clean architecture, Riverpod state management, and smooth micro-interactions from discovery to confirmed appointment.',
    longDescription: `GlamGo is a premium salon discovery and appointment booking concept built in Flutter. 
    The project demonstrates a complete end-to-end booking journey  from discovering nearby salons to confirming appointments  
    with a focus on clean feature-first architecture, predictable state management, and smooth animations throughout.
    
    Rather than chasing features, GlamGo was an exercise in doing the fundamentals correctly: one truth per state slice, 
    navigation that never gets confused about where you are, and animations that feel earned rather than decorative.`,
    techStack: [
      { name: 'Flutter', usage: 'Cross-platform mobile framework' },
      { name: 'Riverpod', usage: 'Scalable & predictable state management' },
      { name: 'GoRouter', usage: 'Declarative navigation with deep links' },
      { name: 'Flutter Animate', usage: 'UI animations & staggered transitions' },
      { name: 'Firebase', usage: 'Auth, Firestore & push notifications' },
    ],
    features: [
      'Modern premium UI  consistent design language across all screens',
      'Nearby salon discovery with map integration',
      'Staff selection flow with availability indicators',
      'Multi-step booking & scheduling system',
      'Animated booking confirmation & success states',
      'Live booking tracking screen',
      'Full profile & booking history management',
      'OTP authentication flow',
    ],
    architecture: `lib/
├── core/          # Themes, routing, constants, shared configs
├── features/
│   ├── auth/      # Authentication & OTP flow
│   ├── salon/     # Salon discovery & profile details
│   ├── booking/   # Booking flow, scheduling & checkout
│   ├── profile/   # User profile & booking management
│   └── home/      # Dashboard & navigation shell
├── shared/        # Reusable widgets & utilities
└── main.dart`,
    galleryImages: [
      ...projectMedia.glamgo.gallery,
    ],
    galleryDescription: 'GlamGo is designed as a calm, premium booking journey. The gallery will show salon discovery, stylist selection, scheduling, and the final booking confirmation flow.',
    videoUrl: projectMedia.glamgo.video,
    coverImage: projectMedia.glamgo.cover,
    videoPlaceholder: projectMedia.glamgo.preview,
    github: 'https://github.com/faizanali49/glamgo',
    year: '2025',
    level: 'Intermediate',
  },
]
