/**
 * MANAY WEBSITE — Integration & Verification Tests
 * Run: node tests/run_tests.js
 */

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
    if (condition) {
        passed++;
        console.log(`  ✅ ${message}`);
    } else {
        failed++;
        failures.push(message);
        console.log(`  ❌ ${message}`);
    }
}

function readFile(name) {
    return fs.readFileSync(path.join(ROOT, name), 'utf8');
}

function readHTML(name) {
    const content = readFile(name);
    const withoutComments = content.replace(/<!--[\s\S]*?-->/g, '');
    return { raw: content, clean: withoutComments };
}

console.log('\n🔍 MANAY WEBSITE VERIFICATION TESTS\n');
console.log('='.repeat(50));

const ALL_PAGES = ['index.html', 'pricing.html', 'privacy-policy.html', 'terms-of-service.html', 'for-landlords.html', 'for-tenants.html'];

// 1. GOOGLE ANALYTICS — Should be commented out on ALL pages
console.log('\n📡 Google Analytics');
const gaPages = ALL_PAGES;
for (const page of gaPages) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readHTML(page);
    const hasLiveGA = html.clean.includes('googletagmanager.com/gtag/js');
    assert(!hasLiveGA, `${page}: No live GA_MEASUREMENT_ID script`);
}

// 2. TERMINOLOGY — "Tenant" not "Renter" in user-visible text
console.log('\n📝 Terminology (Tenant vs Renter)');
for (const page of ALL_PAGES) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readHTML(page);
    const bodyContent = html.raw.replace(/<script[\s\S]*?<\/script>/gi, '');
    assert(!bodyContent.includes('For Renters'), `${page}: No "For Renters" in visible text`);
    assert(!bodyContent.includes('Join Renter'), `${page}: No "Join Renter" in visible text`);
}

// CIBIL check
console.log('\n🏦 Credit Terminology (no CIBIL in visible text)');
for (const page of ALL_PAGES) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readHTML(page);
    const bodyNoScript = html.raw.replace(/<script[\s\S]*?<\/script>/gi, '');
    assert(!bodyNoScript.includes('CIBIL'), `${page}: No "CIBIL" in visible text`);
}

// 3. FAVICON — All pages reference proper favicon files
console.log('\n🖼️  Favicon');
for (const page of ALL_PAGES) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readFile(page);
    assert(html.includes('favicon.svg'), `${page}: References favicon.svg`);
    assert(html.includes('apple-touch-icon.png'), `${page}: References apple-touch-icon.png`);
    assert(!html.includes('data:image/svg+xml'), `${page}: No emoji data URI favicon`);
}
assert(fs.existsSync(path.join(ROOT, 'favicon.svg')), 'favicon.svg exists');
assert(fs.existsSync(path.join(ROOT, 'favicon-32x32.png')), 'favicon-32x32.png exists');
assert(fs.existsSync(path.join(ROOT, 'favicon-16x16.png')), 'favicon-16x16.png exists');
assert(fs.existsSync(path.join(ROOT, 'apple-touch-icon.png')), 'apple-touch-icon.png exists');

// 4. STALE MINIFIED FILES — Should not exist
console.log('\n📦 Stale Assets');
assert(!fs.existsSync(path.join(ROOT, 'styles.min.css')), 'styles.min.css does NOT exist');
assert(!fs.existsSync(path.join(ROOT, 'script.min.js')), 'script.min.js does NOT exist');
for (const page of ['privacy-policy.html', 'terms-of-service.html']) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readFile(page);
    assert(html.includes('styles.css'), `${page}: References styles.css (not .min.css)`);
    assert(html.includes('script.js'), `${page}: References script.js (not .min.js)`);
}

// 5. JSON-LD — No specific prices
console.log('\n📊 Structured Data');
const indexHtml = readFile('index.html');
assert(!indexHtml.includes('"priceRange": "₹99 - ₹499"'), 'JSON-LD priceRange is not ₹99-₹499');
assert(indexHtml.includes('LocalBusiness'), 'JSON-LD LocalBusiness schema present');
assert(indexHtml.includes('Organization'), 'JSON-LD Organization schema present');

