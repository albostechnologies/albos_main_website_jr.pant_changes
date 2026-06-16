import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { getPublishedBlogPosts } from "@/data/blog-posts";

/* ─── SEO Metadata ─── */
export const metadata = {
  title:
    "Blog — Albos Technologies Pvt Ltd | Engineering Insights & Tech Articles",
  description:
    "Explore engineering deep-dives, AI/ML insights, cloud architecture guides, design system strategies, and enterprise case studies from the Albos Technologies Pvt Ltd team. Stay ahead with expert perspectives on building software at scale.",
  keywords: [
    "engineering blog",
    "software development articles",
    "AI and machine learning insights",
    "cloud architecture",
    "DevOps best practices",
    "design systems",
    "enterprise software",
    "Kubernetes",
    "microservices",
    "Albos Technologies Pvt Ltd blog",
  ],
  authors: [{ name: "Albos Technologies Pvt Ltd" }],
  openGraph: {
    title:
      "Blog — Albos Technologies Pvt Ltd | Engineering Insights & Tech Articles",
    description:
      "Explore engineering deep-dives, AI/ML insights, cloud architecture guides, and enterprise case studies from the Albos Technologies Pvt Ltd team.",
    type: "website",
    url: "https://albostechnologies.com/blog",
    siteName: "Albos Technologies Pvt Ltd",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Blog — Albos Technologies Pvt Ltd | Engineering Insights & Tech Articles",
    description:
      "Explore engineering deep-dives, AI/ML insights, cloud architecture guides, and enterprise case studies from the Albos Technologies Pvt Ltd team.",
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
