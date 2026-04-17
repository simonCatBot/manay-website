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

// 1. GOOGLE ANALYTICS — Should be commented out on ALL pages
console.log('\n📡 Google Analytics');
const gaPages = ['index.html', 'privacy-policy.html', 'terms-of-service.html', 'pricing.html'];
for (const page of gaPages) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readHTML(page);
    const hasLiveGA = html.clean.includes('googletagmanager.com/gtag/js');
    assert(!hasLiveGA, `${page}: No live GA_MEASUREMENT_ID script`);
}

// 2. TERMINOLOGY — "Tenant" not "Renter" in user-visible text
console.log('\n📝 Terminology (Tenant vs Renter)');
const allPages = ['index.html', 'pricing.html', 'privacy-policy.html', 'terms-of-service.html'];
for (const page of allPages) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readHTML(page);
    const bodyContent = html.raw.replace(/<script[\s\S]*?<\/script>/gi, '');
    assert(!bodyContent.includes('For Renters'), `${page}: No "For Renters" in visible text`);
    assert(!bodyContent.includes('Join Renter'), `${page}: No "Join Renter" in visible text`);
}

// CIBIL check
console.log('\n🏦 Credit Terminology (no CIBIL in visible text)');
for (const page of allPages) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readHTML(page);
    const bodyNoScript = html.raw.replace(/<script[\s\S]*?<\/script>/gi, '');
    assert(!bodyNoScript.includes('CIBIL'), `${page}: No "CIBIL" in visible text`);
}

// 3. FAVICON — All pages reference proper favicon files
console.log('\n🖼️  Favicon');
for (const page of allPages) {
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
const htmlFiles = allPages.filter(f => fs.existsSync(path.join(ROOT, f)));
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
assert(indexHtml.includes('Content-Security-Policy'), 'index.html: Has CSP meta tag');
for (const page of ['privacy-policy.html', 'terms-of-service.html']) {
    if (!fs.existsSync(path.join(ROOT, page))) continue;
    const html = readHTML(page);
    assert(html.clean.includes('Cookie Consent') || html.clean.includes('cookie-banner') || html.raw.includes('cookieBanner'),
        `${page}: Has cookie consent or privacy notice`);
}

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