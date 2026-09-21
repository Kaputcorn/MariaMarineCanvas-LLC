# Mary's Marine Canvas — Project Status

Last Updated: September 21, 2026

---

# Project Overview

Mary's Marine Canvas is a responsive business website for marine canvas and upholstery services.

The website is being developed as a static frontend with a separate backend for secure quote submissions and email delivery.

Business:

Mary's Marine Canvas

Established 2021

Boat Canvas & Upholstery Services

Phone: 914-565-3426

Email: [MMCUPHOLSTERY@GMAIL.COM](mailto:MMCUPHOLSTERY@GMAIL.COM)

---

# Important Project Rules

* Do not invent business information.
* Real business/project photos have not been added yet unless explicitly stated otherwise.
* Use placeholders until real photographs are provided.
* Keep the existing premium marine visual style consistent.
* When modifying code, provide the entire affected file.
* If multiple files are affected, provide every affected file.
* Avoid partial code patches unless specifically requested.
* Do not change unrelated working functionality.
* Keep shared functionality in shared files rather than duplicating it across pages.
* Environment variables and passwords must never be committed to GitHub.
* Frontend validation is for usability only; backend validation must also be performed.
* PROJECT-STATUS.md is the main source of truth for overall project progress.

---

# Design System

Primary colors:

* Deep Marine Navy: #0A1F2D
* Deep Navy: #06151F
* Warm Off-White: #F5F2EA
* White: #FFFFFF
* Muted Ocean Blue: #466A7C
* Main Text: #162026
* Tan Accent: #B7A083
* Light Tan: #D8C9B6

Typography:

* Headings: Cormorant Garamond
* Body / Navigation: Lato

Overall style:

* Premium marine business
* Professional rather than artistic
* Large typography
* Strong photography
* Restrained animations
* Navy and warm neutral palette
* Responsive mobile-first behavior

---

# Repository Structure

Current intended structure:

```text
MariaMarineCanvas-LLC/
├── assets/
│   ├── icons/
│   └── images/
│       ├── general/
│       ├── logo/
│       └── portfolio/
│           ├── canvas-repair/
│           ├── clear-panels/
│           ├── cockpit-cover/
│           ├── custom-boat-cover/
│           ├── custom-cushions/
│           ├── custom-fabrication/
│           ├── full-marine-enclosure/
│           └── marine-seating/
│
├── css/
│   ├── about.css
│   ├── contact.css
│   ├── home.css
│   ├── services.css
│   ├── skeleton.css
│   ├── style.css
│   └── work.css
│
├── js/
│   ├── about.js
│   ├── contact.js
│   ├── home.js
│   ├── projects.js
│   ├── script.js
│   ├── services.js
│   ├── skeleton.js
│   └── work.js
│
├── pages/
│   ├── about.html
│   ├── contact.html
│   ├── services.html
│   └── work.html
│
├── server/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
├── PROJECT-STATUS.md
├── README.md
└── index.html
```

---

# Phase 1 — Foundation & Setup

Status: COMPLETE

Completed:

* GitHub repository structure
* Root index.html
* CSS / JS / assets / pages organization
* Responsive foundation
* Mobile navigation
* Sticky / shrinking header
* Scroll reveal animations
* Back-to-top button
* Reduced-motion support
* iPhone safe-area handling
* Skeleton loading system
* Google Fonts
* Basic Content Security Policy
* Referrer policy
* Responsive desktop and mobile layouts

---

# Phase 2 — UI / UX & Visual Redesign

Status: COMPLETE

Completed:

* Premium marine visual direction
* Navy / warm off-white palette
* Cormorant Garamond headings
* Lato interface typography
* Homepage hero redesign
* CTA sections
* Modern card system
* Improved footer
* Responsive spacing
* Mobile layout improvements
* Project / portfolio visual system

---

# Phase 3 — Content & Portfolio

Status: FUNCTIONALLY COMPLETE

Completed:

* Dedicated Work page
* Dedicated Services page
* Dedicated About page
* Dedicated Contact page
* Portfolio project system
* Portfolio filtering
* Project modal
* Gallery controls
* Previous / next image navigation
* Mobile swipe support
* Before / after project support
* Placeholder image handling

Current portfolio placeholder projects:

1. Custom Boat Cover
2. Marine Seating
3. Full Marine Enclosure
4. Custom Fabrication
5. Cockpit Cover
6. Clear Panels
7. Custom Cushions
8. Canvas Repair

