import InternalPage, { ServicePage } from "../../components/InternalPage";

const page: ServicePage = {
  eyebrow: "MÁS ESTRATEGIA, MÁS RESULTADOS",
  title: "Diseño web de alto impacto enfocado en resultados",
  intro: "Diseñamos sitios que impactan y convierten, ayudándote a atraer más clientes y aumentar tus ventas.",
  sectionTitle: "Creamos sitios web profesionales que atraen clientes y ventas",
  sectionCopy: "Creamos sitios web pensados para transmitir autoridad, confianza y generar contactos reales. Desde el diseño a medida hasta el contenido, todo está enfocado en convertir visitas en potenciales clientes.",
  items: [
    ["Tu marca proyectando confianza", "Un sitio bien presentado transmite seriedad y profesionalismo, y complementa toda tu comunicación digital."],
    ["Nuevo canal de ventas", "Tus clientes tienen un lugar siempre abierto para comprarte, consultarte o conocer mejor tu empresa."],
    ["Más visibilidad", "Vas a estar presente cuando tus clientes busquen en Google las soluciones que ofrecés."],
    ["Consultas 24 horas", "Mientras vos descansás, tu sitio sigue recibiendo mensajes, pedidos y oportunidades."],
  ],
  darkTitle: "Una web seria, rápida y preparada para crecer",
  darkCopy: "No es solo una web: es un espacio propio que impulsa ventas, confianza y visibilidad para tu empresa.",
};
export default function Page(){ return <InternalPage page={page}/>; }
