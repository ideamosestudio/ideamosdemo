export const serviceGuides = {
  web: {
    title: "Antes de crear tu web",
    intro: "Resolvemos tus dudas sobre diseño web para empresas: qué incluye el proyecto, costos, plazos y cómo administrar tu sitio.",
    questions: [
      ["¿Qué incluye un proyecto de diseño web?", "Antes de empezar, acordamos las páginas, el contenido y las funcionalidades de tu web. La propuesta detalla el diseño adaptable a celulares, los formularios y las integraciones incluidas, además de los materiales que aporta tu empresa."],
      ["¿Voy a poder actualizar mi sitio web?", "Si necesitás un sitio web autoadministrable, definimos qué textos, imágenes o productos vas a poder editar. Elegimos la solución según quién gestione el contenido y con qué frecuencia: no todos los proyectos necesitan el mismo sistema."],
      ["¿Cuánto cuesta y cuánto tarda una página web?", "El costo y el plazo dependen de la cantidad de páginas, los textos e imágenes disponibles, las integraciones y las revisiones. Para cotizar tu web, contanos qué necesita resolver tu empresa y si ya tenés un dominio o un sitio existente."],
      ["¿La web incluye posicionamiento en Google?", "La estructura, los títulos y el contenido son la base para que Google entienda tu web. Definimos ese alcance en la propuesta. Competir por búsquedas comerciales requiere además un trabajo sostenido de SEO; publicar el sitio no garantiza una posición determinada."],
    ],
    related: ["shop", "seo"],
  },
  shop: {
    title: "Antes de lanzar tu tienda",
    intro: "Resolvemos tus dudas sobre tiendas online: presupuesto, medios de pago, gestión de productos y cómo atraer compradores.",
    questions: [
      ["¿Qué necesito para pedir un presupuesto de tienda online?", "Contanos cuántos productos y variantes tenés, qué fotos y descripciones están listas, cómo cobrás y dónde entregás. Si usás un sistema de stock o facturación, evaluamos sus integraciones antes de definir el presupuesto de tu tienda online."],
      ["¿Qué significa sin comisiones de Ideamos por venta?", "No te cobramos una comisión por cada venta de tu tienda. Las pasarelas de pago, plataformas, envíos, dominio y otros proveedores pueden tener sus propios cargos. Revisamos esos costos y condiciones por separado según la solución elegida."],
      ["¿Puedo gestionar productos, stock y pedidos?", "Definimos cómo vas a administrar productos, stock y pedidos según la plataforma elegida. Si necesitás conectar un sistema externo, primero comprobamos sus posibilidades de integración y acordamos el alcance: la sincronización automática no se da por incluida."],
      ["¿Cómo consigo visitas para mi tienda online?", "Podés combinar posicionamiento SEO, contenido útil y campañas de publicidad para atraer compradores. Después del lanzamiento, la clave es medir compras y consultas reales, además de visitas, para identificar qué canales aportan oportunidades a tu negocio."],
    ],
    related: ["marketing", "seo"],
  },
  seo: {
    title: "Antes de invertir en SEO",
    intro: "Conocé las diferencias entre posicionamiento web, Google Ads y Maps, y cómo evaluar los resultados de cada canal.",
    questions: [
      ["¿Cuál es la diferencia entre SEO y Google Ads?", "El SEO mejora la presencia en resultados orgánicos mediante contenido, estructura técnica y autoridad. Google Ads permite anunciar con un presupuesto publicitario. Son canales complementarios: pagar anuncios no mejora por sí mismo la posición orgánica."],
      ["¿Se puede garantizar el primer puesto en Google?", "No. Las posiciones dependen de la competencia, la búsqueda y los sistemas de Google. En Ideamos definimos tareas, prioridades y métricas verificables, sin prometer un primer puesto ni una cantidad fija de ventas."],
      ["¿Cómo se mide si el posicionamiento está funcionando?", "Search Console permite revisar búsquedas, impresiones y clics orgánicos. Analytics ayuda a entender las visitas y acciones del sitio. Para medir resultados comerciales también hay que registrar consultas calificadas y ventas: un clic en WhatsApp no confirma que haya llegado un mensaje."],
      ["¿Para qué sirve el Perfil de Empresa de Google?", "Ayuda a presentar el negocio en Google y Maps con datos de contacto, servicios, horarios y reseñas. La información debe ser real y estar actualizada. Su visibilidad local también depende de la ubicación de quien busca y de la relevancia del negocio."],
    ],
    related: ["web", "marketing"],
  },
  marketing: {
    title: "Antes de invertir en marketing",
    intro: "Resolvemos tus dudas sobre marketing digital: qué canales elegir, cómo preparar tus campañas y qué resultados medir.",
    questions: [
      ["¿Qué conviene revisar antes de invertir en publicidad?", "Primero revisamos tu propuesta comercial, las páginas de destino, el contacto y la medición de conversiones. Registrar correctamente las consultas ayuda a distinguir una campaña que aporta oportunidades de otra que solo genera visitas."],
      ["¿Conviene hacer SEO, redes sociales o Google Ads?", "Depende de cómo busca y decide tu cliente. Google puede captar demanda existente; el contenido y las redes ayudan a explicar tu propuesta. Elegimos la combinación según tu servicio, presupuesto y capacidad de responder las consultas."],
      ["¿Cómo sé si mi inversión está dando resultados?", "Relacioná el gasto con consultas calificadas, presupuestos y ventas, además de revisar clics y visitas. Para calcular rentabilidad también hacen falta los costos y márgenes del negocio; una conversión registrada no equivale necesariamente a una venta."],
      ["¿Qué información necesitan para una primera asesoría?", "Contanos qué vende tu empresa, a quién, en qué zonas y qué canales usás actualmente. Si ya tenés una web o campañas, compartí sus objetivos y resultados disponibles para identificar prioridades y preparar una propuesta acorde."],
    ],
    related: ["web", "seo"],
  },
} as const;

export type ServiceGuideKey = keyof typeof serviceGuides;
export const serviceLinks = {
  web: { href: "/diseno-web-autoadministrable/", label: "Diseño web profesional para empresas" },
  shop: { href: "/tiendas-online/", label: "Desarrollo de tiendas online" },
  seo: { href: "/posicionamiento-web/", label: "Posicionamiento SEO y Google Ads" },
  marketing: { href: "/marketing-digital/", label: "Estrategia de marketing digital" },
} as const;
