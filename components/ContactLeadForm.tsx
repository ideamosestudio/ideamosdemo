"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const FORM_ENDPOINT = "https://mailer.ideamos.com.ar/send.php";
const MIN_COMPLETION_TIME_MS = 2_500;
const SUBMISSION_COOLDOWN_MS = 60_000;
const DUPLICATE_WINDOW_MS = 10 * 60_000;
const SUBMISSION_STORAGE_KEY = "ideamos.contact.recent-submission";

type FormStatus = "idle" | "sending" | "success" | "error";
type RecentSubmission = { fingerprint: string; submittedAt: number };

function fingerprint(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function getRecentSubmission(): RecentSubmission | null {
  try {
    const stored = window.localStorage.getItem(SUBMISSION_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<RecentSubmission>;
    if (typeof parsed.fingerprint !== "string" || typeof parsed.submittedAt !== "number") return null;
    return { fingerprint: parsed.fingerprint, submittedAt: parsed.submittedAt };
  } catch {
    return null;
  }
}

function saveRecentSubmission(submission: RecentSubmission) {
  try {
    window.localStorage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(submission));
  } catch {
    // Private browsing or strict storage settings must not block the form.
  }
}

export default function ContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const now = Date.now();
    const formData = new FormData(form);
    const honeypot = String(formData.get("_gotcha") ?? "").trim();

    // Silently accept bot-filled honeypots without contacting the mail server.
    if (honeypot) {
      form.reset();
      startedAt.current = now;
      setStatus("success");
      setFeedback("¡Gracias! Recibimos tu consulta y te responderemos a la brevedad.");
      return;
    }

    const elapsed = now - startedAt.current;
    if (elapsed < MIN_COMPLETION_TIME_MS) {
      setStatus("error");
      setFeedback("Esperá unos segundos y volvé a enviar la consulta.");
      return;
    }

    const payload = ["nombre", "empresa", "email", "telefono", "mensaje"]
      .map((field) => String(formData.get(field) ?? "").trim().toLowerCase())
      .join("\u001f");
    const payloadFingerprint = fingerprint(payload);
    const recentSubmission = getRecentSubmission();

    if (recentSubmission && now - recentSubmission.submittedAt < DUPLICATE_WINDOW_MS && recentSubmission.fingerprint === payloadFingerprint) {
      setStatus("success");
      setFeedback("Esta consulta ya fue enviada. Te responderemos a la brevedad.");
      return;
    }

    if (recentSubmission && now - recentSubmission.submittedAt < SUBMISSION_COOLDOWN_MS) {
      const seconds = Math.ceil((SUBMISSION_COOLDOWN_MS - (now - recentSubmission.submittedAt)) / 1_000);
      setStatus("error");
      setFeedback(`Esperá ${seconds} segundos antes de enviar otra consulta.`);
      return;
    }

    formData.set("_form_started_at", String(startedAt.current));
    formData.set("_form_elapsed_ms", String(elapsed));
    formData.set("_page_url", window.location.href);
    setStatus("sending");
    setFeedback("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Form submission failed");
      saveRecentSubmission({ fingerprint: payloadFingerprint, submittedAt: Date.now() });
      form.reset();
      startedAt.current = Date.now();
      setStatus("success");
      setFeedback("¡Gracias! Recibimos tu consulta y te responderemos a la brevedad.");
    } catch {
      setStatus("error");
      setFeedback("No pudimos enviar la consulta. Intentá nuevamente o escribinos por WhatsApp.");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return <form
    action={FORM_ENDPOINT}
    method="POST"
    onSubmit={handleSubmit}
    aria-busy={status === "sending"}
  >
    <input type="hidden" name="origen" value="Sitio web Ideamos" />
    <label className="contact-honeypot" aria-hidden="true">
      No completar
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
    </label>
    <div>
      <label>Nombre<input required minLength={2} maxLength={80} type="text" name="nombre" placeholder="Tu nombre" autoComplete="name"/></label>
      <label>Empresa<input maxLength={120} type="text" name="empresa" placeholder="Nombre de tu empresa" autoComplete="organization"/></label>
    </div>
    <div>
      <label>Email<input required maxLength={254} type="email" name="email" placeholder="nombre@empresa.com" autoComplete="email"/></label>
      <label>Teléfono<input required minLength={8} maxLength={30} pattern="[0-9+() -]{8,30}" type="tel" name="telefono" placeholder="+54" autoComplete="tel" inputMode="tel"/></label>
    </div>
    <label>Mensaje<textarea required minLength={20} maxLength={2000} name="mensaje" rows={4} placeholder="Contanos brevemente sobre tu proyecto"/></label>
    <button className="contact-submit" type="submit" disabled={status === "sending"}>
      {status === "sending" ? "Enviando..." : "Enviar consulta"}
    </button>
    <div className={`contact-form-status is-${status}`} role="status" aria-live="polite">
      {feedback}
    </div>
  </form>;
}
