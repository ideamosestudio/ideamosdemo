import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogView from "../../../components/BlogView";
import { BLOG_DATE, blogCategories, blogPosts } from "../../../lib/blog";
import { createPageMetadata } from "../../../lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return [...blogCategories, ...blogPosts].map(p => ({ slug: p.slug.split("/") })); }
type Props = { params: Promise<{ slug: string[] }> };
async function find({ params }: Props) { const slug = (await params).slug.join("/"); return { post: blogPosts.find(p => p.slug === slug), category: blogCategories.find(c => c.slug === slug), slug }; }
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { post, category, slug } = await find(props);
  const content = post ?? category;
  if (!content) notFound();
  const metadata = createPageMetadata({ title: content.title, description: content.description, path: `/blog/${slug}/`, ...(post ? { image: post.image } : {}) });
  return post ? { ...metadata, openGraph: { ...metadata.openGraph, type: "article", images: [{ url: post.image, width: 1200, height: 686, alt: post.imageAlt }], publishedTime: BLOG_DATE, modifiedTime: BLOG_DATE, authors: ["Ideamos"] } } : metadata;
}
export default async function BlogContentPage(props: Props) { const { post, category } = await find(props); if (!post && !category) notFound(); return <BlogView post={post} category={category} />; }
