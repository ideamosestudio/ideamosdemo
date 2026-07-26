import InternalPage, { ServicePage } from "../../components/InternalPage";
const page: ServicePage = {
  eyebrow:"POSICIONAMIENTO EN GOOGLE", title:"Escalá en Google y potenciá tus ventas hoy",
  intro:"Ponemos a tu empresa en los primeros puestos y hacemos que te encuentren cuando buscan las soluciones que ofrecés.",
  sectionTitle:"Elegí la estrategia adecuada: Google Ads, SEO o ambas",
  sectionCopy:"Las dos estrategias aumentan la visibilidad de tu web. Definimos cuál conviene según tus objetivos, presupuesto y horizonte de crecimiento.",
  items:[
    ["Resultados rápidos con Google Ads","Mostrá tu web en los primeros resultados y pagá solamente cuando una persona interesada hace clic."],
    ["Posicionamiento SEO duradero","Construí visibilidad orgánica, autoridad y tráfico de calidad sin pagar por cada visita."],
    ["Medición precisa","Rastreamos consultas, llamadas y conversiones para optimizar la inversión con datos concretos."],
    ["Google Maps","Optimizamos la ficha de tu negocio para que te encuentren en búsquedas locales y mapas."],
  ],
  darkTitle:"Dominá los resultados de búsqueda",
  darkCopy:"Combinamos demanda inmediata con posicionamiento orgánico para ocupar más espacio en Google y generar oportunidades sostenidas.",
};
export default function Page(){return <InternalPage page={page}/>;}