Still needed:

* Mary's real project photographs
* Final project descriptions where necessary
* Final before / after photography

---

# Phase 4 — Quote / Contact System

Status: IN PROGRESS

## Phase 4.1 — Quote Form Interface

Status: COMPLETE

Completed:

* Customer information fields
* Preferred contact method
* Boat information
* Service selector
* Project description
* Responsive form layout
* Direct phone / email contact card

---

## Phase 4.2 — Frontend Validation

Status: COMPLETE

Completed:

* Required name validation
* Phone validation
* Email validation
* Phone-or-email requirement
* Preferred contact method validation
* Boat year validation
* Service validation
* Project description minimum length
* Character counter
* Disabled submit button until form is ready
* Accessible error messages

---

## Phase 4.3 — Photo Upload Interface

Status: COMPLETE

Completed:

* JPG support
* PNG support
* WEBP support
* Maximum 6 photos
* Maximum 8 MB per individual photo
* Maximum 20 MB total photo size
* Image previews
* File-size display
* Individual Remove buttons
* Duplicate prevention
* Photo counter
* Safe browser object URL handling

---

## Phase 4.4 — Secure Backend & Email Delivery

Status: COMPLETE

Completed:

* Node.js backend structure
* Express server
* Environment variable support
* .gitignore protection
* CORS configuration
* Helmet security headers
* Rate limiting
* Multer upload handling
* Server-side Zod validation
* File signature validation
* Maximum attachment limits
* Honeypot spam field
* Confirmation ID generation
* Gmail / Nodemailer transport structure
* API health endpoint
* Quote submission endpoint
* npm audit currently reports 0 vulnerabilities
* Node.js version verified as v24.13.1
* Gmail App Password configured locally
* server/.env created and configured
* Backend started successfully
* /api/health tested successfully
* Real quote submission tested successfully
* Mary received the quote email
* Submitted quote information arrived correctly
* Image attachments arrived correctly

---

## Phase 4.5 — Confirmation Receipt

Status: COMPLETE

Completed:

* On-screen success receipt shown after successful backend confirmation
* Confirmation ID displayed
* Submitted date and time displayed
* Customer name displayed
* Phone displayed
* Email displayed
* Preferred contact method displayed
* Boat year displayed
* Boat make displayed
* Boat model displayed
* Selected service displayed
* Project description displayed
* Number of attached photos displayed
* Print / Save Receipt control
* Submit Another Request control
* Return Home control
* Responsive receipt layout
* Receipt only appears after backend confirms successful submission

## Phase 4.6 — Customer Confirmation Email

Status: NOT STARTED

Planned:

If the customer supplies an email address:

* Send customer confirmation email
* Include Mary's Marine Canvas branding
* Include confirmation ID
* Include submitted project details
* Include date/time
* Include customer receipt information
* Keep Mary's internal quote email separate from the customer's confirmation email

---

# Phase 5 — Backend & Security Hardening

Status: NOT STARTED

## Phase 5.1 — Production Backend Architecture

Status: NOT STARTED

Planned:

* Decide final backend hosting provider
* Confirm whether the frontend remains on GitHub Pages
* Confirm production frontend/backend architecture
* Confirm supported Node.js runtime
* Define the production API URL

---

## Phase 5.2 — Production Environment Variables

Status: NOT STARTED

Planned:

* Configure production EMAIL_USER
* Configure production EMAIL_APP_PASSWORD
* Configure production QUOTE_RECIPIENT
* Configure production FRONTEND_ORIGIN
* Configure PORT if required by the host
* Verify production secrets are not stored in GitHub
* Verify server/.env remains ignored

---

## Phase 5.3 — Production CORS Configuration

Status: NOT STARTED

Planned:

* Add the exact production frontend origin
* Remove unnecessary development origins where appropriate
* Test valid production frontend requests
* Test blocked unauthorized origins
* Avoid unnecessary wildcard CORS access

---

## Phase 5.4 — Request & Upload Limits

Status: NOT STARTED

Planned:

* Verify maximum 6-photo limit
* Verify maximum 8 MB per photo
* Verify maximum 20 MB total photo size
* Configure overall request-size limits
* Test oversized individual files
* Test too many uploaded files
* Test oversized total requests
* Verify oversized requests fail safely

---

## Phase 5.5 — Rate Limiting Review

Status: NOT STARTED

Planned:

