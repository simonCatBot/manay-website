# Testing Documentation

Comprehensive testing suite for the Manay website.

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific test suites
npm run test:html          # HTML validation
npm run test:css           # CSS linting
npm run test:js            # JavaScript linting
npm run test:accessibility # Accessibility testing
npm run test:links         # Link checking
npm run lighthouse         # Performance audit
```

---

## Test Suites

### 1. HTML Validation (`npm run test:html`)

Uses [html-validate](https://html-validate.org/) to check for:
- Valid HTML5 structure
- Proper nesting of elements
- Valid attributes and values
- Accessibility requirements (lang, viewport, etc.)
- Semantic HTML usage

**Configuration:** `.htmlvalidate.json`

### 2. CSS Linting (`npm run test:css`)

Uses [Stylelint](https://stylelint.io/) to check for:
- Syntax errors
- Invalid property values
- Duplicate selectors
- Browser compatibility
- Best practices

**Configuration:** `.stylelintrc.json`

### 3. JavaScript Linting (`npm run test:js`)

Uses [ESLint](https://eslint.org/) to check for:
- Syntax errors
- Undefined variables
- Best practices
- Potential security issues

**Configuration:** `eslint.config.js`

### 4. Accessibility Testing (`npm run test:accessibility`)

Uses [Pa11y](https://pa11y.org/) to check WCAG 2.1 AA compliance:
- Color contrast ratios
- Alt text on images
- ARIA usage
- Keyboard navigation
- Form labels
- Focus management

**Configuration:** `.pa11y-ci.json`

### 5. Performance Audit (`npm run lighthouse`)

Uses [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) to audit:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- Accessibility score
- SEO score
- Best practices score

**Configuration:** `lighthouserc.json`

---

## GitHub Actions CI/CD

Tests run automatically on:
- Every push to `main` or `master`
- Every pull request to `main` or `master`

### CI Jobs

1. **HTML Validation** - Validates all HTML files
2. **CSS Linting** - Lints stylesheets
3. **JS Linting** - Lints JavaScript
4. **Accessibility Testing** - Runs Pa11y accessibility tests
5. **Lighthouse CI** - Performance and best practices audit
6. **Security Headers Check** - Validates CSP and security headers

---

## Manual Testing Checklist

### Security

- [ ] CSP header is present in `<head>`
- [ ] No `unsafe-inline` in `script-src`
- [ ] `base-uri 'self'` is set
- [ ] `form-action` is restricted
- [ ] Honeypot field is hidden from users
- [ ] Form submits successfully with honeypot empty

### Performance

- [ ] Resources are preloaded (check Network tab in DevTools)
- [ ] Fonts load asynchronously
- [ ] No render-blocking resources
- [ ] CSS containment is applied to cards
- [ ] Smooth scroll on mobile devices

### Accessibility

- [ ] All images have alt text
- [ ] Form inputs have associated labels
- [ ] Focus indicators are visible
- [ ] Skip links work correctly
- [ ] Keyboard navigation works
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader announces form errors

### Responsive Design

- [ ] Mobile menu opens/closes correctly
- [ ] Touch targets are 44px minimum
- [ ] Layout adapts to all screen sizes
- [ ] No horizontal scroll on mobile
- [ ] Font sizes are readable on all devices

### Functionality

- [ ] Hero toggle switches content
- [ ] Section toggles work correctly
- [ ] Form validation works
- [ ] Toast notifications appear
- [ ] Back to top button works
- [ ] Smooth scroll to sections works

---

## Test Reports

Reports are generated as artifacts in GitHub Actions:
- `accessibility-report/` - Pa11y results
- `lighthouse-results/` - Lighthouse reports

---

## Troubleshooting

### Pa11y fails with timeout

```bash
# Increase timeout
export PA11Y_TIMEOUT=60000
npm run test:accessibility
```

### Lighthouse fails locally

```bash
# Start a local server
python3 -m http.server 8080

# In another terminal
npm run lighthouse
```

### HTML validation errors

Check `.htmlvalidate.json` for rule configuration.

---

## Contributing

When adding new tests:
1. Update the relevant config file
2. Add test to the CI workflow
3. Document the test in this file
4. Update the checklist if needed
