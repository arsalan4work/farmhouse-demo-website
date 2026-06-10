# Data Model: Farmhouse Website

**Feature**: Farmhouse Website  
**Branch**: 001-farmhouse-website  
**Date**: 2026-06-10  
**Source**: Feature spec requirements and assumptions

## Entities

### 1. PricingTier
Represents a pricing configuration based on day type.

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `day` | `number` | Yes | Price for day-only booking |
| `night` | `number` | Yes | Price for night-only booking |
| `dayAndNight` | `number` | Yes | Price for combined day+night booking |
| `applicableDays` | `string[]` | Yes | Days this tier applies to |

**Validation Rules**:
- All price values must be positive integers (no decimals)
- `dayAndNight` must be less than or equal to `day + night` (discount logic)
- `applicableDays` must contain at least one day identifier

**State Transitions**: N/A (static data)

**Instances**:
```typescript
{
  Weekdays: { day: 45000, night: 55000, dayAndNight: 85000, applicableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'] },
  Friday: { day: 55000, night: 60000, dayAndNight: 95000, applicableDays: ['Friday'] },
  Weekend: { day: 60000, night: 70000, dayAndNight: 110000, applicableDays: ['Saturday', 'Sunday'] }
}
```

---

### 2. Facility
Represents a feature or amenity offered at the farmhouse.

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (e.g., "pool", "ballroom") |
| `name` | `string` | Yes | Display name |
| `description` | `string` | Yes | Detailed description |
| `category` | `"indoor" | "outdoor" | "pool"` | Yes | Categorization for filtering |
| `image` | `string` | Yes | Path to image asset |
| `capacity` | `number` | No | Maximum capacity (if applicable) |
| `features` | `string[]` | No | Additional features list |

**Validation Rules**:
- `id` must be unique across all facilities
- `category` must be one of allowed values
- `image` must be a valid path or URL

**State Transitions**: N/A (static data)

---

### 3. ContactInfo
Represents the farmhouse's public contact details.

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `phone` | `string` | Yes | Main contact phone number |
| `whatsApp` | `string` | Yes | WhatsApp number (can be same as phone) |
| `email` | `string` | Yes | Contact email address |
| `address` | `string` | Yes | Physical address |
| `locationName` | `string` | Yes | Name for maps/search |
| `coordinates` | `{ lat: number; lng: number }` | Yes | GPS coordinates |

**Validation Rules**:
- Phone numbers must be in E.164 format or valid international format
- Email must be valid email format
- Coordinates must be valid latitude (-90 to 90) and longitude (-180 to 180)

**State Transitions**: N/A (static data)

---

### 4. FAQItem
Represents a frequently asked question with question text and answer content.

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `question` | `string` | Yes | Question text |
| `answer` | `string` | Yes | Answer text (can be HTML) |
| `category` | `string` | No | Category for grouping (e.g., "pricing", "booking", "facilities") |
| `order` | `number` | No | Sort order within category |

**Validation Rules**:
- `id` must be unique
- `question` and `answer` must not be empty strings
- `order` must be a positive integer

**State Transitions**: N/A (static data)

---

### 5. Page
Represents a primary section of the website.

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Page identifier (route name) |
| `title` | `string` | Yes | Page title (browser tab) |
| `route` | `string` | Yes | URL path (e.g., "/about") |
| `navLabel` | `string` | Yes | Label in navigation menu |
| `sections` | `string[]` | Yes | Section IDs displayed on page |

**Validation Rules**:
- `route` must follow Next.js App Router conventions
- `navLabel` must be short enough for navigation display
- All routes must exist in the application

**State Transitions**: N/A (static data)

**Instances**:
- Home: `/` - Home page with hero, highlights, occasion cards, pricing preview, social proof, CTA
- About: `/about` - Story, stats, values
- Facilities: `/facilities` - Grid of facility cards
- Booking: `/booking` - Pricing cards, 3-step process, FAQ, corporate callout
- Contact: `/contact` - Contact details, WhatsApp form, map
- Privacy: `/privacy` - Privacy policy content

---

### 6. Testimonial (Social Proof)
Represents user-generated feedback for social proof.

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `name` | `string` | Yes | Author name |
| `eventDate` | `string` | Yes | Date of event (formatted) |
| `eventType` | `string` | Yes | Type of event (wedding, corporate, etc.) |
| `text` | `string` | Yes | Feedback text |
| `rating` | `number` | No | Star rating (1-5) |
| `imageUrl` | `string` | No | Optional author photo |

**Validation Rules**:
- `rating` must be between 1 and 5 if present
- `text` should not be empty

**State Transitions**: N/A (static data)

---

## Relationships

```
PricingTier (1) ── (many) ── Page (Home)
       │
       └─── (used by) Booking Page

Facility (1) ── (many) ── Page (Facilities)

ContactInfo (1) ── (used by) Page (Contact)

FAQItem (1) ── (many) ── Page (Booking)

Testimonial (1) ── (many) ── Page (Home)
```

## Data Sources

- **PricingTier**: Constants file (`constants.ts`)
- **Facility**: Constants file (`constants.ts`)
- **ContactInfo**: Constants file (`constants.ts`)
- **FAQItem**: Constants file (`constants.ts`)
- **Page**: File-based routing (Next.js App Router)
- **Testimonial**: Constants file (`constants.ts`)

All data is static, pre-built at compile time, no runtime data fetching required.