* Review current quote submission rate limit
* Test repeated submissions
* Confirm legitimate customers are not blocked too aggressively
* Confirm repeated automated submissions are throttled
* Review proxy settings if required by the production host
* Verify customer-friendly rate-limit errors

---

## Phase 5.6 — Spam Protection Review

Status: NOT STARTED

Planned:

* Test honeypot behavior
* Confirm honeypot submissions do not send email
* Review whether the current honeypot is sufficient
* Consider timing-based spam checks if needed
* Consider CAPTCHA only if real spam becomes a problem

---

## Phase 5.7 — Upload Security Review

Status: NOT STARTED

Planned:

* Re-test file signature validation
* Verify allowed MIME types
* Reject unsupported file formats
* Reject disguised non-image files
* Confirm filenames cannot control server paths
* Confirm uploaded files are not stored permanently unless needed
* Review safe email attachment handling

---

## Phase 5.8 — Error Handling & Information Exposure

Status: NOT STARTED

Planned:

* Review backend error responses
* Prevent stack traces from reaching customers
* Prevent credentials or environment variables from appearing in errors
* Keep useful server-side error logging
* Test email delivery failure
* Test upload failure
* Test validation failure
* Test unexpected backend failure

---

## Phase 5.9 — Final Security Audit

Status: NOT STARTED

Planned:

* Run npm audit
* Review production dependencies
* Review Helmet configuration
* Review CORS configuration
* Review rate limiting
* Review spam protection
* Review upload validation
* Review environment variables
* Verify HTTPS requirements
* Verify frontend code contains no secrets
* Verify the GitHub repository contains no passwords or .env files

Important:

GitHub Pages cannot run the Node.js backend.

The frontend may remain on GitHub Pages while the backend is hosted separately.

---

# Phase 6 — Mobile & Performance

Status: NOT STARTED

## Phase 6.1 — iPhone Testing

Status: NOT STARTED

Planned:

* Test homepage
* Test Work / Portfolio page
* Test Services page
* Test About page
* Test Contact page
* Test mobile navigation
* Test safe-area behavior
* Test portrait and landscape layouts

---

## Phase 6.2 — Android Testing

Status: NOT STARTED

Planned:

* Test page layouts
* Test mobile navigation
* Test buttons and links
* Test scrolling behavior
* Test portfolio interactions
* Test Contact page behavior

---

## Phase 6.3 — Tablet Testing

Status: NOT STARTED

Planned:

* Test portrait layout
* Test landscape layout
* Test navigation
* Test card grids
* Test portfolio modal
* Test Contact page layout
* Review spacing between mobile and desktop breakpoints

---

## Phase 6.4 — Quote Form Mobile Testing

Status: NOT STARTED

Planned:

* Test all quote fields on mobile
* Test validation messages
* Test preferred contact controls
* Test photo picker
* Test photo previews
* Test photo removal
* Test submit button behavior
* Test success receipt on mobile

---

## Phase 6.5 — Gallery & Navigation Mobile Testing

Status: NOT STARTED

Planned:

* Test portfolio swipe behavior
* Test project modal
* Test previous / next image controls
* Test thumbnails
* Test before / after controls
* Test hamburger navigation
* Test back-to-top behavior

---

## Phase 6.6 — Image Optimization

Status: NOT STARTED

Planned:

* Add Mary's real project photographs when available
* Replace remaining image placeholders
* Resize oversized images
* Compress images
* Convert appropriate images to WebP
* Consider AVIF where useful
* Preserve acceptable image quality

---

## Phase 6.7 — Lazy Loading & Performance Testing

Status: NOT STARTED

Planned:

* Lazy-load below-the-fold images
* Avoid lazy-loading critical hero imagery
* Review font loading
* Review JavaScript loading
* Review CSS loading
* Check unnecessary network requests
* Run Lighthouse or equivalent performance testing
* Fix major loading-speed problems

---

## Phase 6.8 — Final Responsive Polish

Status: NOT STARTED

Planned:

* Fix horizontal overflow
* Fix awkward text wrapping
* Fix inconsistent spacing
* Fix image crops
* Fix button widths
* Fix mobile typography
* Review all responsive breakpoints
* Verify no page requires horizontal scrolling

---

# Phase 7 — SEO

Status: NOT STARTED

## Phase 7.1 — Final Page Titles

Status: NOT STARTED

Planned:

