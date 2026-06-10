# Feature Specification: Farmhouse Website

**Feature Branch**: `001-farmhouse-website`  
**Created**: 2026-06-10  
**Status**: Draft  
**Input**: User description: "Farmhouse Website"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Homepage Hero and Key Highlights (Priority: P1)

Visitors land on the homepage and need to immediately understand what the farmhouse offers. They should see compelling visuals, key benefits in a highlights bar, and be able to quickly identify pricing information and event types served.

**Why this priority**: This is the first impression and primary landing page. Without clear value delivery, visitors will leave before exploring other pages.

**Independent Test**: Can be fully tested by navigating to the homepage and verifying hero section, highlights bar, occasion cards, pricing preview, social proof, and CTA are all visible and functional.

**Acceptance Scenarios**:

1. **Given** visitor is on homepage, **When** page loads, **Then** hero section displays with main image, headline, and clear CTA
2. **Given** visitor is on homepage, **When** page loads, **Then** highlights bar shows key selling points (capacity, facilities, location)
3. **Given** visitor is on homepage, **When** page loads, **Then** occasion cards (wedding, banquet, corporate, etc.) are visible and clickable
4. **Given** visitor is on homepage, **When** page loads, **Then** pricing preview shows starting rates with clear indication of peak/off-peak pricing
5. **Given** visitor is on homepage, **When** page loads, **Then** social proof (reviews, testimonials) displays with authentic feedback
6. **Given** visitor is on homepage, **When** clicking CTA, **Then** WhatsApp chat opens with pre-filled message template

---

### User Story 2 - Learn About Farmhouse Story and Values (Priority: P2)

Visitors who are interested in booking want to understand the farmhouse's story, values, and why they should choose this venue. They need to see statistics that build credibility and connect emotionally with the brand.

**Why this priority**: Building trust and emotional connection is critical for high-consideration decisions like venue booking. This page establishes credibility.

**Independent Test**: Can be fully tested by navigating to About page and verifying story content, stats counter, and values cards are displayed with appropriate imagery.

**Acceptance Scenarios**:

1. **Given** visitor is on About page, **When** page loads, **Then** farmhouse story section displays with engaging narrative
2. **Given** visitor is on About page, **When** page loads, **Then** stats counter shows measurable achievements (years active, events hosted, customer satisfaction)
3. **Given** visitor is on About page, **When** page loads, **Then** values cards are displayed with icons and clear value descriptions

---

### User Story 3 - Explore Available Facilities (Priority: P2)

Visitors need to see what facilities and amenities are available at the farmhouse. They want to see a comprehensive gallery of spaces (ballroom, garden, pool, rooms) with clear descriptions of each.

**Why this priority**: Facility details directly impact booking decisions. Visitors need visual confirmation of what spaces are available.

**Independent Test**: Can be fully tested by navigating to Facilities page and verifying grid of 8-9 facility cards, pool highlight section, and images are displayed.

**Acceptance Scenarios**:

1. **Given** visitor is on Facilities page, **When** page loads, **Then** grid displays 8-9 facility cards with images and brief descriptions
2. **Given** visitor is on Facilities page, **When** page loads, **Then** pool section highlights the pool as a key feature
3. **Given** visitor views facilities on mobile, **When** page renders, **Then** facility grid adapts responsively (single column on mobile)

---

### User Story 4 - View Pricing and Booking Information (Priority: P1)

Visitors ready to book need clear, transparent pricing information. They want to understand day/night/combined rates, pricing tiers (weekdays/Friday/weekend), and how to proceed with booking.

**Why this priority**: Pricing transparency is essential for conversion. Visitors need to understand costs before committing to contact.

**Independent Test**: Can be fully tested by navigating to Booking page and verifying full pricing cards display correctly, 3-step how-to works, FAQ accordion expands/collapses.

**Acceptance Scenarios**:

