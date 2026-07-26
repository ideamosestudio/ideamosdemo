import InternalPage, { ServicePage } from "../../components/InternalPage";
const page: ServicePage = {
  eyebrow:"ECOMMERCE PROFESIONAL", title:"Vendé con tu tienda online. Fácil, profesional y sin comisiones",
  intro:"Diseñamos tu tienda con pagos integrados, carga de productos y todo listo para vender desde el día uno.",
  sectionTitle:"Tiendas con todo lo que necesitás para escalar tu negocio",
  sectionCopy:"Cobrás, despachás y gestionás todo desde un solo lugar. Sin vueltas, sin fricción y con más tiempo para hacer crecer tu marca.",
  items:[
    ["Cobrás online sin vueltas","Aceptá tarjetas, transferencias y billeteras en un checkout rápido y seguro."],
    ["Envíos más fáciles","Integrá Correo Argentino, Andreani u OCA con seguimiento para cada cliente."],
    ["Sin comisiones","Tu tienda es 100% tuya: dominio, hosting y acceso administrador desde el día uno."],
    ["Catálogo y stock","Cargá productos, variantes y precios sin planillas eternas y administrá todo desde un tablero claro."],
  ],
  darkTitle:"Vendé las 24 horas, los 7 días de la semana",
  darkCopy:"Creamos una tienda que automatiza pagos, envíos y stock para que vos puedas enfocarte en hacer crecer el negocio.",
};
export default function Page(){return <InternalPage page={page}/>;}
