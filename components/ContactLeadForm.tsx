"use client";

import { FormEvent, useState } from "react";

const FORM_ENDPOINT = "https://mailer.ideamos.com.ar/send.php";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
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
      <label>Nombre<input required type="text" name="nombre" placeholder="Tu nombre" autoComplete="name"/></label>
      <label>Empresa<input type="text" name="empresa" placeholder="Nombre de tu empresa" autoComplete="organization"/></label>
    </div>
    <div>
      <label>Email<input required type="email" name="email" placeholder="nombre@empresa.com" autoComplete="email"/></label>
      <label>Teléfono<input required type="tel" name="telefono" placeholder="+54" autoComplete="tel"/></label>
    </div>
    <label>Mensaje<textarea required name="mensaje" rows={4} placeholder="Contanos brevemente sobre tu proyecto"/></label>
    <button className="contact-submit" type="submit" disabled={status === "sending"}>
      {status === "sending" ? "Enviando..." : "Enviar consulta"}
    </button>
    <div className={`contact-form-status is-${status}`} role="status" aria-live="polite">
      {status === "success" && "¡Gracias! Recibimos tu consulta y te responderemos a la brevedad."}
      {status === "error" && "No pudimos enviar la consulta. Intentá nuevamente o escribinos por WhatsApp."}
    </div>
  </form>;
}
