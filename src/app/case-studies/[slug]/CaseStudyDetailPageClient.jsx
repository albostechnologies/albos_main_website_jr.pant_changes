"use client";

import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

export function CaseStudyDetailPageClient({ content }) {
  return <MarkdownRenderer content={content} />;
}
