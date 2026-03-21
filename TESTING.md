# Testing Guide for Manay Website

This guide provides comprehensive instructions for testing the Manay website locally and after deployment to GitHub Pages.

## Table of Contents

1. [Local Development Testing](#local-development-testing)
2. [Cross-Browser Compatibility](#cross-browser-compatibility)
3. [Mobile Responsiveness](#mobile-responsiveness)
4. [Form Testing](#form-testing)
5. [Performance Testing](#performance-testing)
6. [Accessibility Testing](#accessibility-testing)
7. [SEO Testing](#seo-testing)
8. [Post-Deployment Testing](#post-deployment-testing)
9. [Automated Testing](#automated-testing)

---

## Local Development Testing

### Prerequisites

- Node.js 16+ (optional, for advanced testing tools)
- Python 3.x (for simple HTTP server)
- Modern web browser with developer tools

### Setting Up Local Server

**Option 1: Python HTTP Server**
```bash
cd /home/simon/.openclaw/workspace-kapudev/manay-website
python3 -m http.server 8000
```
Visit: `http://localhost:8000`

**Option 2: Node.js HTTP Server**
```bash
cd /home/simon/.openclaw/workspace-kapudev/manay-website
npx http-server -p 8000
```

**Option 3: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### Testing Checklist

- [ ] Website loads without errors
- [ ] All CSS styles apply correctly
- [ ] JavaScript console shows no errors
- [ ] Navigation links work (smooth scrolling)
- [ ] Mobile menu toggles correctly
- [ ] Form validation works
- [ ] Hero section toggle switches views
- [ ] All sections are visible and styled
- [ ] No 404 errors in network tab

---

## Cross-Browser Compatibility

### Browsers to Test

| Browser | Version | Priority | Status |
|---------|---------|----------|--------|
| Chrome | Latest | 🔴 Critical | ⬜ Untested |
| Firefox | Latest | 🔴 Critical | ⬜ Untested |
| Safari | Latest | 🔴 Critical | ⬜ Untested |
| Edge | Latest | 🟡 Important | ⬜ Untested |
| Chrome Mobile | Android | 🔴 Critical | ⬜ Untested |
| Safari Mobile | iOS | 🔴 Critical | ⬜ Untested |

### Testing Steps

1. **Open website** in each browser
2. **Check console** for JavaScript errors
3. **Test all interactions**:
   - Toggle between landlord/renter views
   - Open/close mobile menu
   - Submit form (with validation errors and success)
   - Click all navigation links
4. **Verify CSS features**:
   - Gradients render correctly
   - Animations work smoothly
   - Flexbox/Grid layouts display properly
5. **Check font loading**: Verify Inter font loads correctly
6. **Test Font Awesome icons**: All icons should display

### Known Issues to Watch For

- **Safari**: CSS backdrop-filter support (add fallback)
- **Firefox**: Smooth scrolling behavior
- **Edge**: Font loading from Google Fonts

---

## Mobile Responsiveness

### Devices to Test

| Device | Screen Size | Priority | Status |
|--------|-------------|----------|--------|
| iPhone SE | 375x667 | 🔴 Critical | ⬜ Untested |
| iPhone 12/13 | 390x844 | 🔴 Critical | ⬜ Untested |
| iPhone 14 Pro Max | 430x932 | 🟡 Important | ⬜ Untested |
| Samsung Galaxy S21 | 360x800 | 🔴 Critical | ⬜ Untested |
| iPad Air | 820x1180 | 🟡 Important | ⬜ Untested |
| iPad Pro | 1024x1366 | 🟡 Important | ⬜ Untested |
| Desktop | 1920x1080 | 🔴 Critical | ⬜ Untested |

### Testing with Browser DevTools

**Chrome/Firefox/Edge:**
1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select device from dropdown
4. Refresh page

**Safari:**
1. Enable Developer Menu: Preferences → Advanced → Show Develop menu
2. Develop → Enter Responsive Design Mode

### Responsive Checklist

- [ ] **320px - Mobile Portrait**: Content fits without horizontal scroll
- [ ] **375px - iPhone SE**: All text readable, buttons tappable (44px+)
- [ ] **768px - Tablet Portrait**: Layout adapts, navigation works
- [ ] **1024px - Tablet Landscape**: Desktop features visible
- [ ] **1200px+ - Desktop**: Full layout with all features

### Specific Mobile Tests

1. **Touch Targets**: All buttons/links ≥ 44x44px
2. **Font Sizes**: Minimum 16px to prevent zoom on inputs
3. **Viewport**: No horizontal scrolling at any width
4. **Images**: Scale appropriately, maintain aspect ratio
5. **Navigation**: Mobile menu works smoothly
6. **Forms**: Inputs are easily tappable
7. **Performance**: Loads in <3s on 3G connection

---

## Form Testing

### Test Scenarios

#### 1. Field Validation

**Name Field:**
- [ ] Empty submission shows error
- [ ] Single character shows error
- [ ] Two characters accepted
- [ ] Special characters allowed (Nagaraj, José)
- [ ] Very long names handled gracefully

**Email Field:**
- [ ] Empty submission shows error
- [ ] Invalid format shows error (test: "notanemail", "@example.com", "user@")
- [ ] Valid email accepted (test: "user@example.com", "user.name+tag@example.co.in")
- [ ] Unicode emails work (if targeting international users)

**Phone Field:**
- [ ] Empty submission shows error
- [ ] Non-Indian numbers rejected (test: "1234567890", "12345")
- [ ] Valid Indian numbers accepted (test: "9876543210", "8123456789")
- [ ] +91 prefix handled (test: "+919876543210")
- [ ] Spaces and dashes handled (test: "98765 43210", "98765-43210")

**User Type Dropdown:**
- [ ] Empty submission shows error
- [ ] All options selectable
- [ ] Value submitted correctly

**Area Field:**
- [ ] Optional field (can be empty)
- [ ] Text input works
- [ ] Special characters handled

#### 2. Form Submission

**Success Case:**
1. Fill all required fields with valid data
2. Click "Get Early Access"
3. Verify:
   - [ ] Loading state appears
   - [ ] Success message shows
   - [ ] Form hides/disappears
   - [ ] Success icon displays
   - [ ] Message is clear and friendly

**Error Case:**
1. Submit with empty fields
2. Verify:
   - [ ] Error messages appear
   - [ ] Fields with errors highlighted
   - [ ] Error messages auto-dismiss after 5s
   - [ ] Form remains for correction

**Network Failure Simulation:**
1. Open DevTools → Network tab
2. Set "Online" to "Offline"
3. Submit form
4. Verify:
   - [ ] Appropriate error message shown
   - [ ] User can retry submission

### Form Security Testing

- [ ] **XSS Prevention**: Try entering `<script>alert('xss')</script>` in name field
- [ ] **SQL Injection**: Try entering SQL commands in fields
- [ ] **CSRF**: Verify CSRF token implementation (when backend added)
- [ ] **Rate Limiting**: Submit form rapidly multiple times
- [ ] **Spam Protection**: Verify CAPTCHA/reCAPTCHA (when implemented)

---

## Performance Testing

### Tools to Use

1. **Google Lighthouse** (in Chrome DevTools)
2. **WebPageTest** (webpagetest.org)
3. **GTmetrix** (gtmetrix.com)

### Lighthouse Testing Steps

1. Open DevTools → Lighthouse tab
2. Select categories:
   - [x] Performance
   - [x] Accessibility
   - [x] Best Practices
   - [x] SEO
3. Choose device: Mobile or Desktop
4. Click "Analyze page load"

### Performance Metrics to Achieve

| Metric | Target | Current (Est.) |
|--------|--------|----------------|
| Performance Score | >90 | ~72 |
| First Contentful Paint | <1.8s | ~2.1s |
| Largest Contentful Paint | <2.5s | ~3.2s |
| Cumulative Layout Shift | <0.1 | ~0.12 |
| First Input Delay | <100ms | ~85ms |
| Speed Index | <3.4s | ~3.8s |

### Manual Performance Tests

#### 1. Load Time Testing

**Fast Connection (WiFi):**
- [ ] Page loads in <2 seconds
- [ ] All images visible
- [ ] Fonts loaded and rendered
- [ ] JavaScript interactive

**Slow Connection (3G):**
- [ ] Use Chrome DevTools → Network → Throttling → Fast 3G
- [ ] Page loads in <5 seconds
- [ ] Content is visible while loading
- [ ] No layout shifts

#### 2. Asset Optimization

**CSS:**
- [ ] File size <50KB
- [ ] Minified in production
- [ ] No unused styles (use Coverage tab in DevTools)

**JavaScript:**
- [ ] File size <100KB
- [ ] Minified in production
- [ ] No console errors
- [ ] No unused code

**Fonts:**
- [ ] Only required weights loaded (300, 400, 500, 600, 700)
- [ ] Font-display: swap enabled
- [ ] Fallback fonts defined

#### 3. Caching Test

1. Load page once
2. Reload page (Ctrl+R)
3. Verify:
   - [ ] Static assets loaded from cache (200 OK from cache)
   - [ ] Page loads faster on second load
   - [ ] No unnecessary network requests

---

## Accessibility Testing

### Automated Tools

1. **Lighthouse** (Accessibility audit)
2. **axe DevTools** (browser extension)
3. **WAVE** (wave.webaim.org)

### Manual Testing Checklist

#### Keyboard Navigation

- [ ] **Tab Order**: Logical flow through interactive elements
- [ ] **Focus Indicators**: Visible focus ring on all focusable elements
- [ ] **Skip Links**: Can skip to main content (if implemented)
- [ ] **Escape Key**: Modal/menu closes with Escape
- [ ] **Enter/Space**: Buttons activate with both keys

Test this sequence:
1. Load page
2. Press Tab → Should focus on first interactive element
3. Continue tabbing through page
4. Verify all interactive elements are reachable
5. Press Shift+Tab to navigate backwards

#### Screen Reader Testing

**With NVDA (Windows) or VoiceOver (Mac):**

- [ ] **Page Title**: Announced correctly
- [ ] **Headings**: Proper hierarchy (H1 → H2 → H3)
- [ ] **Landmarks**: Nav, main, footer identified
- [ ] **Links**: Descriptive text (no "click here")
- [ ] **Buttons**: Clear purpose announced
- [ ] **Form Labels**: Fields properly labeled
- [ ] **Status Messages**: Success/errors announced

Test this sequence:
1. Start screen reader
2. Load page
3. Navigate with screen reader keys
4. Fill out form with screen reader
5. Submit form and verify message announced

#### Color and Contrast

- [ ] **Text Contrast**: All text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] **Color Independence**: Information not conveyed by color alone
- [ ] **Focus Contrast**: Focus indicators have sufficient contrast
- [ ] **Gradient Text**: Still readable over gradients

Use tool: **Color Contrast Analyzer** (desktop app)

#### Visual Impairments

**Low Vision:**
- [ ] Zoom to 200%: Layout still works
- [ ] Zoom to 400%: No horizontal scrolling
- [ ] High contrast mode: Content visible

**Color Blindness:**
- [ ] Use Chrome DevTools → Rendering → Emulate vision deficiencies
- [ ] Test with Deuteranopia, Protanopia, Tritanopia
- [ ] Verify no information lost

---

## SEO Testing

### On-Page SEO Checklist

- [ ] **Title Tag**: Unique, <60 chars, includes keywords
- [ ] **Meta Description**: Compelling, <160 chars
- [ ] **Headings**: Proper hierarchy with keywords
- [ ] **URL Structure**: Clean, descriptive URLs
- [ ] **Internal Links**: Logical linking structure
- [ ] **Image Alt Text**: All images have descriptive alt text
- [ ] **Schema Markup**: JSON-LD structured data added
- [ ] **Robots.txt**: File exists and configured
- [ ] **XML Sitemap**: Sitemap created and submitted
- [ ] **Canonical URLs**: Self-referencing canonical tags

### Technical SEO

- [ ] **Page Speed**: <3s load time
- [ ] **Mobile-Friendly**: Passes mobile usability test
- [ ] **HTTPS**: SSL certificate installed
- [ ] **404 Page**: Custom 404 page exists
- [ ] **Redirects**: No broken redirects
- [ ] **Structured Data**: No errors in structured data

### Tools to Use

1. **Google Search Console**: Submit sitemap, check indexing
2. **Bing Webmaster Tools**: Submit to Bing
3. **Google Mobile-Friendly Test**: Test mobile usability
4. **PageSpeed Insights**: Performance and SEO audit
5. **Rich Results Test**: Validate structured data

---

## Post-Deployment Testing

### After GitHub Pages Deployment

1. **Verify Deployment:**
   - [ ] Visit `https://<username>.github.io/<repository-name>/`
   - [ ] Page loads successfully
   - [ ] All assets load (CSS, JS, fonts, icons)
   - [ ] Console shows no errors

2. **Domain Configuration (if using custom domain):**
   - [ ] Custom domain loads site
   - [ ] HTTPS works (SSL certificate)
   - [ ] www and non-www both work
   - [ ] Redirects properly configured

3. **Cross-Origin Resource Sharing (CORS):**
   - [ ] Fonts load from Google Fonts
   - [ ] Icons load from Font Awesome
   - [ ] No CORS errors in console

4. **Form Endpoint (when implemented):**
   - [ ] Form submits to correct endpoint
   - [ ] Success/failure messages display
   - [ ] No 404 or 500 errors

5. **Analytics (when added):**
   - [ ] Google Analytics receives data
   - [ ] Page views tracking correctly
   - [ ] Events firing (form submissions, clicks)

### Continuous Monitoring

Set up monitoring for:

- [ ] **Uptime**: Use UptimeRobot or similar (alert if site down)
- [ ] **Performance**: Weekly Lighthouse audits
- [ ] **Broken Links**: Monthly link checking
- [ ] **SEO Rankings**: Track keyword positions
- [ ] **Form Submissions**: Monitor conversion rates

---

## Automated Testing

### Setting Up Automated Tests

**1. Install Testing Tools:**
```bash
cd manay-website
npm init -y
npm install --save-dev playwright lighthouse jest
```

**2. Create Test Scripts:**

Create `tests/e2e.test.js`:
```javascript
const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await expect(page).toHaveTitle(/Manay/);
});

test('form validation works', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await page.click('button[type="submit"]');
  // Check for error messages
});
```

**3. Add Test Scripts to package.json:**
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:lighthouse": "lighthouse http://localhost:8000 --output=json --output-path=./lighthouse-report.json",
    "test": "npm run test:e2e && npm run test:lighthouse"
  }
}
```

**4. Run Tests:**
```bash
# Run all tests
npm test

# Run only E2E tests
npm run test:e2e

# Generate Lighthouse report
npm run test:lighthouse
```

### CI/CD Integration

Add to `.github/workflows/test.yml`:
```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm test
```

---

## Testing Schedule

### Pre-Launch Testing

**Week 1:**
- [ ] Complete all local testing
- [ ] Fix all Priority 1 issues from VALIDATION_REPORT.md
- [ ] Cross-browser testing on Chrome, Firefox, Safari
- [ ] Mobile testing on iPhone and Android

**Week 2:**
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] SEO implementation
- [ ] Security headers added

**Week 3:**
- [ ] Deploy to staging environment
- [ ] User acceptance testing
- [ ] Load testing
- [ ] Final QA sign-off

### Post-Launch Monitoring

**Daily:**
- [ ] Check uptime
- [ ] Monitor form submissions
- [ ] Review error logs

**Weekly:**
- [ ] Performance audit
- [ ] Check broken links
- [ ] Review analytics

**Monthly:**
- [ ] Full Lighthouse audit
- [ ] Accessibility review
- [ ] SEO performance check
- [ ] Security scan

---

## Bug Reporting Template

When you find a bug, report it with this information:

```markdown
**Bug ID:** [Auto-increment]
**Title:** Brief description
**Severity:** 🔴 Critical / 🟡 Major / 🟢 Minor
**Environment:** Local / Staging / Production
**Browser:** Chrome/Firefox/Safari/Edge vXX
**Device:** Desktop/Mobile (iPhone/Android)
**URL:** Page URL

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**
What should happen

**Actual Result:**
What actually happens

**Screenshots:**
Attach screenshots

**Console Errors:**
Paste any console errors

**Network Errors:**
Paste any network errors
```

---

## Quick Test Command Reference

```bash
# Start local server
python3 -m http.server 8000

# Check HTML validation
# Upload file to: https://validator.w3.org/#validate_by_upload

# Check CSS validation
# Upload file to: https://jigsaw.w3.org/css-validator/

# Check broken links
# Use: https://www.brokenlinkcheck.com/

# Run Lighthouse
# Open DevTools → Lighthouse tab

# Check mobile-friendly
# Use: https://search.google.com/test/mobile-friendly

# Check SEO
# Use: https://pagespeed.web.dev/
```

---

## Success Criteria

The website is ready for production when:

- [ ] All Priority 1 issues from VALIDATION_REPORT.md are fixed
- [ ] Lighthouse Performance Score >90
- [ ] Lighthouse Accessibility Score >95
- [ ] Lighthouse SEO Score >95
- [ ] No JavaScript errors in console
- [ ] Works on Chrome, Firefox, Safari (latest)
- [ ] Works on iPhone and Android (latest)
- [ ] Form submissions work end-to-end
- [ ] Security headers implemented
- [ ] Analytics tracking configured
- [ ] Uptime monitoring active
- [ ] Team sign-off obtained

---

**Testing Guide Version:** 1.0  
**Last Updated:** March 21, 2026  
**Next Review:** After Priority 1 fixes are implemented