// Guide pages JSON-LD
const landlordHtml = readFile('for-landlords.html');
const tenantHtml = readFile('for-tenants.html');
assert(landlordHtml.includes('"@type": "WebPage"'), 'for-landlords.html: Has WebPage schema');
assert(tenantHtml.includes('"@type": "WebPage"'), 'for-tenants.html: Has WebPage schema');

// 6. JARGON — No "Zero-Chase Payments"
console.log('\n🔤 Plain Language');
const indexClean = readHTML('index.html').raw;
assert(indexClean.includes('Zero-Chase'), 'index.html: Keeps "Zero-Chase Payments" branding');
assert(!indexClean.includes('Automated Rent Collection'), 'index.html: Not using generic "Automated Rent Collection" (kept Zero-Chase)');

// 7. PHONE MOCKUP — No empty/broken stat values
console.log('\n📱 Phone Mockup Stats');
assert(!indexClean.includes('stat-value">-<'), 'No empty dash stat value');
assert(!indexClean.includes('stat-value">₹<'), 'No bare rupee symbol stat value');

// 8. LINK CONSISTENCY — All internal links resolve
console.log('\n🔗 Internal Links');
const htmlFiles = ALL_PAGES.filter(f => fs.existsSync(path.join(ROOT, f)));
const linkedPages = new Set();
for (const page of htmlFiles) {
    const html = readFile(page);
    const links = html.match(/href="([^"]+\.html[^"]*)"/g) || [];
    for (const link of links) {
        const href = link.replace(/href="/, '').replace(/"$/, '');
        const pageHref = href.split('#')[0].split('?')[0];
        if (pageHref && !pageHref.startsWith('http')) {
            linkedPages.add(pageHref);
        }
    }
}
for (const linked of linkedPages) {
    assert(fs.existsSync(path.join(ROOT, linked)), `Linked page exists: ${linked}`);
}

// 9. HTML VALIDITY — Basic structure checks
console.log('\n🏗️  HTML Structure');
for (const page of htmlFiles) {
    const html = readFile(page);
    assert(html.includes('<!DOCTYPE html>'), `${page}: Has DOCTYPE`);
    assert(html.includes('<meta name="viewport"'), `${page}: Has viewport meta`);
    assert(html.includes('lang="en"'), `${page}: Has lang attribute`);
    assert(html.includes('<main'), `${page}: Has main landmark`);
    assert(html.includes('<footer'), `${page}: Has footer`);
    assert(html.includes('skip-link') || html.includes('Skip to'), `${page}: Has skip link`);
}

// 10. CSP + Security
console.log('\n🔒 Security');
for (const page of ALL_PAGES) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readFile(page);
    assert(html.includes('Content-Security-Policy'), `${page}: Has CSP meta tag`);
}
for (const page of ['privacy-policy.html', 'terms-of-service.html']) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readHTML(page);
    assert(html.clean.includes('Cookie Consent') || html.clean.includes('cookie-banner') || html.raw.includes('cookieBanner'),
        `${page}: Has cookie consent or privacy notice`);
}

// 11. NAVIGATION — All pages have consistent nav links
console.log('\n🧭 Navigation');
for (const page of htmlFiles) {
    const html = readFile(page);
    // Should have links to guide pages and pricing
    assert(html.includes('for-landlords.html') || html.includes('#landlords'), `${page}: Links to landlord section/page`);
    assert(html.includes('for-tenants.html') || html.includes('#renters') || html.includes('#tenants'), `${page}: Links to tenant section/page`);
    assert(html.includes('pricing.html') || html.includes('#pricing'), `${page}: Links to pricing`);
}

