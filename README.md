# Foi's Kitchen Website

Foi's Instructions

1. Website Build Prompt

Copy this into the AI tool you're using to actually generate the site (Claude Code, Lovable, Bolt, v0, Cursor, etc.). Adjust the tech-stack line if the tool has a fixed stack.

You are building the website for Foi's Kitchen, a Nairobi-based business selling
catered food, meal prep plans, and online food orders. Build a minimalist,
food-first, mobile-first website using [React + Tailwind CSS — adjust to your
stack] based on the specification below.

BRAND
- Name: Foi's Kitchen
- Positioning: home-style catering, meal prep and online ordering — warm,
  trustworthy, personal, not corporate.
- Tone: friendly, confident, appetite-forward. Short copy, no jargon.

DESIGN SYSTEM
Colours:
- Warm Charcoal-Brown #3B2A20 — primary text, headings, nav background
- Terracotta/Ochre Accent #C97B3D — buttons, links, active states, prices
- Soft Cream #F4EFE9 — page background, alternating sections
- Pure White #FFFFFF — card backgrounds
- Muted Sage #7C8B6B — optional secondary accent for "healthy/meal-prep" tags
- WhatsApp Green #25D366 — reserved ONLY for WhatsApp buttons/icons
Rule: roughly 60% cream/white, 30% charcoal-brown text, 10% ochre accent. Never
more than two colours competing on one card.

Typography:
- Headings/logo/nav: Poppins (Bold/SemiBold). Optional editorial alternative:
  Fraunces or DM Serif Display for Weddings/Corporate sub-pages.
- Body text: Lato (Regular/Medium).
- Type scale (desktop): H1 44–56px bold line-height 1.1 · H2 30–34px semibold
  · H3 20–22px semibold · Body 16–17px line-height 1.6 · Buttons/labels
  14–15px semibold uppercase, 0.5px letter-spacing.
- Scale down ~20–25% on mobile; body text never below 15px.

Layout:
- Generous whitespace between sections (80–120px desktop).
- Max content width ~1200–1280px, centred.
- Food/menu photography: consistent aspect ratio (4:5 or 1:1) across all cards.
- One consistent outline-style icon set, in accent or charcoal only.
- Real food/event photography only — no generic stock imagery.

Animation (subtle, 200–450ms, ease-out only — never linear/bouncy):
- Hero: fade-up of headline + button, staggered ~100ms on load.
- Section reveals: fade + slide-up 20–30px on scroll, once per section.
- Menu/category cards: fade in with 50–80ms stagger when a category opens.
- Food images: scale 1.0 → 1.04 on hover/tap with soft shadow lift.
- Buttons: colour-deepen + scale 1.0 → 1.02 on hover; scale to 0.97 on press.
- Add-to-order: small toast slide-in from top, or a cart-icon "bump" — never
  a full-screen popup.
- Category/filter tabs: animated underline or pill that slides to the active
  tab.
- Do NOT use: auto-playing carousels, heavy parallax, animated background
  patterns/particles.

NAVIGATION (7 top-level items + 1 persistent floating action)
Logo — Home — About — Services ▾ — Menu — Order Now ▾ — Gallery & Reviews — Contact
- Services ▾: Corporate Catering · Weddings & Private Events · Meal Prep Plans
- Order Now ▾: styled as a solid accent-coloured button. Options: Order Online,
  Request a Quotation.
- Floating WhatsApp button: fixed bottom-right on every page/breakpoint, opens
  a pre-filled WhatsApp chat link (wa.me/<number>?text=...).
- Mobile: nav collapses to a hamburger menu; Order Now stays visible as a
  sticky bottom bar.

PAGES TO BUILD
1. Home — full-width hero (rotating food imagery) with headline + Order Now
   CTA; 3 feature icons (Fresh Daily, Custom Catering, WhatsApp Support);
   featured menu categories; icon-led "How it works" strip (Order → Confirm →
   Prepare → Deliver); testimonials strip; footer CTA.
2. About — founder story, brand values, kitchen/hygiene photos, key numbers
   (years active, events served).
3. Services → Corporate Catering — package tiers, sample menus, MOQ,
   downloadable menu PDF, "Request a Quote" button.
4. Services → Weddings & Private Events — past-event gallery, package
   overview, booking-lead-time note, enquiry form.
5. Services → Meal Prep Plans — image-led plan cards (price in the card
   title, checklist of inclusions, dietary tags, one "Order Plan" button).
6. Menu Catalogue — category tabs (Breakfast, Mains, Sides, Drinks,
   Desserts), image-led card grid (photo, name, price, Add to Order), search/
   filter, dietary icons.
7. Order Online — cart-style flow: item selection → delivery/pickup details →
   M-Pesa STK push or "Complete via WhatsApp" checkout → confirmation screen.
8. Request a Quotation — short form: name, phone, event type, date, guest
   count, budget range (optional), notes. Submits to email/CRM + "Continue on
   WhatsApp" option.
9. Gallery & Reviews — filterable masonry photo/video grid + testimonial
   cards (name, photo, rating).
10. Contact — map/location, phone, email, WhatsApp button, contact form,
    business hours.

RESPONSIVE RULES
- Mobile-first. Menu grid: 2 columns mobile, 3 tablet, 4 desktop.
- Minimum tap target 44×44px.
- Single-column forms with native mobile keyboard types (numeric for phone,
  etc.).
- Serve responsive, compressed images (WebP with fallback).

DELIVERABLE
Production-ready, componentised code with placeholder content/images clearly
marked [PLACEHOLDER], ready for real copy and photography to be dropped in.
Keep components small and named clearly (e.g. MenuCard, ServiceDropdown,
WhatsAppFloatButton) so they're easy to reuse across pages.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/53771100-876b-4d9e-9af8-e1443688739a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
