## 🔍 Content Coherence Audit

Thorough audit of all 7 pages for content contradictions, confusing language, and cross-page inconsistencies.

### 🔴 Contradictions Fixed

- **Kaveri 2.0 registration timeline**: "30 days" on for-landlords.html vs "60 days" everywhere else → standardized to **60 days** (2 places)
- **"Home Inspections" vs "Property Care Visits"**: Mixed terminology after PR #35 partial reframe → **Property Care Visits** everywhere (6 places across 5 files)
- **Karma perks "upgraded from Pro/Max"**: Ambiguous — sounds like Karma upgrades your plan → **"frequency upgrade beyond Pro/Max plan"** makes clear it's about visit frequency, not plan tier (6 places)

### 🟡 Coherence Improvements

- **Deposit Compliance Guard** on index.html read as tenant-facing ("you only pay what's legal") → reframed to neutral landlord perspective
- **Nav order inconsistent** (Pricing/Good Karma swapped on index.html and good-karma.html) → unified to: For Landlords → For Tenants → Pricing → Good Karma
- **Footer link order** on good-karma.html reordered to match nav
- **Duplicate +1 country codes** (USA & Canada both +1) → merged to single "+1 USA/Canada" entry
- **good-karma.html CSP header** different from other pages → aligned (cdn.jsdelivr.net → cdnjs, frame-ancestors → frame-src)
- **good-karma.html og:image** was relative path → fixed to absolute https://manay.in/og-image.svg
- **"Improve your behavior"** (Karma Alert section) → changed to "improve your rental habits" (less judgmental)
- **"Create Agreement" CTA** on pricing → "Learn More" (matches one-time purchase framing)
- **"Inspections are included"** in perks intro paragraph → "Property care visits are included"

### 🟢 Test Results

All **371 tests pass** (3 assertions updated for new terminology).

### Files Changed

- `index.html` — nav order, feature card, country codes, Deposit Guard wording
- `for-landlords.html` — Kaveri 30→60 days, Home Inspections→Property Care Visits
- `for-tenants.html` — Kaveri timeline added, Home Inspections→Property Care Visits
- `good-karma.html` — 15 fixes (section heading, hashtag, perks wording, CSP, og:image, nav/footer order, Alert wording)
- `pricing.html` — home inspections→property care visits (2x), CTA wording
- `tests/run_tests.js` — 3 test assertions updated for new terminology