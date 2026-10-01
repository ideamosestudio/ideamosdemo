# Contact reCAPTCHA deployment

The static frontend uses a public reCAPTCHA v3 site key in lib/recaptcha.ts. The private key must never be added to this repository or a NEXT_PUBLIC variable.

Production PHP endpoint: /home8/ideamosc/public_html/mailer.ideamos.com.ar/send.php.
Private directory (mode 700): /home8/ideamosc/.ideamos-recaptcha/.
Place verify.php and config.php (mode 600) there. config.php returns an array with the secret key under `secret`.

Deploy the frontend first, verify the public form generates a token, then atomically replace the PHP endpoint. Preserve an original backup outside public_html. No-token, invalid-token, wrong-hostname, wrong-action, stale-token, low-score, API-error and API-unavailable cases must not send mail. Verification uses contact_submit, an exact hostname allowlist and a starting score threshold of 0.5.

The endpoint uses no-store. A genuine token and replay rejection were tested without sending an email. Revisit the score threshold with actual traffic if legitimate visitors report rejection.
