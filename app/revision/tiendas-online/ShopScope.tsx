import ArrowIcon from "../../../components/ArrowIcon";
import s from "./review.module.css";

const href = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const scope = [
  ["Catálogo que se entiende", "Categorías, fichas, variantes y disponibilidad. Acordamos cuántos productos se cargan, qué información aporta tu equipo y cómo se administran los cambios."],
  ["Compra desde el celular", "Diseño adaptable, navegación y carrito. Revisamos selección de variantes, datos de entrega y mensajes de confirmación para que el recorrido sea claro."],
  ["Pagos y entregas definidos", "Evaluamos proveedores de pago, zonas de envío y retiro. Sus condiciones y tarifas se verifican antes de elegir; no todas las integraciones están incluidas por defecto."],
  ["Gestión y lanzamiento", "Definimos permisos, pruebas de compra y orientación para administrar. Si necesitás conectar stock, facturación o un ERP, detallamos esa integración por separado."],
];

export default function ShopScope() {
  return <section className={s.scope} aria-labelledby="shop-scope-title">
    <div className={s.inner}>
      <header className={s.heading}>
        <p className={s.eyebrow}>QUÉ INCLUYE TU PROYECTO</p>
        <h2 id="shop-scope-title">Tu tienda. Tu operación.<br/><em>Un alcance claro.</em></h2>
        <p>No elegimos funciones por cantidad. Definimos lo que necesitás para vender, administrar y acompañar a tus clientes.</p>
      </header>
      <div className={s.cards}>{scope.map(([title, description], i) => <article key={title}>
        <span className={s.number} aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{description}</p>
      </article>)}</div>
      <details className={s.choice}>
        <summary>¿Una plataforma existente o un desarrollo a medida?<span aria-hidden="true">+</span></summary>
        <div><p>Un diseño personalizado puede funcionar sobre una plataforma existente. Un desarrollo a medida implica resolver funciones o reglas específicas: precios por cliente, cotizaciones o integraciones particulares. Primero revisamos catálogo, operación, presupuesto y responsables de mantenimiento.</p>
        <a href={href("/blog/tiendas-online/tienda-online-a-medida-o-plataforma/")}>Compará las opciones para tu tienda <ArrowIcon /></a></div>
      </details>
      <div className={s.next}>
        <div><h3>Empecemos por tu catálogo.</h3><p>Traé una muestra de productos, cómo vendés hoy y qué querés simplificar. Si ya tenés tienda, revisamos qué conservar antes de migrar.</p></div>
        <a className="cta-glow primary" href={href("/contacto/")}><span>Contanos tu proyecto</span></a>
      </div>
      <nav className={s.resources} aria-label="Recursos para tu tienda online">
        <a href={href("/portfolio/")}>Explorá nuestro portfolio <ArrowIcon /></a>
        <a href={href("/blog/tiendas-online/que-necesitas-para-lanzar-tienda-online/")}>Prepará el lanzamiento <ArrowIcon /></a>
      </nav>
    </div>
  </section>;
}