// 12. GUIDE PAGES — Content quality checks
console.log('\n📖 Guide Page Content');
for (const page of ['for-landlords.html', 'for-tenants.html']) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readFile(page);
    // Should have guide-specific sections
    assert(html.includes('guide-hero'), `${page}: Has guide hero section`);
    assert(html.includes('icon-card-grid'), `${page}: Has icon card grid`);
    assert(html.includes('step-flow'), `${page}: Has step-by-step flow`);
    assert(html.includes('checklist-grid'), `${page}: Has checklist grid`);
    assert(html.includes('guide-cta'), `${page}: Has CTA section`);
    assert(html.includes('for-landlords.html'), `${page}: Links to landlord guide`);
    assert(html.includes('for-tenants.html'), `${page}: Links to tenant guide`);
    // Should reference Karnataka law specifics
    assert(html.includes('2-month') || html.includes('2 month') || html.includes('2 months'), `${page}: References 2-month deposit cap`);
    assert(html.includes('Kaveri 2.0') || html.includes('Kaveri'), `${page}: References Kaveri 2.0`);
}

// 13. GUIDE PAGES — No premium pricing shown
console.log('\n💰 No Hard Prices in Guides');
for (const page of ['for-landlords.html', 'for-tenants.html']) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readFile(page);
    // Should not contain specific plan prices
    assert(!html.includes('₹499'), `${page}: No ₹499 price`);
    assert(!html.includes('₹99'), `${page}: No ₹99 price`);
}

// 14. GUIDE PAGES — Print button
console.log('\n🖨️  Print / PDF Button');
for (const page of ['for-landlords.html', 'for-tenants.html']) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readFile(page);
    assert(html.includes('printChecklist'), `${page}: Has printChecklist function`);
    assert(html.includes('checklist-print-btn'), `${page}: Has print button`);
    assert(html.includes('fa-print'), `${page}: Has print icon`);
}

// 15. NAVIGATION — Home link consistency
console.log('\n🏠 Home Navigation');
for (const page of ALL_PAGES) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readFile(page);
    if (page === 'index.html') {
        // Homepage: logo links to itself
        assert(html.includes('index.html') || html.includes('href="#"'), `${page}: Has home link`);
    } else {
        // All other pages: must have a Home nav link
        assert(html.includes('>Home<'), `${page}: Has Home nav link`);
        // All pages: logo must link to index.html
        assert(html.includes('href="index.html"'), `${page}: Logo links to home`);
    }
}

// 16. GUIDE PAGES — Content structure depth
console.log('\n📋 Guide Page Structure');
for (const page of ['for-landlords.html', 'for-tenants.html']) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readFile(page);
    // Warning cards
    assert(html.includes('warning-card-grid'), `${page}: Has warning card grid`);
    assert(html.includes('warning-card__title'), `${page}: Has warning card titles`);
    // Legal tip
    assert(html.includes('legal-tip'), `${page}: Has legal tip section`);
    // Steps
    const stepCount = (html.match(/step-item__number/g) || []).length;
    assert(stepCount === 5, `${page}: Has 5 step items (found ${stepCount})`);
    // Checklist items
    const checklistCount = (html.match(/checklist-item/g) || []).length;
    // Each checklist-item appears in both __icon and __text spans
    const uniqueChecklistItems = (html.match(/checklist-item__text/g) || []).length;
    // Subtract 1 for the print button container text if present
    // Each checklist section has one extra match from the checklist grid wrapper
    const expectedLandlord = 10;
    const expectedTenant = 12;
    if (page === 'for-landlords.html') {
        assert(uniqueChecklistItems >= expectedLandlord, `${page}: Has at least ${expectedLandlord} checklist items (found ${uniqueChecklistItems})`);
    } else {
        assert(uniqueChecklistItems >= expectedTenant, `${page}: Has at least ${expectedTenant} checklist items (found ${uniqueChecklistItems})`);
    }
    // Icon cards
    assert(html.includes('icon-card-grid'), `${page}: Has icon card grid`);
    const iconCardCount = (html.match(/icon-card__title/g) || []).length;
    assert(iconCardCount >= 4, `${page}: Has at least 4 icon cards (found ${iconCardCount})`);
}

