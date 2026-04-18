# Good Karma — Feature Plan

## Concept

Good Karma is a **mutual reputation system** for rentals. Both tenants and landlords earn Karma points based on measurable behaviors. High Karma = perks. Low Karma = consequences. It's trust, quantified.

**Nobody in India does this.** This is Manay's most defensible differentiator.

---

## Why This Works

1. **Incentivizes good behavior** — tenants pay on time, maintain homes; landlords maintain properties, don't harass
2. **Information asymmetry killer** — currently tenants walk into rentals blind; landlords screen tenants one-way. Karma makes reputation two-way
3. **Network effect** — more users = more data = better signals = more value. Each Karma profile makes the system smarter
4. **Defensible** — requires transaction data (payments, inspections, disputes) that only Manay has
5. **Bangalore-specific** — with 2026 law compliance as a Karma factor, this is locked to Manay's legal positioning

---

## Karma Scoring Model

### Tenant Karma (0-100)

| Factor | Weight | How It's Measured | Points |
|--------|--------|-------------------|--------|
| **Payment Punctuality** | 35% | On-time rent payments via UPI mandate | 0-35 pts |
| **Home Upkeep** | 25% | Quarterly third-party inspection scores | 0-25 pts |
| **Lease Compliance** | 15% | No early termination,遵守 agreement terms | 0-15 pts |
| **Dispute Record** | 10% | No landlord disputes filed against tenant | 0-10 pts |
| **Duration Bonus** | 10% | Cumulative months of tenancy (loyalty) | 0-10 pts |
| **Community Score** | 5% | RWA/neighbor feedback (optional) | 0-5 pts |

**Scoring:**
- 90-100: 🟢 **Karma Gold** — top-tier tenant
- 70-89: 🟡 **Karma Silver** — reliable tenant
- 50-69: 🟠 **Karma Bronze** — average tenant
- Below 50: 🔴 **Karma Alert** — risk signals

### Landlord Karma (0-100)

| Factor | Weight | How It's Measured | Points |
|--------|--------|-------------------|--------|
| **Compliance** | 30% | 2026 law compliance (deposit cap, Kaveri 2.0, agreement) | 0-30 pts |
| **Maintenance** | 25% | Response time to repair requests, property condition | 0-25 pts |
| **Fair Practices** | 20% | No unjustified eviction, no illegal charges, deposit returned on time | 0-20 pts |
| **Inspection Score** | 15% | Property condition at quarterly inspection | 0-15 pts |
| **Tenant Satisfaction** | 10% | Exit survey ratings from tenants | 0-10 pts |

**Scoring:**
- 90-100: 🟢 **Karma Gold** — preferred landlord
- 70-89: 🟡 **Karma Silver** — good landlord
- 50-69: 🟠 **Karma Bronze** — average landlord
- Below 50: 🔴 **Karma Alert** — red flag landlord

---

## Karma Perks (What You Earn)

### Tenant Perks (by Karma Tier)

| Perk | Gold (90+) | Silver (70-89) | Bronze (50-69) |
|------|-----------|---------------|----------------|
| **Rent negotiation power** | Strong — show Karma to new landlord | Moderate | Weak |
| **Rent increase cap** | Landlord agrees to ≤5% annual increase | ≤8% | Market rate |
| **Priority listing access** | First to see new Manay listings | Second | Normal |
| **Deposit discount** | 1 month deposit (vs 2 month cap) | 1.5 months | 2 months (legal max) |
| **Manay subscription** | Free tenant plan | 50% off | Full price |
| **Credit score boost** | Maximum reporting weight | Standard | Minimum weight |

### Landlord Perks (by Karma Tier)

| Perk | Gold (90+) | Silver (70-89) | Bronze (50-69) |
|------|-----------|---------------|----------------|
| **Tenant attraction** | "Karma Gold Landlord" badge on listing | "Verified Landlord" | No badge |
| **Faster tenant matching** | Priority in Manay's matching queue | Standard | Deprioritized |
| **Manay subscription** | Free landlord plan | 50% off | Full price |
| **Dispute support** | Priority Rent Tribunal support | Standard | Basic |
| **RWA recognition** | "Compliant Landlord" certificate | Basic certificate | None |

---

## Quarterly Home Inspection Program

**The mechanism that makes Karma real.**

