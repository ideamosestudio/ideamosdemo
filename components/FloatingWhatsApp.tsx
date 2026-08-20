import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar a Ideamos por WhatsApp"
    >
      <span className="floating-whatsapp__label" aria-hidden="true">¿Hablamos?</span>
      <img src={asset("/icons/whatsapp-floating.svg")} alt="" aria-hidden="true" />
    </a>
  );
}
