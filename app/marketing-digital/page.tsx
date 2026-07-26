import InternalPage, { ServicePage } from "../../components/InternalPage";
const page: ServicePage = {
  eyebrow:"HOLA, SOMOS IDEAMOS", title:"Estrategias digitales que potencian leads y ventas",
  intro:"Un solo equipo para atraer y convertir: Ads, SEO, contenido, analítica y landings específicas.",
  sectionTitle:"Growth para Pymes: atraé, convertí y escalá",
  sectionCopy:"Analizamos tu negocio, definimos los canales más rentables y diseñamos un plan a medida para enfocar la inversión en lo que realmente impulsa resultados.",
  items:[
    ["Diagnóstico profundo","Entendemos tu empresa, rentabilidad, embudo de ventas y oportunidades antes de proponer acciones."],
    ["Estrategia clara","Elegimos los canales más rentables y priorizamos oportunidades rápidas sin venderte cosas que no necesitás."],
    ["Ejecución precisa","Creamos campañas y contenidos alineados a tu negocio, optimizados desde el primer día."],
    ["Optimización continua","Medimos lo que importa, corregimos y escalamos lo que funciona con reportes claros."],
  ],
  darkTitle:"Marketing que trabaja para objetivos comerciales",
  darkCopy:"Google Ads, SEO, contenido y redes sociales articulados para generar consultas reales, no solamente likes.",
};
export default function Page(){return <InternalPage page={page}/>;}
