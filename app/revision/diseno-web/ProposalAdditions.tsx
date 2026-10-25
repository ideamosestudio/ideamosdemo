import ArrowIcon from "../../../components/ArrowIcon";
import { WHATSAPP_URL } from "../../../lib/whatsapp";
import s from "./additions.module.css";

const scope = [
  ["Estructura y contenido", "Las páginas, las secciones y los materiales que necesita tu web. Definimos quién aporta textos, imágenes y traducciones."],
  ["Diseño y versión móvil", "La propuesta visual de tu marca y su adaptación a celulares, tablets y escritorio, con instancias de revisión acordadas."],
  ["Contacto y funcionalidades", "Formularios, WhatsApp y las integraciones necesarias. Si necesitás administración, detallamos qué vas a poder editar."],
  ["Preparación y entrega", "Pruebas de navegación y contacto, base técnica de SEO según el alcance y condiciones de publicación, acceso y soporte."],
];
const steps = [
  ["Nos contás", "Conocemos tu empresa, tu público y lo que querés resolver. Revisamos tu web actual si ya tenés una."],
  ["Lo definimos", "Acordamos alcance, materiales, presupuesto y etapas. Sabés qué se va a entregar antes de empezar."],
  ["Le damos forma", "Diseñamos y desarrollamos la experiencia. Revisamos la propuesta con vos y ajustamos los detalles acordados."],
  ["Lo ponemos online", "Probamos el sitio, coordinamos la publicación y entregamos los accesos y pautas de uso que correspondan."],
];

export default function ProposalAdditions() {
  return <>
    <section className={s.scope} aria-labelledby="proposal-scope" id="alcance-proyecto">
      <div className={s.inner}>
        <div className={s.scopeLayout}>
          <header className={s.intro}>
            <p className={s.eyebrow}>QUÉ INCLUYE EL PROYECTO</p>
            <h2 id="proposal-scope">Una web a medida.<br /><em>Un alcance claro.</em></h2>
            <p>Tu proyecto de diseño web empieza con una propuesta concreta. Estos son los puntos que definimos juntos para que sepas qué recibís y cómo vamos a trabajar.</p>
            <a className={s.link} href={WHATSAPP_URL}>Hablemos de tu proyecto <ArrowIcon /></a>
          </header>
          <div className={s.deliverables}>{scope.map(([title, copy], i) => <article key={title}>
            <span className={s.index}>0{i + 1}</span>
            <div><h3>{title}</h3><p>{copy}</p></div>
            <svg className={s.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 12 4 4 10-10" /></svg>
          </article>)}</div>
        </div>
        <p className={s.note}>El alcance final queda por escrito. Dominio, hosting, mantenimiento, producción de contenido y campañas de SEO o publicidad se detallan por separado cuando correspondan.</p>
      </div>
    </section>
    <section className={`${s.process} dark`} aria-labelledby="proposal-process" id="proceso-diseno-web">
      <div className={s.inner}>
        <header className={s.processHead}>
          <div><p className={s.eyebrow}>CÓMO TRABAJAMOS</p><h2 id="proposal-process">De la primera charla<br /><em>a tu próxima web.</em></h2></div>
          <p>Cuatro etapas para avanzar con claridad.<br />Sin necesitar que tengas todo resuelto desde el principio.</p>
        </header>
        <ol className={s.steps}>{steps.map(([title, copy], i) => <li key={title}>
          <div className={s.stepTop}><span>0{i + 1}</span><ArrowIcon direction="right" /></div>
          <h3>{title}</h3><p>{copy}</p>
        </li>)}</ol>
        <div className={s.start}><p><strong>¿Por dónde arrancamos?</strong> Contanos qué hace tu empresa y qué querés mejorar. Con eso podemos empezar.</p><a href={WHATSAPP_URL} className="cta-glow primary"><span>Quiero una asesoría sin cargo</span></a></div>
      </div>
    </section>
  </>;
}