1. **Given** visitor is on Booking page, **When** page loads, **Then** pricing cards show weekday rates (Day 45k, Night 55k, Day+Night 85k)
2. **Given** visitor is on Booking page, **When** page loads, **Then** Friday pricing cards show (Day 55k, Night 60k, Day+Night 95k)
3. **Given** visitor is on Booking page, **When** page loads, **Then** weekend pricing cards show (Day 60k, Night 70k, Day+Night 110k)
4. **Given** visitor is on Booking page, **When** clicking FAQ accordion item, **Then** corresponding answer expands/collapses
5. **Given** visitor is on Booking page, **When** page loads, **Then** 3-step how-to section displays booking process clearly
6. **Given** visitor is on Booking page, **When** page loads, **Then** corporate inquiry callout is visible for business customers

---

### User Story 5 - Contact Farmhouse and Start Booking (Priority: P1)

Visitors ready to proceed need an easy way to contact the farmhouse via WhatsApp and view the location on a map. They should be able to start the booking conversation with pre-filled information.

**Why this priority**: Contact is the conversion goal. A seamless WhatsApp flow and location information are essential for turning interest into bookings.

**Independent Test**: Can be fully tested by navigating to Contact page, verifying contact details display, WhatsApp form works, and Google Maps iframe renders.

**Acceptance Scenarios**:

1. **Given** visitor is on Contact page, **When** page loads, **Then** contact details (phone, email, address) are clearly displayed
2. **Given** visitor is on Contact page, **When** clicking WhatsApp CTA, **Then** WhatsApp opens with pre-filled message containing: greeting, intention to book, date placeholder, and guest count placeholder
3. **Given** visitor is on Contact page, **When** page loads, **Then** Google Maps iframe displays with correct location
4. **Given** visitor is on Contact page, **When** scrolling, **Then** WhatsApp button remains visible in bottom-right corner
5. **Given** visitor is on Contact page, **When** clicking floating WhatsApp button, **Then** WhatsApp chat opens with pre-filled message

---

### User Story 6 - Navigate Between Pages (Priority: P3)

Visitors need consistent, accessible navigation to move between Home, About, Facilities, Booking, and Contact pages. Navigation should work across all devices and be accessible.

**Why this priority**: While important, navigation is supporting functionality. Core pages can be tested independently once basic navigation is in place.

**Independent Test**: Can be fully tested by verifying all navigation links work and lead to correct pages on desktop and mobile.

**Acceptance Scenarios**:

1. **Given** visitor is on any page, **When** clicking navigation link, **Then** corresponding page loads
2. **Given** visitor is on mobile, **When** tapping menu icon, **Then** mobile navigation menu expands
3. **Given** visitor is on any page, **When** clicking logo, **Then** homepage loads
4. **Given** visitor is on any page, **When** page loads, **Then** current page is visually indicated in navigation

---

### Edge Cases

- What happens when WhatsApp link fails to open (blocked by browser extension)?
- How does the site handle very small screens (<375px)?
- What happens if Google Maps iframe fails to load?
- How does pricing display change when user clicks different pricing tier filters?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a responsive homepage with hero section, highlights bar, occasion cards, pricing preview, social proof, and CTA in a single view.

- **FR-002**: System MUST display the WhatsApp floating button in the bottom-right corner of all pages,始终保持 visible during scrolling.

- **FR-003**: System MUST open WhatsApp chat when clicking floating button with pre-filled message containing: greeting, intention to book, date placeholder, and guest count placeholder.

- **FR-004**: System MUST store pricing tiers in a constants file with three categories: Weekdays, Friday, and Weekend, each with Day/Night/Day+Night rates.

- **FR-005**: System MUST display different pricing rates:
  - Weekdays: Day 45k | Night 55k | Day+Night 85k
  - Friday: Day 55k | Night 60k | Day+Night 95k
  - Weekend: Day 60k | Night 70k | Day+Night 110k

- **FR-006**: System MUST render a Google Maps iframe embed on the Contact page and in the footer, using iframe-only approach without exposing API keys.

- **FR-007**: System MUST display Contact page with contact details section, WhatsApp form, and full-width Google Maps embed.

- **FR-008**: System MUST render About page with story section, stats counter, and values cards.

