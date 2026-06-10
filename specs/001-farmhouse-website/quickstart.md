# Quickstart: Farmhouse Website

**Feature**: Farmhouse Website  
**Branch**: 001-farmhouse-website  
**Date**: 2026-06-10

## Development Setup

### Prerequisites
- Node.js 20+ 
- npm or pnpm
- Git

### Initial Setup
```bash
# Navigate to project
cd website

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

### Available Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Build for production (Next.js static export) |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests (if configured) |

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Navbar + Footer + FloatingWA
│   ├── page.tsx                 # Home
│   ├── about/page.tsx           # About page
│   ├── facilities/page.tsx      # Facilities page
│   ├── booking/page.tsx         # Booking page
│   ├── contact/page.tsx         # Contact page
│   └── privacy/page.tsx         # Privacy policy
├── components/                  # React components
│   ├── layout/                  # Navbar, Footer
│   ├── ui/                      # PricingCard, FacilityCard, SectionCTA
│   └── shared/                  # WhatsAppButton, MapEmbed, StatsCounter
└── lib/                         # Utilities
    ├── constants.ts             # PHONE, PRICES, FACILITIES, MAP_URL
    └── wa.ts                    # buildWhatsAppURL(phone, msg)
```

## Build Order (Recommended)

1. **Setup** - Verify development environment
   ```bash
   cd website
   npm install  # or pnpm install
   npm run dev  # verify site loads
   ```

2. **Utilities First** - Create `lib/constants.ts` and `lib/wa.ts`
   ```bash
   # Create lib directory
   mkdir -p src/lib
   # Create constants.ts with pricing, phone, facilities, map URL
   # Create wa.ts with buildWhatsAppURL function
   ```

3. **Layout Components** - Navbar and Footer
   - Create `src/components/layout/Navbar.tsx`
   - Create `src/components/layout/Footer.tsx`
   - Update `src/app/layout.tsx` to include layout + children

4. **Shared Components** - Reusable UI
   - Create `src/components/shared/WhatsAppButton.tsx`
   - Create `src/components/shared/MapEmbed.tsx`
   - Create `src/components/shared/StatsCounter.tsx`

5. **UI Components** - Domain-specific
   - Create `src/components/ui/PricingCard.tsx`
   - Create `src/components/ui/FacilityCard.tsx`
   - Create `src/components/ui/SectionCTA.tsx`

6. **Pages** - Implement pages in order
   - Home page (MVP - most critical)
   - Facilities page
   - Booking page
   - About page
   - Contact page
   - Privacy page (required by constitution)

7. **Polish** - Final improvements
   - SEO metadata (next/head or metadata API)
   - next/image optimization
   - Accessibility audit (a11y)
   - Responsive testing (375px, 768px, 1280px)

## Configuration Files

### `next.config.ts`
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export with next/image
  },
};

export default nextConfig;
```

### `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B3A2D',
        background: '#F5ECD7',
        accent: '#D4A843',
        whatsapp: '#25D366',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

## Google Maps Embed
```html
<iframe
  src="https://www.google.com/maps/embed/v1/place?key=PLACEHOLDER&q=Farmhouse+Name+Address"
  width="100%"
  height="450"
  style="border:0;"
  loading="lazy"
  allowfullscreen=""
></iframe>
```

Note: For static export without API key, use iframe embed without key parameter or use generic location embed.

## Testing Strategy

### Test Files Location
- Utility tests: `tests/wa.test.ts`, `tests/constants.test.ts`
- Component tests: `src/components/*/component.test.tsx` (colocated)

### Test Commands
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Deployment

### Static Export
```bash
npm run build
# Generates static files in out/ directory
```

### Deploy Options
- **Vercel**: Connect repository, auto-deploys on push
- **GitHub Pages**: Deploy `out/` directory
- **Netlify**: Drag and drop `out/` directory
- **Any static host**: Upload `out/` contents

## Design Tokens

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#1B3A2D` | Main brand color, headers |
| Background | `#F5ECD7` | Page background, light sections |
| Accent | `#D4A843` | Highlights, CTAs |
| WhatsApp | `#25D366` | WhatsApp buttons/link |

### Typography
| Font | Usage |
|------|-------|
| Playfair Display | Display headings, hero titles |
| Inter | Body text, UI components |
| Inter Mono | Prices, technical info |

### Spacing
- Cards: `rounded-2xl`
- Buttons: `rounded-full`
- Section padding: `py-16` (64px top/bottom)

## Environment Variables (None Required)
This is a static site - no environment variables needed.

## Troubleshooting

### Build fails with "export" output
- Ensure `next.config.ts` has `output: 'export'`
- Check for server-only APIs in pages

### Fonts not loading
- Verify `next/font` configuration in layout
- Check font URLs are accessible

### Tailwind styles not applied
- Verify `tailwind.config.ts` content paths match project structure
- Ensure `globals.css` is imported in `layout.tsx`

## Next Steps
After setup, proceed with `/sp.tasks` to create implementation tasks based on this plan.
