# Manay Website Deployment Checklist

## Repository Status
- Branch: master
- Last Commit: Complete website overhaul: Production-ready features
- Commit Hash: 2c81407

## Files Ready for Deployment

### Core Files
- [x] index.html - Main landing page with all enhancements
- [x] styles.css - Source CSS with new features
- [x] styles.min.css - Minified CSS (30KB)
- [x] script.js - Source JavaScript
- [x] script.min.js - Minified JS (15KB)

### SEO & Discovery
- [x] robots.txt - Crawler directives
- [x] sitemap.xml - Site structure for search engines

### Legal & Compliance
- [x] privacy-policy.html - GDPR/privacy compliant policy
- [x] terms-of-service.html - Full terms of service
- [x] SECURITY.md - Security documentation

### Configuration
- [x] CSP meta tag implemented
- [x] JSON-LD structured data added
- [x] Open Graph meta tags present
- [x] Google Analytics placeholder ready

## Deployment Steps

### 1. Push to GitHub
```bash
git push origin master
```

### 2. Verify GitHub Pages
- Check Settings > Pages > Source is set to main/master branch
- Custom domain: (optional) Add CNAME file

### 3. Configure Formspree (REQUIRED)
1. Visit https://formspree.io
2. Sign up for free account
3. Create a new form
4. Copy the form endpoint URL
5. Update index.html line with your form ID:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
6. Update the action in the HTML file

### 4. Configure Google Analytics (OPTIONAL)
1. Create GA4 property at https://analytics.google.com
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Replace GA_MEASUREMENT_ID in index.html:
   ```html
   gtag('config', 'G-XXXXXXXXXX');
   ```

### 5. Verify Deployment
- [ ] Homepage loads correctly
- [ ] Privacy Policy page accessible
- [ ] Terms of Service page accessible
- [ ] Form submission works
- [ ] All links functional
- [ ] Mobile responsive
- [ ] Cookie banner appears

## Post-Deployment Testing

### Functionality
- [ ] Form submission to Formspree
- [ ] Cookie consent save/restore
- [ ] Mobile menu toggle
- [ ] Smooth scrolling
- [ ] Page loader animation

### SEO
- [ ] Structured data validates (test at search.google.com/test/rich-results)
- [ ] Sitemap submitted to Google Search Console
- [ ] Robots.txt accessible

### Performance
- [ ] Lighthouse score >= 90
- [ ] Minified assets loading
- [ ] Preconnect hints working

### Security
- [ ] CSP no violations in console
- [ ] HTTPS enforced
- [ ] No mixed content warnings

## Live Website URL
https://simoncatbot.github.io/manay-website/

## Contact
- General: hello@manay.in
- Legal: legal@manay.in
- Privacy: privacy@manay.in
- Security: security@manay.in
