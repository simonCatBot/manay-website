# Security Headers Documentation

## Overview

This document outlines the security measures implemented on the Manay website.

## Content Security Policy (CSP)

### Current CSP Implementation

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; 
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdnjs.cloudflare.com https://fonts.googleapis.com; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; 
  font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; 
  img-src 'self' data: https:; 
  connect-src 'self' https://formspree.io; 
  frame-src 'none'; 
  object-src 'none';">
```

### Policy Breakdown

| Directive | Value | Purpose |
|-------------|-------|---------|
| `default-src` | `'self'` | Default to same-origin only |
| `script-src` | `'self'`, `'unsafe-inline'`, Google Analytics, CDN | Allowed script sources |
| `style-src` | `'self'`, `'unsafe-inline'`, Fonts, CDN | Allowed style sources |
| `font-src` | `'self'`, Google Fonts, CDN | Allowed font sources |
| `img-src` | `'self'`, `data:`, `https:` | Allowed image sources |
| `connect-src` | `'self'`, Formspree | Allowed fetch/XHR destinations |
| `frame-src` | `'none'` | No iframes allowed |
| `object-src` | `'none'` | No plugins (Flash, etc.) |

### Recommendations for Production

1. **Remove 'unsafe-inline' for scripts**: Once all inline scripts are externalized
2. **Add nonce or hash**: For inline styles that can't be moved
3. **Implement report-uri**: For monitoring CSP violations
4. **Stricter img-src**: Consider limiting to specific domains

## Recommended Server-Side Headers

### For Apache (.htaccess)

```apache
# Security Headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

# Remove server version banner
ServerTokens Prod
ServerSignature Off
```

### For Nginx

```nginx
# Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# Remove server version
server_tokens off;
```

### For GitHub Pages

GitHub Pages automatically sets these headers:
- `X-Frame-Options: deny`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`

You can only control headers via the CSP meta tag.

## Header Descriptions

### X-Frame-Options
Prevents clickjacking attacks by controlling iframe embedding.
- **Value**: `SAMEORIGIN` - Only allow framing from same origin
- **Alternative**: `DENY` - Completely deny framing

### X-Content-Type-Options
Prevents MIME type sniffing.
- **Value**: `nosniff` - Browser must respect Content-Type header

### Referrer-Policy
Controls referrer information sent with requests.
- **Value**: `strict-origin-when-cross-origin` - Minimal referrer info

### Permissions-Policy
Controls browser features/APIs availability.
- **Value**: `geolocation=(), microphone=(), camera=()` - Disable by default

### X-XSS-Protection
Legacy XSS protection (superseded by CSP but good for older browsers).
- **Value**: `1; mode=block` - Enable and block on detection

### Strict-Transport-Security (HSTS)
Enforces HTTPS connections.
- **Value**: `max-age=31536000; includeSubDomains` - 1 year, all subdomains

## Security Checklist

- [x] Content Security Policy (CSP) implemented
- [x] No inline event handlers (onclick should be refactored)
- [x] External scripts loaded from trusted CDNs only
- [x] Form submissions use HTTPS (Formspree)
- [x] Input validation on client and server side
- [x] No sensitive data in HTML/JS
- [x] HTTPS enforced for all resources

## Vulnerability Scanning Tools

Recommended tools for testing:

1. **Mozilla Observatory**: https://observatory.mozilla.org/
2. **Security Headers**: https://securityheaders.com/
3. **CSP Evaluator**: https://csp-evaluator.withgoogle.com/
4. **SSL Labs**: https://www.ssllabs.com/ssltest/

## Cookie Security

For cookies (when implemented server-side):

```
Set-Cookie: name=value; Secure; HttpOnly; SameSite=Strict
```

- **Secure**: Only transmitted over HTTPS
- **HttpOnly**: Not accessible via JavaScript
- **SameSite=Strict**: Prevents CSRF attacks

## Contact

For security concerns, contact: security@manay.in