// 17. OG / META tags on guide pages
console.log('\n🏷️  SEO Meta Tags');
for (const page of ['for-landlords.html', 'for-tenants.html']) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readFile(page);
    assert(html.includes('og:title'), `${page}: Has og:title`);
    assert(html.includes('og:description'), `${page}: Has og:description`);
    assert(html.includes('og:image'), `${page}: Has og:image`);
    assert(html.includes('rel="canonical"'), `${page}: Has canonical URL`);
    assert(html.includes('meta name="description"'), `${page}: Has meta description`);
}

// 18. Pricing — Digital Agreement shows "Per agreement"
console.log('\n💳 Digital Agreement Pricing');
if (fs.existsSync(path.join(ROOT, 'pricing.html'))) {
    const pricingHtml = readFile('pricing.html');
    assert(pricingHtml.includes('Per agreement'), 'pricing.html: Digital Agreement shows "Per agreement"');
    assert(!pricingHtml.includes('₹499'), 'pricing.html: No ₹499 on Digital Agreement');
}

// 19. SITEMAP & ROBOTS.TXT — Updated for manay.in
console.log('\n🗺️  Sitemap & robots.txt');
assert(fs.existsSync(path.join(ROOT, 'sitemap.xml')), 'sitemap.xml exists');
assert(fs.existsSync(path.join(ROOT, 'robots.txt')), 'robots.txt exists');
if (fs.existsSync(path.join(ROOT, 'sitemap.xml'))) {
    const sitemap = readFile('sitemap.xml');
    // Should use manay.in, not GitHub Pages
    assert(sitemap.includes('manay.in'), 'sitemap.xml: Uses manay.in URLs');
    assert(!sitemap.includes('simoncatbot.github.io'), 'sitemap.xml: No GitHub Pages URLs');
    // Should include all 6 pages
    assert(sitemap.includes('pricing.html'), 'sitemap.xml: Includes pricing page');
    assert(sitemap.includes('for-landlords.html'), 'sitemap.xml: Includes landlord guide');
    assert(sitemap.includes('for-tenants.html'), 'sitemap.xml: Includes tenant guide');
    assert(sitemap.includes('privacy-policy.html'), 'sitemap.xml: Includes privacy policy');
    assert(sitemap.includes('terms-of-service.html'), 'sitemap.xml: Includes terms of service');
    assert(sitemap.includes('lastmod'), 'sitemap.xml: Has lastmod dates');
}
if (fs.existsSync(path.join(ROOT, 'robots.txt'))) {
    const robots = readFile('robots.txt');
    assert(robots.includes('manay.in'), 'robots.txt: References manay.in');
    assert(!robots.includes('simoncatbot.github.io'), 'robots.txt: No GitHub Pages URLs');
    assert(robots.includes('Sitemap:'), 'robots.txt: Has Sitemap directive');
}

// 20. FAQ SCHEMA — JSON-LD FAQPage on index.html
console.log('\n📋 FAQ Schema');
if (fs.existsSync(path.join(ROOT, 'index.html'))) {
    const index = readFile('index.html');
    assert(index.includes('"@type": "FAQPage"'), 'index.html: Has FAQPage schema');
    assert(index.includes('"@type": "Question"'), 'index.html: Has Question schema entries');
    assert(index.includes('"acceptedAnswer"'), 'index.html: Has acceptedAnswer entries');
    // Should have all 5 FAQ items
    const questionCount = (index.match(/"@type": "Question"/g) || []).length;
    assert(questionCount >= 5, `index.html: Has at least 5 FAQ questions (found ${questionCount})`);
    // FAQ schema should match visible FAQ content
    assert(index.includes('Zero-Chase'), 'index.html: FAQ schema includes Zero-Chase question');
    assert(index.includes('Digital Agreement'), 'index.html: FAQ schema includes Digital Agreement question');
    assert(index.includes('Karnataka'), 'index.html: FAQ schema includes Karnataka compliance question');
}

