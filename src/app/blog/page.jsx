import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { getPublishedBlogPosts } from "@/data/blog-posts";

/* ─── SEO Metadata ─── */
export const metadata = {
  title: "Technology Blog on Software Development, AI and Digital Marketing",
  description:
    "Read expert insights, industry trends and practical guides on software development, AI, web technologies and digital marketing.",
  keywords: [
    "technology blog",
    "software development blog",
    "AI insights",
    "web technologies",
    "digital marketing",
    "Albos Technologies blog",
  ],
  authors: [{ name: "Albos Technologies Pvt Ltd" }],
  openGraph: {
    title: "Technology Blog on Software Development, AI and Digital Marketing",
    description:
      "Read expert insights, industry trends and practical guides on software development, AI, web technologies and digital marketing.",
    type: "website",
    url: "https://albostechnologies.com/blog",
    siteName: "Albos Technologies Pvt Ltd",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Blog on Software Development, AI and Digital Marketing",
    description:
      "Read expert insights, industry trends and practical guides on software development, AI, web technologies and digital marketing.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://albostechnologies.com/blog",
  },
};

export default function BlogPage() {
  const posts = getPublishedBlogPosts();
  return <BlogPageClient posts={posts} />;
}
