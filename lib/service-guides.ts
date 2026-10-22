export const serviceGuides = {
  web: {
    title: "Diseño web para empresas: qué definir antes de empezar",
    intro: "Una web profesional tiene que explicar qué hace tu empresa, mostrar por qué elegirla y facilitar el contacto. En Ideamos trabajamos desde Buenos Aires con negocios de Argentina: el alcance se define según tus objetivos, contenido y funcionalidades.",
    questions: [
      ["¿Qué incluye un proyecto de diseño web?", "La propuesta debe detallar las páginas, el diseño adaptable a celulares, el contenido, los formularios y las integraciones necesarias. Antes de comenzar acordamos el alcance y qué materiales aporta tu empresa, para que puedas comparar alternativas con claridad."],
      ["¿Voy a poder actualizar mi sitio web?", "Si necesitás editar textos, imágenes o productos, conviene definir desde el inicio qué partes serán autoadministrables. La solución depende de quién va a gestionar el contenido y con qué frecuencia: no todos los proyectos requieren el mismo sistema."],
      ["¿Cuánto cuesta y cuánto tarda una página web?", "El presupuesto y el plazo dependen de la cantidad de páginas, el estado de los textos e imágenes, las integraciones y las revisiones. Para cotizar, contanos qué vende tu empresa, qué necesita resolver la web y si ya tenés dominio o un sitio existente."],
      ["¿La web incluye posicionamiento en Google?", "La estructura, los títulos y el contenido ayudan a que los buscadores entiendan el sitio. Competir por búsquedas comerciales requiere además un trabajo sostenido de SEO; publicar una web no garantiza una posición determinada en Google."],
    ],
    related: ["shop", "seo"],
  },
  shop: {
    title: "Tiendas online para empresas: prepará tu proyecto",
    intro: "Una tienda online necesita más que un catálogo: hay que definir cómo se cobra, cómo se entrega y quién administra los pedidos. El diseño y las integraciones deben acompañar la operación real de tu negocio.",
    questions: [
      ["¿Qué necesito para pedir un presupuesto de tienda online?", "Prepará una estimación de productos y variantes, fotos, descripciones, medios de pago y zonas de entrega. También contanos si usás un sistema de stock o facturación para evaluar las integraciones y su alcance antes de cotizar."],
      ["¿Qué significa sin comisiones de Ideamos por venta?", "Ideamos no cobra una comisión por cada venta de tu tienda. Eso no elimina los cargos de pasarelas de pago, plataformas, envíos, dominio u otros proveedores: sus costos y condiciones se revisan por separado según la solución elegida."],
      ["¿Puedo gestionar productos, stock y pedidos?", "La administración del catálogo y los pedidos se define según la plataforma elegida. Si necesitás sincronizar stock con un sistema externo, primero hay que comprobar sus posibilidades de integración; no debe darse por incluida una sincronización automática."],
      ["¿Cómo consigo visitas para mi tienda online?", "El lanzamiento es el comienzo. Podés combinar contenido útil, posicionamiento orgánico y campañas para atraer compradores. Conviene medir compras y consultas reales, no solamente visitas, para evaluar qué canales ayudan al negocio."],
    ],
    related: ["marketing", "seo"],
  },
  seo: {
    title: "SEO, Google Ads y Maps: elegí según tu objetivo",
    intro: "El posicionamiento orgánico, los anuncios y el Perfil de Empresa de Google resuelven necesidades diferentes. La estrategia empieza por entender qué buscan tus clientes y qué acción querés que realicen al llegar a tu sitio.",
    questions: [
      ["¿Cuál es la diferencia entre SEO y Google Ads?", "El SEO mejora la presencia en resultados orgánicos mediante contenido, estructura técnica y autoridad. Google Ads permite anunciar con un presupuesto publicitario. Son canales complementarios: pagar anuncios no mejora por sí mismo la posición orgánica."],
      ["¿Se puede garantizar el primer puesto en Google?", "No. Las posiciones dependen de la competencia, la búsqueda y los sistemas de Google. Una propuesta seria define tareas, prioridades y métricas verificables, sin prometer un primer puesto ni una cantidad fija de ventas."],
      ["¿Cómo se mide si el posicionamiento está funcionando?", "Search Console permite revisar búsquedas, impresiones y clics orgánicos. Analytics ayuda a entender las visitas y acciones del sitio. Para medir resultados comerciales también hay que registrar consultas calificadas y ventas: un clic en WhatsApp no confirma que haya llegado un mensaje."],
      ["¿Para qué sirve el Perfil de Empresa de Google?", "Ayuda a presentar el negocio en Google y Maps con datos de contacto, servicios, horarios y reseñas. La información debe ser real y estar actualizada. Su visibilidad local también depende de la ubicación de quien busca y de la relevancia del negocio."],
    ],
    related: ["web", "marketing"],
  },
  marketing: {
    title: "Marketing digital con objetivos y medición",
    intro: "Antes de elegir canales, conviene definir a quién querés llegar, qué ofrecés y cómo vas a reconocer una buena consulta. La web, el contenido y las campañas tienen que trabajar sobre ese mismo objetivo.",
    questions: [
      ["¿Qué conviene revisar antes de invertir en publicidad?", "La propuesta comercial, las páginas de destino, el funcionamiento del contacto y la medición de conversiones. Si no se registran correctamente las consultas, es difícil distinguir una campaña que aporta oportunidades de otra que solo genera visitas."],
      ["¿Conviene hacer SEO, redes sociales o Google Ads?", "Depende de cómo busca y decide tu cliente. Google puede captar demanda existente; el contenido y las redes pueden ayudar a explicar tu propuesta. La combinación se define según el servicio, el presupuesto y la capacidad de responder las consultas."],
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
