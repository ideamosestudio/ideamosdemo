// The site key is public. The secret exists only on the mail server.
const SITE_KEY = "6LekONotAAAAAP5IIb7pExDh4C30Oy70ZTjT_naA";

type Recaptcha = { ready: (callback: () => void) => void; execute: (key: string, options: { action: string }) => Promise<string> };
declare global { interface Window { grecaptcha?: Recaptcha } }
let pending: Promise<Recaptcha> | undefined;
export function loadRecaptcha(): Promise<Recaptcha> {
  if (pending) return pending;
  pending = new Promise<Recaptcha>((resolve, reject) => {
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => fail(), 12000);
    function fail() { window.clearTimeout(timeout); script.remove(); pending = undefined; reject(new Error("Captcha unavailable")); }
    script.src = "https://www.google.com/recaptcha/api.js?render=" + SITE_KEY;
    script.async = true;
    script.onerror = fail;
    script.onload = () => {
      if (!window.grecaptcha) { fail(); return; }
      window.grecaptcha.ready(() => { window.clearTimeout(timeout); resolve(window.grecaptcha!); });
    };
    document.head.append(script);
  });
  return pending;
}
export async function getRecaptchaToken(): Promise<string> {
  const captcha = await loadRecaptcha();
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Captcha timeout")), 12000);
    captcha.execute(SITE_KEY, { action: "contact_submit" }).then(token => {
      window.clearTimeout(timeout);
      if (!token) reject(new Error("Empty captcha")); else resolve(token);
    }, error => { window.clearTimeout(timeout); reject(error); });
  });
}