// 21. WHATSAPP CTA — Homepage has WhatsApp as primary CTA
console.log('\n💬 WhatsApp CTA');
if (fs.existsSync(path.join(ROOT, 'index.html'))) {
    const index = readFile('index.html');
    // WhatsApp CTA section
    assert(index.includes('whatsapp-cta'), 'index.html: Has WhatsApp CTA section');
    assert(index.includes('wa.me') || index.includes('whatsapp.com'), 'index.html: Has WhatsApp link');
    // Should have WhatsApp CTA heading
    assert(index.includes('whatsapp-cta-heading'), 'index.html: WhatsApp CTA has accessible heading');
    // Should have WhatsApp icon
    assert(index.includes('fa-whatsapp'), 'index.html: Has WhatsApp icon');
    // Waitlist still exists as secondary
    assert(index.includes('waitlist'), 'index.html: Waitlist still present as secondary CTA');
}

// 22. WHATSAPP PRODUCT FLOW — Chat bubble section showing conversation
console.log('\n🧩 WhatsApp Product Flow');
if (fs.existsSync(path.join(ROOT, 'index.html'))) {
    const index = readFile('index.html');
    // Product flow section
    assert(index.includes('whatsapp-flow'), 'index.html: Has WhatsApp flow section');
    assert(index.includes('chat-bubble'), 'index.html: Has chat bubble UI elements');
    assert(index.includes('chat-bubble--user'), 'index.html: Has user chat bubbles');
    assert(index.includes('chat-bubble--manay'), 'index.html: Has Manay chat bubbles');
    // Conversation content should mention key features
    assert(index.includes('Zero-Chase') || index.includes('Zero Chase'), 'index.html: Chat mentions Zero-Chase');
    assert(index.includes('UPI Mandate') || index.includes('UPI mandate'), 'index.html: Chat mentions UPI Mandate');
}

// 23. TRUST BADGES — Compliance trust section
console.log('\n🛡️  Trust Badges');
if (fs.existsSync(path.join(ROOT, 'index.html'))) {
    const index = readFile('index.html');
    // Trust badges section
    assert(index.includes('trust-badges'), 'index.html: Has trust badges section');
    assert(index.includes('trust-badge'), 'index.html: Has trust badge cards');
    // Should have the 3 specific badges
    assert(index.includes('trust-badge__icon--compliant'), 'index.html: Has compliance badge');
    assert(index.includes('trust-badge__icon--secure'), 'index.html: Has UPI secure badge');
    assert(index.includes('trust-badge__icon--verified'), 'index.html: Has verified/digital badge');
    // Badge content
    assert(index.includes('2026'), 'index.html: Trust badges mention 2026 law');
}

// 24. WHATSAPP CSS — Styles for new sections exist
console.log('\n🎨 WhatsApp & Trust Badge Styles');
const styles = readFile('styles.css');
// WhatsApp CTA styles
assert(styles.includes('.whatsapp-cta'), 'styles.css: Has WhatsApp CTA styles');
assert(styles.includes('.whatsapp-cta__button'), 'styles.css: Has WhatsApp button styles');
// WhatsApp flow styles
assert(styles.includes('.chat-bubble'), 'styles.css: Has chat bubble styles');
assert(styles.includes('.chat-bubble--user'), 'styles.css: Has user bubble styles');
assert(styles.includes('.chat-bubble--manay'), 'styles.css: Has Manay bubble styles');
// Trust badge styles
assert(styles.includes('.trust-badges'), 'styles.css: Has trust badges styles');
assert(styles.includes('.trust-badge'), 'styles.css: Has trust badge card styles');
// WhatsApp CTA should use WhatsApp green
assert(styles.includes('#25D366'), 'styles.css: Uses WhatsApp green (#25D366)');
// Chat bubble animations
assert(styles.includes('chatBubbleIn'), 'styles.css: Has chat bubble entrance animation');

