# Manay WhatsApp Strategy & Implementation Plan

## Strategic Pivot: WhatsApp as Startup Engine + Notification Tool

**Core positioning:** WhatsApp is NOT the product. It's the **acquisition channel** and **notification layer**. The product lives on the web. WhatsApp gets people in the door and keeps them engaged.

This is the CRED/Razorpay model — WhatsApp for conversations and notifications, web/app for the actual product experience.

---

## The 7 Plays

### Play 1: WhatsApp Flows for In-WhatsApp Onboarding

WhatsApp Flows (launched 2024) builds mini-screens *inside* WhatsApp. No external links. No leaving the app. Native feel.

**What to build as Flows:**
- Property setup (type, area, rent, deposit)
- Tenant onboarding (Aadhaar upload, PAN, bank details)
- Agreement review (view terms, accept/reject)
- Payment confirmation screens
- Maintenance request forms

**What stays as external links:**
- UPI mandate setup (bank regulation — must be external)
- Aadhaar e-sign (regulation — must be external)
- Kaveri 2.0 filing (government portal)

**Impact:** 60% of the "broken flow" problem goes away. Users stay in WhatsApp for most actions.

**Implementation:**
- Build Flows via Interakt or Gupshup BSP (visual Flow builder)
- Each Flow triggers webhooks to your backend
- State tracked per-user in PostgreSQL
- ~2-3 weeks to build core Flows

---

### Play 2: Credit Score Building as the Viral Hook

**The insight:** Tenants in Bangalore desperately want credit score improvement. It's the path to home loans. "Pay rent on time → build credit" is something tenants will *tell their landlords about*.

**Flip the acquisition model:**
- Competitors acquire landlords first, tenants are passive
- Manay acquires tenants first, tenants bring landlords
- Tenant says: "I want to pay rent through Manay so I build my credit score"
- Landlord adopts because the tenant asks for it

**Website additions:**
- Credit score estimator tool on homepage ("See how much your rent could boost your score")
- Tenant-focused hero messaging: "Your rent payments deserve to count"
- Shareable credit projection: "In 12 months, your score could go from 650 → 750"

**WhatsApp integration:**
- Monthly credit score update sent via WhatsApp
- "Your on-time payment was reported to credit bureaus ✅"
- Shareable milestone: "3 months of on-time rent! 🎉 Share with your landlord"

**Why this works:**
- Tenants have zero tools to build credit from rent — Manay is the only option
- Landlords don't care about credit scores; tenants *do*
- Creates organic word-of-mouth among tenants
- Tenants are the ones searching online, reading guides, joining communities

---

### Play 3: Cold Outreach on the 2-Month Deposit Cap

**The pitch (5 seconds):**
> *"Hi! With Karnataka's 2026 rental law, deposits are now capped at 2 months' rent. Need help adjusting existing agreements and staying compliant? Reply MANAY."*

**Why it works:**
- Legal compliance creates *urgency* — this isn't optional
- Every landlord in Bangalore is confused about the new law
- Manay positioned as the compliance expert, not just a payment tool
- WhatsApp reply = instant lead

**Execution:**
- Source landlord phone numbers from RWA contacts, society directories, NoBroker listings
- Send via WhatsApp broadcast (marketing template, ~₹0.70/conversation)
- Chatbot handles the response flow automatically
- Route hot leads to human for agreement setup

**Scale:**
- 100 messages/day = ~₹70/day
- 5-10% reply rate (compliance urgency is high)
- 5-10 new landlord conversations per day

**Legal note:** WhatsApp marketing messages require opt-in under Indian DPDPA. Use CTWA ads (Click-to-WhatsApp) as the compliant acquisition path instead of cold messaging if you want to be safe. Or get opt-in via the website waitlist first, then message them.

---

### Play 4: RWA Partnerships (Not Individual Landlords)

**The math:**
- 1 RWA = 200-500 apartments
- 3 RWAs = 600-1,500 potential users
- vs. acquiring 600 landlords one by one

**The pitch to RWAs:**
> *"Karnataka's 2026 rental law requires all agreements to be registered on Kaveri 2.0 within 60 days. Non-compliance = penalties. We'll audit your society's rental agreements for free and provide compliance certificates for all compliant units."*

**What Manay gives the RWA:**
- Free compliance audit for all rental units in the society
- "Manay Compliant Society" badge for the RWA notice board
- Priority support for society members
- Revenue share: ₹50-100 per agreement completed via Manay

**What Manay gets:**
- Bulk user acquisition (entire society at once)
- Trust signal (RWA endorsement)
- Content (RWA case studies for marketing)

**Target areas:** Koramangala, HSR Layout, Indiranagar, BTM Layout — high density of rental apartments, tech-savvy tenants.

**Timeline:** 3-5 RWA pilots in first 3 months.

---

### Play 5: Landlord Compliance Certificate

**The product:** A sharable digital badge:
> *"This property is 2026 Karnataka Rent Law Compliant — Verified by Manay"*

**How it spreads:**
- Landlord gets compliant → Manay issues certificate
- Landlord adds badge to NoBroker listing, WhatsApp status, society notice board
- Every listing in Bangalore becomes free advertising for Manay
- Tenants see the badge → trust the landlord → search for "Manay"

