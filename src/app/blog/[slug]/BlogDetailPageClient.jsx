"use client";

import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

export function BlogDetailPageClient({ content }) {
  return <MarkdownRenderer content={content} />;
}
