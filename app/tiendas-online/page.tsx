import InternalPage, { ServicePage } from "../../components/InternalPage";

const page: ServicePage = {
  eyebrow: "ECOMMERCE PROFESIONAL",
  title: "Vendé con tu tienda online. Fácil, profesional y sin comisiones",
  intro: "Creamos tiendas online pensadas para vender más: fáciles de usar, rápidas y listas para crecer con tu negocio.",
  sections: [
    { eyebrow: "TECNOLOGÍA PARA VENDER", title: "Tiendas con todo lo que necesitás para escalar tu negocio", paragraphs: ["Diseñamos tiendas online profesionales, autoadministrables y adaptadas a tu marca. Integramos medios de pago, envíos, catálogo, stock y todas las herramientas necesarias para que puedas vender de forma simple y segura."] },
    { eyebrow: "TU NEGOCIO SIEMPRE ABIERTO", title: "Vendé las 24 horas, los 7 días de la semana", lead: "Diseño Web y Marketing Digital para transformar visitas en ventas.", paragraphs: ["Tu tienda online funciona incluso cuando vos no estás. Automatizá cobros, pedidos y consultas, mejorá la experiencia de compra y llegá a clientes de todo el país con una plataforma preparada para crecer."], dark: true },
    { eyebrow: "ESCALÁ TU NEGOCIO", title: "¿Qué ventajas tiene una tienda online profesional?", lead: "Todo lo que necesitás para vender más y gestionar mejor.", items: [
      { title: "Cobrás online sin vueltas", copy: "Aceptá tarjetas, transferencias y billeteras en un checkout rápido y seguro. Activamos Mercado Pago y métodos locales para que cobres desde el día uno." },
      { title: "Envíos más fáciles", copy: "Mostrá tarifas y tiempos en vivo con Correo Argentino, Andreani y OCA. Seguimiento para el cliente y retiro en punto o a domicilio, sin complicaciones." },
      { title: "No nos pagás comisiones", copy: "Tu tienda es 100% tuya: dominio, hosting y acceso administrador desde el día uno. Ideamos no te cobra por venta ni alquiler mensual." },
      { title: "Transmití confianza", copy: "Una web profesional con dominio propio, pagos seguros y envíos integrados le da a tu marca el respaldo que un perfil de redes no puede ofrecer." },
      { title: "Gestión de catálogo y stock", copy: "Cargá productos, variantes y precios en minutos, sin planillas eternas. Sincronizá inventario y alertas para no vender lo que no hay." },
      { title: "Diseño estratégico a medida", copy: "Cada elemento cumple una función: guiar al usuario, simplificar la compra y aumentar la conversión. Nada está puesto al azar." },
      { title: "Tomá decisiones informadas", copy: "Mirá ventas, conversión y ticket promedio en un tablero claro. Detectá qué canales rinden y dónde conviene invertir más." },
      { title: "Mejor atención en menos tiempo", copy: "El cliente puede ver precios, stock, tiempos y medios de pago sin preguntarte nada. Respondés menos mensajes y vendés más." },
    ]},
    { eyebrow: "SOLUCIONES A TU MEDIDA", title: "¿Qué problemas resolvemos con tu tienda online?", dark: true, items: [
      { title: "“Vendo por redes, pero pierdo mucho tiempo respondiendo”", copy: "Centralizamos productos, precios, stock, pagos y envíos para que tus clientes puedan comprar solos y vos recuperes tiempo." },
      { title: "“Quiero vender más, pero no sé cómo escalar”", copy: "Creamos una estructura preparada para campañas, medición y crecimiento, sin depender únicamente de mensajes privados." },
      { title: "“Mi tienda actual es difícil de usar”", copy: "Simplificamos la experiencia, ordenamos la información y diseñamos un recorrido de compra claro, rápido y confiable." },
      { title: "“Necesito una solución personalizada”", copy: "Adaptamos funciones, integraciones y procesos a la realidad de tu negocio para que la tecnología trabaje a tu favor." },
    ]},
    { eyebrow: "ENVIANOS UN MENSAJE", title: "Contactanos y reservá una asesoría online sin cargo", paragraphs: ["Contanos qué vendés, cómo trabajás hoy y qué querés lograr. Analizamos tu proyecto, detectamos oportunidades y preparamos una propuesta a medida para tu negocio."], contact: true },
  ],
};
export default function Page(){return <InternalPage page={page}/>;}