// 25. STRATEGY DOCS — Key documents exist
console.log('\n📄 Strategy Documents');
assert(fs.existsSync(path.join(ROOT, 'GROWTH-ANALYSIS.md')), 'GROWTH-ANALYSIS.md exists');
assert(fs.existsSync(path.join(ROOT, 'WHATSAPP-MVP-ANALYSIS.md')), 'WHATSAPP-MVP-ANALYSIS.md exists');
assert(fs.existsSync(path.join(ROOT, 'WHATSAPP-STRATEGY.md')), 'WHATSAPP-STRATEGY.md exists');
if (fs.existsSync(path.join(ROOT, 'GROWTH-ANALYSIS.md'))) {
    const growth = readFile('GROWTH-ANALYSIS.md');
    assert(growth.includes('WhatsApp'), 'GROWTH-ANALYSIS.md: References WhatsApp strategy');
    assert(growth.includes('Phase 1'), 'GROWTH-ANALYSIS.md: Has Phase 1 plan');
}
if (fs.existsSync(path.join(ROOT, 'WHATSAPP-STRATEGY.md'))) {
    const strategy = readFile('WHATSAPP-STRATEGY.md');
    assert(strategy.includes('WhatsApp Flows'), 'WHATSAPP-STRATEGY.md: Covers WhatsApp Flows');
    assert(strategy.includes('credit score') || strategy.includes('Credit Score'), 'WHATSAPP-STRATEGY.md: Covers credit score hook');
    assert(strategy.includes('RWA'), 'WHATSAPP-STRATEGY.md: Covers RWA partnerships');
    assert(strategy.includes('concierge') || strategy.includes('Concierge'), 'WHATSAPP-STRATEGY.md: Covers concierge MVP');
}

// 26. Pricing Page — Hero matches site gradient
console.log('\n🎨 Pricing Page Consistency');
if (fs.existsSync(path.join(ROOT, 'pricing.html'))) {
    const pricing = readFile('pricing.html');
    // Hero should use indigo->purple->pink gradient like other pages
    assert(pricing.includes('#6366f1'), 'pricing.html: Hero uses indigo gradient');
    assert(pricing.includes('#ec4899'), 'pricing.html: Hero uses pink gradient');
    // Should have back-to-top button
    assert(pricing.includes('back-to-top'), 'pricing.html: Has back-to-top button');
    // Nav should NOT have inline styles on active link
    assert(!pricing.includes('style="color: var(--primary-color)"'), 'pricing.html: No inline style on nav active link');
    // Footer should not have inline-styled brand link
    assert(!pricing.includes('style="text-decoration: none; display: flex'), 'pricing.html: Footer brand uses consistent markup');
}

// 19. GUIDE PAGES — Color scheme uses CSS variables
console.log('\n🎨 Color Scheme Consistency');
const stylesContent = readFile('styles.css');
// Guide hero should use the main site's gradient (indigo->purple->pink)
assert(stylesContent.includes('#6366f1'), 'styles.css: Uses primary indigo color');
assert(stylesContent.includes('#8b5cf6'), 'styles.css: Uses purple accent');
assert(stylesContent.includes('#ec4899'), 'styles.css: Uses pink accent');
// Guide sections should NOT use Avinya's gold (#f59e0b) as primary
assert(!stylesContent.includes('background: #f59e0b'), 'styles.css: No gold backgrounds (amber used only as accent)');
// Warning cards should use red
assert(stylesContent.includes('#ef4444'), 'styles.css: Uses red for warning cards');

// RESULTS
console.log('\n' + '='.repeat(50));
console.log(`\n📊 RESULTS: ${passed} passed, ${failed} failed\n`);

if (failures.length > 0) {
    console.log('FAILURES:');
    failures.forEach(f => console.log(`  ❌ ${f}`));
    console.log('');
    process.exit(1);
} else {
    console.log('🎉 ALL TESTS PASSED!\n');
    process.exit(0);
}