**Implementation:**
- Unique URL per property: `manay.in/verified/PROP-XXXX`
- OG image with property details + Manay branding
- Embeddable badge HTML for NoBroker/custom websites
- WhatsApp-shareable card image

**Cost:** Near-zero. It's a database record + image generation.

**Impact:** Network effects. More compliant properties = more visibility = more landlords want the badge.

---

### Play 6: WhatsApp Group Per Property

**The structure:**
- Group: "Manay — [Property Address]"
- Members: Landlord + Tenant + Manay Bot
- Bot posts: payment confirmations, reminders, receipt links, maintenance updates

**Why this works:**
- Both parties see everything — no "he said / she said"
- Payment history is in the group chat (searchable)
- Maintenance requests are logged (with photos)
- Agreement updates are posted publicly
- Dispute resolution has a clear record

**WhatsApp Business API supports this:**
- Bot can create groups via API
- Bot can send messages to groups
- Bot can post scheduled updates (rent reminders, receipts)

**Privacy consideration:** Landlord and tenant can see each other's phone numbers in a WhatsApp group. Alternative: use broadcast lists instead (one-way from Manay, each user gets individual messages).

**Recommendation:** Start with individual chats + broadcast lists. Graduate to groups only when users request it.

---

### Play 7: Concierge MVP Before Automation

**The rule:** Do it manually 50 times before building the bot.

**Month 1-2: You are the bot.**
- 10 landlords onboarded manually via WhatsApp
- You handle every conversation personally
- You send reminders manually
- You generate receipts manually
- You file Kaveri 2.0 manually

**What you learn:**
- Exact conversation paths (what do landlords actually ask?)
- Edge cases (payment failures, disputes, early termination)
- Time per user (is this 15 min/month or 2 hours/month?)
- What can be automated vs. what needs human judgment
- Pricing validation (what are landlords actually willing to pay?)

**Month 3-4: Automate the 70%.**
- Build chatbot flows for the common paths you've seen
- Keep human intervention for edge cases
- Start with Interakt's no-code chatbot builder

**Month 5+: Scale.**
- Chatbot handles routine interactions
- Human handles escalations only
- You have real data on cost-per-user and time-per-user

**Why this matters:**
If you build the bot first, you'll guess what users need. If you do it manually first, you'll *know*. Every successful WhatsApp business started this way.

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
1. Set up WhatsApp Business API via Interakt (BSP)
2. Build 3 core WhatsApp Flows: property setup, tenant onboarding, agreement review
3. Build backend webhook handler (Node.js/FastAPI)
4. Set up PostgreSQL schema (users, properties, payments, agreements)
5. Do concierge onboarding with first 5 landlords manually
6. Add credit score estimator to website

### Phase 2: Core Operations (Weeks 5-8)
7. Integrate Razorpay for UPI mandates + payment links
8. Integrate Digio for e-sign + e-stamp
9. Build reminder/receipt scheduler (cron jobs)
10. Build HRA receipt generator (PDF)
11. Start RWA outreach (3 societies)
12. Build compliance certificate system

### Phase 3: Growth Loops (Weeks 9-12)
13. Launch credit score reporting partnership (CRIF/Experian)
14. Tenant referral program ("Share with your landlord")
15. Compliance certificate badges on listings
16. WhatsApp broadcast for monthly law updates
17. Web dashboard for landlords (payment history, property views)

### Phase 4: Transition (Months 4-8)
18. Web dashboard becomes primary product view
19. WhatsApp = notifications + conversations only
20. Begin native app development
21. Scale RWA partnerships to 10-15 societies

---

## Cost Model

| Item | Setup | Monthly |
|------|-------|---------|
| Interakt BSP | ₹0 | ₹5,000 - ₹10,000 |
| WhatsApp conversations (first 1K free) | ₹0 | ₹0 - ₹500 |
| AWS hosting | ₹0 | ₹3,000 - ₹5,000 |
| Razorpay | ₹0 | 2% per transaction |
| Digio e-sign | ₹0 | ₹25-40 per agreement |
| Domain + email | ₹1,000 | ₹100 |
| **Total** | **₹1,000** | **₹8,100 - ₹15,600** |

~₹50K-₹1L for 6 months. Very lean.

---

## Success Metrics

| Metric | Month 1 | Month 3 | Month 6 |
|--------|---------|---------|---------|
| WhatsApp conversations started | 50 | 300 | 1,000 |
| Landlords onboarded | 5 | 30 | 150 |
| Active rental agreements | 3 | 20 | 100 |
| UPI mandates set up | 3 | 18 | 80 |
| RWA partnerships | 0 | 2 | 5 |
| Monthly rent collected (via Manay) | ₹75K | ₹5L | ₹25L |
| Revenue (Manay fees) | ~₹0 | ~₹2K | ~₹15K |

Note: Revenue starts low because early bird pricing is intentionally vague. The first 6 months are about learning and trust, not revenue.

---

*This is a strategy document. Technical implementation requires separate engineering sprints.*