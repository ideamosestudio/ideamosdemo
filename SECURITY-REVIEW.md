# Security and performance review — 2026-10-01

Scope: ideamos.com.ar, ideamosestudio/ideamosdemo. The frontend is a Next.js static export hosted on GitHub Pages. The contact service is https://mailer.ideamos.com.ar/send.php and must be audited separately.

## Changes

- Updated Next.js and eslint-config-next from 16.3.5 to 16.3.8. npm audit reports zero known vulnerabilities after the update (previously one critical advisory, GHSA-vcvr-r3jv-pc5j). The advisory concerns next/og with attacker-controlled SVG; this static site does not expose that server feature.
- Fixed GitHub Actions to verified commit SHAs, disabled dependency lifecycle scripts, scoped Pages write/OIDC permissions to deployment, added build/deploy timeouts, and require lint, type checking and output tests before publishing. Existing weekly Dependabot dependency updates are preserved; Actions review is now weekly.
- Added a baseline HTML CSP: same-origin base URLs, no embedded objects, form destinations restricted to this site and its mailer, upgrade insecure requests. This is deliberately a partial CSP: it does not restrict scripts or prevent framing. GitHub Pages HTTP headers need an edge/server configuration for frame-ancestors, HSTS and nosniff; adding .htaccess or _headers to a Pages export would not implement those headers.
- The form requires a JSON response with ok:true before showing success, preserving errors and user input for HTML/proxy responses or ok:false. Page URL tracking omits query parameters and fragments. Existing honeypot, cooldown, length limits, duplicate prevention and timeout remain in place, but browser-only checks are not server-side security controls.
- Converted the full Gilroy ExtraBold and Poppins 600 font files to WOFF2 with no subsetting: 206472 to 76244 bytes combined (63.1% smaller before HTTP compression). Rendering and responsive checks are required. Existing video policies, motion, content and hero preload are preserved.
- The 404 page now renders its navigation without JavaScript while keeping existing redirects.

## OWASP Top 10:2025 applicability

| Risk | Current control / remaining verification |
| --- | --- |
| A01 Access control | No frontend accounts/admin API. Hosting, mailer permissions and server-side origin handling await SSH. |
| A02 Misconfiguration | HTTPS forced in Pages; deployment permissions and baseline CSP improved. HTTP security headers and mailer configuration remain separate work. |
| A03 Supply chain | Pinned packages/Actions, audit gate, weekly update PRs; updates still require review. |
| A04 Cryptography | Public HTTPS in use. Hosting keys, SMTP TLS and server secrets await inspection. |
| A05 Injection | React escaping and escaped structured JSON in source. PHP input validation, email header injection and output escaping await inspection. |
| A06 Insecure design | Static frontend reduces exposed server features. Rate limiting, spam prevention and replay controls must be verified on the mailer. |
| A07 Authentication | No application login. Hosting/GitHub account MFA and key policies are account-level controls not verified here. |
| A08 Integrity | npm lockfile and pinned CI actions; deployment gated by checks. |
| A09 Logging/alerting | CI audit failures are visible in Actions. Mailer rejection/error logging and operational alert routing remain unverified. |
| A10 Exceptional conditions | Frontend rejects non-JSON/non-success responses and has timeout/retry feedback. Mail server failure handling remains unverified. |

## Hosting follow-up

SSH key was generated locally and the user authorized its public key in cPanel. Connection to ideamosc@mon06.servidoraweb.net:9022 reached the server but returned publickey authentication failure. Hosting support needs to verify Jailed Shell and authorized key access. Never add the private key to the repository.

An empty POST to the mailer returned HTTP 400 JSON with ok:false and missing_fields, and Cloudflare marked it DYNAMIC. A HEAD error response was cacheable and marked HIT; this is not proof that POST submissions are cached. Check no-store response headers and cache bypass for the mail endpoint once access is available. No test email was sent.

PageSpeed API returned HTTP 429 quota exceeded; no current PageSpeed score or score improvement is claimed. Local build, audit and browser checks do not constitute an exhaustive penetration test or security certification.

Reference: https://top10.owasp.org/2025/
