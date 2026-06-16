import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/data/blog-posts";
import { BlogDetailPageClient } from "./BlogDetailPageClient";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ─── Static Generation ───
export async function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({ slug: post.slug }));
}

// ─── SEO Metadata ───
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Albos Technologies Pvt Ltd Blog",
    };
  }

  const tags = post.tags;
  const publishedTime = post.createdAt;
  const canonicalUrl = `https://albostechnologies.com/blog/${post.slug}`;

  return {
    title: `${post.title} | Albos Technologies Pvt Ltd Blog`,
    description: post.excerpt,
    keywords: tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime,
      authors: [post.author],
      tags,
      url: canonicalUrl,
      siteName: "Albos Technologies Pvt Ltd",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Related Posts Card ───
function RelatedPostCard({ post }) {
  const postTags = post.tags;
  const displayTags = postTags.slice(0, 3);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl bg-white border border-[#E4E4E7] card-hover-lift h-full flex flex-col">
        {/* Cover image / Gradient header area */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#18181B]">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/10 to-transparent" />
            </>
          )}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center rounded-full bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-inter)]">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B] leading-snug line-clamp-2 group-hover:text-[#F97316] transition-colors duration-300">
            {post.title}
          </h3>
          <p className="mt-2 text-[#71717A] text-sm leading-relaxed font-[family-name:var(--font-inter)] line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
            <span>{post.author}</span>
            <span className="flex items-center gap-1.5">
              {post.readTime} min read
            </span>
          </div>
          {displayTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-[#F5F5F0] px-2.5 py-0.5 text-[10px] font-medium text-[#71717A] font-[family-name:var(--font-inter)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

// ─── Page Component ───
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tags = post.tags;

  const relatedPosts = getPublishedBlogPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Albos Technologies Pvt Ltd",
      url: "https://albostechnologies.com",
      logo: {
        "@type": "ImageObject",
        url: "https://albostechnologies.com/logo.png",
      },
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://albostechnologies.com/blog/${post.slug}`,
    },
    keywords: tags.join(", "),
  };

  const formattedDate = formatDate(post.createdAt);

  return (
    <>
      <Navbar activePage="blog" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Article Hero ─── */}
      <section className="relative bg-[#18181B] overflow-hidden">
        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent glow */}
        <div className="absolute -top-1/4 -right-1/4 w-[60%] h-[120%] rounded-full bg-[#F97316]/[0.06] blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[40%] h-[80%] rounded-full bg-[#F97316]/[0.04] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 pt-28 md:pt-36 lg:pt-44 pb-12 md:pb-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm font-[family-name:var(--font-inter)] text-[#A1A1AA]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#F97316] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="mx-1">/</span>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#F97316] transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="mx-1">/</span>
              </li>
              <li className="text-[#F97316]">{post.category}</li>
              <li aria-hidden="true">
                <span className="mx-1">/</span>
              </li>
              <li className="text-white/60 truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Category Badge */}
          <span className="inline-flex items-center rounded-full bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-inter)]">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="mt-6 font-[family-name:var(--font-plus-jakarta)] text-[clamp(1.75rem,4vw,3.25rem)] font-bold text-white leading-[1.1] tracking-tight max-w-4xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 text-[#A1A1AA] text-base md:text-lg font-[family-name:var(--font-inter)] leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#FB923C] flex items-center justify-center text-white text-sm font-bold font-[family-name:var(--font-plus-jakarta)]">
                {getInitials(post.author)}
              </div>
              <div>
                <p className="text-white font-semibold text-sm font-[family-name:var(--font-inter)]">
                  {post.author}
                </p>
                <p className="text-[#A1A1AA] text-xs font-[family-name:var(--font-inter)]">
                  {post.authorRole}
                </p>
              </div>
            </div>

            {/* Separator */}
            <div className="hidden sm:block w-px h-8 bg-white/10" />

            {/* Date & Read time */}
            <div className="flex items-center gap-4 text-xs font-[family-name:var(--font-inter)] text-[#A1A1AA]">
              <time dateTime={post.createdAt}>{formattedDate}</time>
              <span className="w-1 h-1 rounded-full bg-[#A1A1AA]/40" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mt-8 relative rounded-2xl overflow-hidden aspect-[21/9]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* ─── Article Content ─── */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16 lg:py-20">
          {/* Back to blog link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-inter)] text-[#71717A] hover:text-[#F97316] transition-colors duration-200 mb-10 group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Markdown Content */}
          <BlogDetailPageClient content={post.content} />

          {/* ─── Tags Section ─── */}
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#E4E4E7]">
              <p className="text-xs uppercase tracking-[0.15em] text-[#A1A1AA] font-[family-name:var(--font-jetbrains-mono)] font-semibold mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?category=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full bg-[#F5F5F0] border border-[#E4E4E7] px-4 py-1.5 text-sm font-[family-name:var(--font-inter)] text-[#52525B] hover:bg-[#FFF7ED] hover:text-[#F97316] hover:border-[#F97316]/20 transition-all duration-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ─── Author Card ─── */}
          <div className="mt-12 pt-8 border-t border-[#E4E4E7]">
            <div className="rounded-2xl border border-[#E4E4E7] bg-white p-6 md:p-8">
              {/* Accent top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316] rounded-t-2xl" />

              <div className="flex flex-col sm:flex-row gap-5">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F97316] to-[#FB923C] flex items-center justify-center text-white text-xl font-bold font-[family-name:var(--font-plus-jakarta)] shadow-lg shadow-[#F97316]/20">
                    {getInitials(post.author)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B]">
                    {post.author}
                  </h3>
                  <p className="text-sm text-[#F97316] font-semibold font-[family-name:var(--font-inter)] mt-0.5">
                    {post.authorRole}
                  </p>
                  <p className="mt-3 text-sm text-[#52525B] font-[family-name:var(--font-inter)] leading-relaxed">
                    Expert in {post.category.toLowerCase()} at Albos
                    Technologies Pvt Ltd. Sharing insights from years of
                    building enterprise solutions at scale.
                  </p>

                  {/* Social links */}
                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href="https://www.linkedin.com/company/albos-technologies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[#71717A] hover:bg-[#F97316]/10 hover:text-[#F97316] transition-all duration-300"
                      aria-label={`${post.author} on LinkedIn`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/albostechnologies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[#71717A] hover:bg-[#F97316]/10 hover:text-[#F97316] transition-all duration-300"
                      aria-label={`${post.author} on Twitter`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related Posts ─── */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.15em] text-[#F97316] font-[family-name:var(--font-jetbrains-mono)] font-semibold mb-3">
                Read More
              </p>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B] tracking-tight">
                Related Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Newsletter CTA ─── */}
      <section className="bg-[#FAFAFA]">
        <NewsletterCTA />
      </section>

      <Footer />
    </>
  );
}