### How It Works
1. Manay schedules a third-party inspection every 3 months
2. Inspector visits property (30-45 min assessment)
3. Standard checklist: walls, plumbing, electrical, flooring, fixtures, appliances, cleanliness
4. Both landlord and tenant receive the report
5. Scores feed into Karma calculation
6. Disputes about condition are resolved with inspection data (not he-said/she-said)

### Inspection Checklist (what's scored)
- **Walls & Paint**: condition, damage, unauthorized modifications
- **Plumbing**: leaks, fixtures, water damage
- **Electrical**: switches, wiring safety, appliance condition
- **Flooring**: tiles, carpet, damage
- **Doors & Windows**: locks, hinges, glass condition
- **Cleanliness**: general upkeep, pest control
- **Safety**: fire extinguisher, smoke detector (if applicable)
- **Unauthorized changes**: structural modifications, additional occupants

### Scoring
- Each category: 1-5 stars
- Overall: weighted average
- Photos attached to report
- Both parties sign off (or dispute within 7 days)

### Who Does the Inspection?
- **Phase 1:** Manay team / verified partners (Bangalore home inspection services)
- **Phase 2:** Trained inspectors via Manay app
- **Phase 3:** Self-inspection with photo documentation + random audits

---

## Good Karma Page Structure

### Hero Section
- Gradient hero (matches site: indigo→purple→pink)
- Title: "Good Karma for Good Rentals"
- Subtitle: "Earn trust. Earn perks. The first mutual reputation system for Indian rentals."
- Badge/icon showing Karma score visual (circular gauge or star)

### How Karma Works (3-step flow)
1. **Live your rental right** — pay on time, maintain the home, follow the agreement
2. **Get verified quarterly** — third-party inspection scores your home upkeep
3. **Earn Karma, unlock perks** — rent discounts, priority access, lower deposits

### Tenant Karma Section
- Score breakdown card (6 factors with visual bars/progress)
- Perks table (Gold / Silver / Bronze)
- Example Karma profile (mockup)

### Landlord Karma Section
- Score breakdown card (5 factors)
- Perks table
- Why Karma matters for landlords ("Attract better tenants")

### Quarterly Inspection Section
- How it works (timeline: schedule → inspect → score → karma update)
- What's inspected (8-category grid with icons)
- Sample inspection report preview

### Karma Calculator (Interactive)
- Sliders for each factor
- Real-time Karma score calculation
- Shows which tier you'd reach
- "See what perks you'd unlock"

### Social Proof / CTA
- "Be among the first to earn Good Karma" 
- WhatsApp CTA + Waitlist
- "Karma Gold landlords get verified first"

---

## Design Principles

1. **Feels like a game, not a grade** — Karma should feel rewarding, not punitive
2. **Red for warnings, green for good** — consistent with main site's red warning cards
3. **No shaming** — low scores shown as "improving" not "bad"
4. **Both sides benefit** — tenant AND landlord karma, always paired
5. **Quantified but human** — scores with explanations, not just numbers
6. **Matches main site** — indigo→purple→pink gradients, same nav, same footer, same card styles

### Color Coding
- Karma Gold: #10b981 (emerald green) — achievement, premium
- Karma Silver: #8b5cf6 (purple, matches site) — solid, reliable
- Karma Bronze: #f59e0b (amber) — baseline, improving
- Karma Alert: #ef4444 (red, matches site warnings) — attention needed

---

## Implementation Plan

### Files to Create/Modify
1. **`good-karma.html`** — new page
2. **`styles.css`** — add Karma page styles
3. **`index.html`** — add nav link, hero mention
4. **`pricing.html`** — add Karma perks reference
5. **`for-landlords.html`** — add Karma landlord reference
6. **`for-tenants.html`** — add Karma tenant reference
7. **`sitemap.xml`** — add good-karma.html
8. **`tests/run_tests.js`** — add Karma page tests

### CSS Classes Needed
- `.karma-hero` — hero section
- `.karma-tier` — Gold/Silver/Bronze/Alert tier cards
- `.karma-factor` — individual scoring factor with progress bar
- `.karma-perks-table` — perks comparison
- `.karma-inspection` — inspection timeline
- `.karma-inspection-grid` — 8-category inspection checklist
- `.karma-calculator` — interactive calculator section
- `.karma-tier--gold`, `--silver`, `--bronze`, `--alert` — tier color variants

### Karma Calculator (JavaScript)
- Interactive sliders for each scoring factor
- Real-time score calculation with weighted formula
- Visual tier indicator that updates live
- Perks unlock display

---

*This is a planning document. Implementation follows.*