* Finalize homepage title
* Finalize Work page title
* Finalize Services page title
* Finalize About page title
* Finalize Contact page title
* Ensure every title is unique and descriptive

---

## Phase 7.2 — Meta Descriptions

Status: NOT STARTED

Planned:

* Homepage meta description
* Work page meta description
* Services page meta description
* About page meta description
* Contact page meta description
* Keep all descriptions factual

---

## Phase 7.3 — Open Graph & Social Sharing

Status: NOT STARTED

Planned:

* Add Open Graph titles
* Add Open Graph descriptions
* Add Open Graph image
* Add Open Graph URLs
* Add relevant social sharing metadata
* Test shared-link previews

---

## Phase 7.4 — sitemap.xml

Status: NOT STARTED

Planned:

* Add homepage
* Add Work page
* Add Services page
* Add About page
* Add Contact page
* Use production URLs
* Validate sitemap syntax

---

## Phase 7.5 — robots.txt

Status: NOT STARTED

Planned:

* Allow intended public pages to be crawled
* Reference sitemap.xml
* Verify important pages are not accidentally blocked
* Avoid exposing private backend routes unnecessarily

---

## Phase 7.6 — Structured Business Data

Status: NOT STARTED

Planned:

* Add verified business name
* Add verified phone number
* Add verified email address
* Add final website URL
* Add verified service information where appropriate
* Do not invent address, service area, hours, reviews, ratings, or certifications

---

## Phase 7.7 — Canonical URLs

Status: NOT STARTED

Planned:

* Confirm final production domain
* Add canonical URL to every public page
* Verify canonical URLs match the production site
* Remove any localhost URLs from production metadata

---

## Phase 7.8 — Google Search Console & Indexing

Status: NOT STARTED

Planned:

* Prepare Google Search Console
* Verify site ownership
* Submit sitemap
* Request indexing when production is ready
* Review indexing status
* Investigate crawl or indexing errors

---

## Phase 7.9 — Favicon & Final Branding Assets

Status: NOT STARTED

Planned:

* Add finalized favicon
* Add MMC logo when a usable logo asset is available
* Add social sharing image
* Verify browser tab appearance
* Verify final branding assets load correctly

---

# Phase 8 — Accessibility & Final QA

Status: NOT STARTED

## Phase 8.1 — Keyboard Navigation Testing

Status: NOT STARTED

Planned:

* Test the entire site without a mouse
* Test header navigation
* Test mobile menu
* Test buttons and links
* Test portfolio controls
* Test quote form

---

## Phase 8.2 — Focus State Testing

Status: NOT STARTED

Planned:

* Verify visible focus indicators
* Test navigation links
* Test buttons
* Test form fields
* Test portfolio controls
* Test modal controls

---

## Phase 8.3 — Form Accessibility

Status: NOT STARTED

Planned:

* Verify form labels
* Verify required field communication
* Verify validation error associations
* Verify aria-invalid behavior
* Verify status messages
* Verify photo upload controls
* Verify receipt controls

---

## Phase 8.4 — Modal & Gallery Accessibility

Status: NOT STARTED

Planned:

* Verify Escape closes modal
* Verify previous / next controls
* Verify accessible button labels
* Review focus behavior
* Review screen reader behavior
* Verify modal does not require touch-only gestures

---

## Phase 8.5 — Screen Reader & Image Accessibility

Status: NOT STARTED

Planned:

* Review page heading structure
* Review accessible labels
* Review image alt text
* Mark decorative images appropriately
* Review project image descriptions
* Review before / after descriptions

---

## Phase 8.6 — Color & Contrast

Status: NOT STARTED

Planned:

* Verify body text contrast
* Verify muted text contrast
* Verify button contrast
* Verify validation error contrast
* Verify link visibility
* Verify text over images

---

## Phase 8.7 — Reduced Motion

Status: NOT STARTED

Planned:

* Test prefers-reduced-motion
* Reduce or disable reveal animations appropriately
* Verify navigation remains functional
* Verify portfolio remains functional
* Verify no feature depends on animation

---

## Phase 8.8 — Broken Links & Navigation QA

Status: NOT STARTED

Planned:

* Test main navigation
* Test footer links
* Test CTA links
* Test page anchors
* Test phone links
* Test email links
* Test Request a Quote links
* Test Return Home links

---

## Phase 8.9 — Full Functional & Cross-Browser QA

Status: NOT STARTED

Planned:

* Test Chrome
* Test Edge
* Test Safari
* Test Firefox
* Test all pages
* Test portfolio filters
* Test gallery and modal
* Test before / after
* Test mobile menu
* Test quote success flow
* Test quote validation failures
* Test backend failure behavior
* Test upload failures
* Test receipt
* Test customer confirmation email
* Check browser console for unexpected errors

---

# Phase 9 — Production Deployment

Status: NOT STARTED

## Phase 9.1 — Frontend Deployment

Status: NOT STARTED

Planned:

* Prepare GitHub Pages
* Verify repository deployment settings
* Verify production file paths
* Verify HTML loads
* Verify CSS loads
* Verify JavaScript loads
* Verify images and assets load

---

## Phase 9.2 — Backend Deployment

Status: NOT STARTED

Planned:

* Deploy Node.js backend
* Configure production Node runtime
* Configure production environment variables
* Verify server starts successfully
* Verify /api/health
* Review production logs

---

## Phase 9.3 — Production API Connection

Status: NOT STARTED

Planned:

* Replace localhost API URL
* Add production API URL
* Update CSP connect-src
* Verify frontend can reach backend
* Verify quote submission works from the deployed frontend

---

## Phase 9.4 — Production Environment Variables

Status: NOT STARTED

Planned:

* Verify EMAIL_USER
* Verify EMAIL_APP_PASSWORD
* Verify QUOTE_RECIPIENT
* Verify FRONTEND_ORIGIN
* Verify PORT if required
* Verify no production secret is present in public files

---

## Phase 9.5 — Production CORS & HTTPS

Status: NOT STARTED

Planned:

* Configure final production frontend origin
* Verify valid production requests
* Verify blocked unauthorized origins
* Verify frontend uses HTTPS
* Verify backend uses HTTPS
* Confirm no mixed-content warnings

---

## Phase 9.6 — Production Email Delivery Test

Status: NOT STARTED

Planned:

* Submit a real production quote
* Confirm backend accepts the request
* Confirm Mary receives the email
* Confirm submitted information is correct
* Confirm customer confirmation email

---

## Phase 9.7 — Production Upload Test

Status: NOT STARTED

Planned:

* Test one photo
* Test multiple photos
* Verify attachments arrive correctly
* Verify invalid files are rejected
* Verify size limits
* Verify photo count limit

---

## Phase 9.8 — Production Receipt & Security Check

Status: NOT STARTED

Planned:

* Verify confirmation receipt
* Verify confirmation ID
* Verify Print / Save Receipt
* Verify Submit Another Request
* Verify Return Home
* Verify no secrets are exposed
* Run npm audit
* Verify CSP
* Verify security headers

---

## Phase 9.9 — Final Launch Smoke Test

Status: NOT STARTED

Planned:

* Test homepage
* Test Work page
* Test Services page
* Test About page
* Test Contact page
* Test desktop navigation
* Test mobile navigation
* Test portfolio
* Test quote system
* Test email delivery
* Check broken links
* Check browser console errors
* Test at least one real mobile device
* Configure custom domain later if desired

---

# Phase 10 — Maintenance

Status: FUTURE / ONGOING

## Phase 10.1 — Portfolio Updates

Status: FUTURE / ONGOING

Planned:

* Add new portfolio projects
* Add new project photography
* Add before / after images where useful
* Update project descriptions
* Remove outdated portfolio content when appropriate

---

## Phase 10.2 — Service & Business Information Updates

Status: FUTURE / ONGOING

Planned:

* Update confirmed services
* Update service descriptions
* Update service imagery
* Maintain phone number
* Maintain email address
* Update business information only when verified

---

## Phase 10.3 — Quote System Monitoring

Status: FUTURE / ONGOING

Planned:

* Periodically submit a test quote
* Verify Mary continues receiving emails
* Verify attachments
* Verify confirmation receipts
* Verify customer confirmation emails
* Review spam levels
* Adjust rate limiting if necessary

---

## Phase 10.4 — Dependency Maintenance

Status: FUTURE / ONGOING

Planned:

* Run npm audit periodically
* Review dependency updates
* Install security updates
* Review breaking changes before major upgrades
* Avoid blindly using npm audit fix --force

---

## Phase 10.5 — Broken Link & Content Checks

Status: FUTURE / ONGOING

Planned:

* Check navigation links
* Check footer links
* Check phone links
* Check email links
* Check CTA links
* Confirm business information remains accurate

