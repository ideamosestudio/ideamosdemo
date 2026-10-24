import BlogView from "../../components/BlogView";
import { createPageMetadata } from "../../lib/seo";
export const metadata = createPageMetadata({ title: "Blog de diseño web y tiendas online | Ideamos", description: "Guías de Ideamos para crear o renovar la web de tu empresa y preparar tu tienda online. Alcance, contenido, plataformas y decisiones antes de empezar.", path: "/blog/" });
export default function BlogPage() { return <BlogView />; }
