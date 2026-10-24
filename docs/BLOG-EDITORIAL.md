# Blog de Ideamos Argentina

## Objetivo y visibilidad

Captar consultas comerciales de diseño web y tiendas online, con igual prioridad entre ambos. SEO y marketing como servicios son secundarios. Acceso discreto desde el footer; no sumar el blog al menú principal ni al hero. No promover ni indexar `/precios/`.

## Cadencia y selección

Revisión semanal: como máximo un artículo nuevo o una mejora sustancial. Revisar inventario y, cuando estén disponibles, consultas de Search Console y contactos de Analytics. Preferir una actualización si evita duplicar intención de búsqueda. No escribir por cumplir una cuota ni prometer primeras posiciones. No usar investigación de pago sin autorización.

## Contenido

Español argentino, consejos aplicables a quien contrata una web o tienda. Cada artículo necesita una pregunta propia, información concreta y un próximo paso comercial natural. Evitar competir con las páginas de servicio. No inventar experiencias, resultados, clientes, precios o datos. Fuentes primarias para afirmaciones técnicas. Preservar URLs útiles del blog anterior. Mantener inicialmente dos categorías; no superar diez sin consultar.

## Diseño y medios

El usuario pide un blog y artículos tan cuidados e impactantes como el sitio: jerarquía tipográfica fuerte, naranja y negro, índice lateral en escritorio, lectura cómoda, secciones numeradas y checklists destacados. Mantener el diseño móvil y accesibilidad. Está autorizada la generación de imágenes para artículos cuando aporten valor: usar la herramienta y habilidad de generación disponibles. No presentar ilustraciones generadas como proyectos, clientes ni testimonios reales. Conservar los materiales auténticos del portfolio. Optimizar los recursos, definir dimensiones y evitar imágenes pesadas o repetición meramente decorativa.

## Publicación

Cada artículo debe tener una imagen editorial propia y relacionada con su tema. No reutilizar la misma ilustración entre entradas ni las capturas genéricas de servicios. El usuario pide generar las imágenes necesarias con Magnific, sin texto, títulos ni logos incrustados. Inspeccionar cada resultado, comprimirlo en WebP, producir tamaños adaptables y mantener imagen social y datos estructurados coherentes con la portada. Ver `BLOG-IMAGE-PROMPTS.md` para la dirección visual inicial.

Datos en `lib/blog.ts`, renderizado estático en `app/blog`. Título y descripción propios, canonical, BlogPosting, breadcrumbs, fecha real y enlaces a servicio, portfolio, contacto y artículos pertinentes. Las fechas no deben cambiar en todos los artículos al publicar uno nuevo: asignar fechas individuales cuando se amplíe la colección. Actualizar las pruebas de inventario al añadir URLs, sin debilitar las comprobaciones de rendimiento, seguridad ni privacidad.

Validar compilación, tipos, lint, enlaces, pruebas, escritorio y móvil. Seguir AGENTS.md: integrar cambios pertinentes en main, esperar `Deploy to GitHub Pages`, verificar la URL pública y entregar preview bajo `https://ideamosestudio.github.io/ideamosdemo/`. Nunca confundir un push exitoso con una publicación verificada.