---

## Phase 10.6 — Performance Monitoring

Status: FUTURE / ONGOING

Planned:

* Review page speed after new content is added
* Review new image sizes
* Optimize new project photography
* Watch for unnecessary script growth
* Watch for unnecessary asset growth

---

## Phase 10.7 — SEO Maintenance

Status: FUTURE / ONGOING

Planned:

* Update sitemap when pages change
* Review Google Search Console
* Investigate indexing issues
* Fix crawl errors
* Update metadata when page content changes

---

## Phase 10.8 — Security Maintenance

Status: FUTURE / ONGOING

Planned:

* Review dependencies
* Review environment variables
* Review backend logs when needed
* Monitor abuse patterns
* Review upload restrictions
* Maintain HTTPS
* Rotate credentials if compromise is suspected

---

## Phase 10.9 — Periodic Full Site QA

Status: FUTURE / ONGOING

Planned:

* Test all pages
* Test desktop layouts
* Test mobile layouts
* Test navigation
* Test quote form
* Test photo uploads
* Test portfolio gallery
* Test browser compatibility
* Confirm contact information
* Check browser console errors

---

# Current Exact Stopping Point

Current development focus:

Phase 4.4 — Secure Backend & Email Delivery

The backend has been created and npm audit reports 0 vulnerabilities.

The next action is:

Obtain the Gmail App Password for:

[MMCUPHOLSTERY@GMAIL.COM](mailto:MMCUPHOLSTERY@GMAIL.COM)

Then configure:

server/.env

After that:

1. Start backend
2. Verify API health
3. Submit first real quote
4. Confirm email delivery
5. Confirm photo attachments
6. Begin Phase 4.5 receipt system

---

# Chat Organization

The project will use separate ChatGPT conversations to prevent very long conversations from becoming difficult to maintain.

Planned chats:

## MMC — Master Roadmap & Project Status

Purpose:

* Overall roadmap
* Phase tracking
* Major decisions
* PROJECT-STATUS.md updates
* Deciding what should be worked on next

---

## MMC — Home Page

Primary files:

* index.html
* css/home.css
* js/home.js

Purpose:

* Homepage-specific design and functionality

---

## MMC — Work / Portfolio Page

Primary files:

* pages/work.html
* css/work.css
* js/work.js
* js/projects.js

Purpose:

* Portfolio
* Projects
* Filters
* Galleries
* Modals
* Before / after
* Real project photography

---

## MMC — Services Page

Primary files:

* pages/services.html
* css/services.css
* js/services.js

Purpose:

* Services content
* Service layout
* Service-specific responsive behavior

---

## MMC — About Page

Primary files:

* pages/about.html
* css/about.css
* js/about.js

Purpose:

* Business story
* About content
* Business credibility sections

---

## MMC — Contact & Quote Backend

Primary files:

* pages/contact.html
* css/contact.css
* js/contact.js
* server/server.js
* server/package.json
* server/.env

Purpose:

* Quote form
* Validation
* Photo uploads
* Email delivery
* Backend
* Receipts
* Customer confirmations
* Quote-specific security

---

## MMC — Shared Website Code

Primary files:

* css/style.css
* css/skeleton.css
* js/script.js
* js/skeleton.js

Purpose:

* Header
* Footer
* Navigation
* Mobile menu
* Shared animations
* Shared responsive behavior
* Site-wide styling

---

## MMC — Deployment, Security & SEO

Purpose:

* GitHub Pages
* Backend hosting
* Production security
* CSP
* HTTPS
* SEO
* Sitemap
* Robots
* Search indexing
* Final deployment

---

# Chat Responsibility Rule

When an issue clearly belongs to another area:

* diagnose the problem
* identify which chat owns the affected file
* continue the actual modification in the correct chat

Examples:

Homepage-only issue → Home Page chat

Portfolio issue → Work / Portfolio chat

Quote form issue → Contact & Quote Backend chat

Header or global navigation issue → Shared Website Code chat

Overall roadmap question → Master Roadmap chat

Deployment issue → Deployment, Security & SEO chat

This prevents multiple chats from independently changing the same files.

---

# Source of Truth Rule

PROJECT-STATUS.md is the authoritative project-progress record.

When an important feature, phase, architecture decision, or deployment change is completed, this file should be updated.

Individual chats should not invent a different roadmap.

When starting a new project chat, use PROJECT-STATUS.md to establish the current project state.