- **FR-009**: System MUST render Facilities page with a grid of 8-9 facility cards and pool highlight section.

- **FR-010**: System MUST render Booking page with full pricing cards, 3-step how-to section, FAQ accordion, and corporate inquiry callout.

- **FR-011**: System MUST implement FAQ accordion where clicking an item expands its answer and collapses other items.

- **FR-012**: System MUST render navigation that works on desktop and mobile with responsive design.

- **FR-013**: System MUST test and verify responsive behavior at viewport widths of 375px, 768px, and 1280px.

- **FR-014**: System MUST NOT require user authentication to view any page.

- **FR-015**: System MUST NOT store user data in client-side storage (localStorage, sessionStorage) for PII.

- **FR-016**: System MUST NOT include a content management system (CMS) backend.

- **FR-017**: System MUST NOT implement payment gateway functionality.

- **FR-018**: System MUST NOT include an admin dashboard.

- **FR-019**: System MUST produce static HTML output compatible with Next.js export (no server-side rendering requirements for production).

- **FR-020**: System MUST apply design tokens: Primary #1B3A2D, Background #F5ECD7, Accent #D4A843, WhatsApp #25D366.

- **FR-021**: System MUST use Playfair Display as display font, Inter as body font, and Inter Mono for prices.

- **FR-022**: System MUST apply rounded-2xl for cards and rounded-full for buttons.

### Key Entities

- **Page**: Represents a primary section of the website (Home, About, Facilities, Booking, Contact). Each page has a unique route, layout structure, and content requirements.

- **Pricing Tier**: Represents a pricing configuration based on day type. Contains: day rate, night rate, day+night rate, and applicable days (weekday/Friday/weekend).

- **Facility**: Represents a feature or amenity offered at the farmhouse. Contains: name, description, image, category (indoor/outdoor/pool).

- **Contact Information**: Represents the farmhouse's public contact details. Contains: phone number, email, physical address, WhatsApp number.

- **FAQ Item**: Represents a frequently asked question with question text and answer content.

### Assumptions

- **A1**: WhatsApp number is 923312499496 (provided in user description)
- **A2**: "Day+Night" pricing means combined package rate for both day and night usage
- **A3**: Friday is treated as a separate pricing tier from weekday/weekend (common for weekend venues)
- **A4**: Google Maps location is the same for both Contact page and footer
- **A5**: Social proof will use generic testimonials (specific reviews to be added by content team)
- **A6**: Stats counter for About page will use placeholder metrics (years active, events hosted, satisfaction percentage)
- **A7**: Occasion cards will include common event types: weddings, banquets, corporate events, photoshoots
- **A8**: "3-step how-to" refers to booking process steps (inquiry, confirmation, payment)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can navigate from homepage to any page in under 2 seconds

- **SC-002**: All pages load completely within 3 seconds on standard mobile connection (3G)

- **SC-003**: WhatsApp CTA opens with pre-filled message on first click attempt on all devices

- **SC-004**: All pages render without horizontal scrolling at viewport widths of 375px, 768px, and 1280px

- **SC-005**: FAQ accordion responds to clicks within 200ms (perceived performance)

- **SC-006**: All images optimize to under 100KB for common images (facility cards, hero) without unacceptable quality loss

- **SC-007**: Contact page displays accurate location on Google Maps iframe on first load

- **SC-008**: WhatsApp floating button remains visible and clickable while scrolling on all pages

- **SC-009**: Mobile navigation menu (hamburger) works correctly on 375px viewport

- **SC-010**: Design system (colors, fonts, spacing) consistent across all pages

## Out of Scope

- User authentication and registration system
- Content management system (CMS) backend
- Database integration or persistence
- Payment gateway implementation
- Admin dashboard or management interface
- Email notification system
- Search functionality
- Blog or news section
- User account management
- Reservation system (database-backed booking)
- Image gallery with lightbox (basic image display only)
- Multilingual support
- Advanced analytics or tracking
- User reviews submission system
- Newsletter subscription
