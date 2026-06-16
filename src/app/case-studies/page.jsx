import { getPublishedCaseStudies } from "@/data/case-studies";
import { CaseStudiesPageClient } from "@/components/case-studies/CaseStudiesPageClient";

export const metadata = {
  title: "Case Studies — Albos Technologies Pvt Ltd | Client Success Stories",
  description:
    "Explore how Albos Technologies Pvt Ltd helped FinTech, HealthTech, EdTech, Retail, and enterprise clients achieve measurable results through custom software engineering.",
  openGraph: {
    title: "Case Studies — Albos Technologies Pvt Ltd",
    description:
      "Client success stories and project outcomes from Albos Technologies Pvt Ltd.",
    url: "https://albostechnologies.com/case-studies",
    siteName: "Albos Technologies Pvt Ltd",
  },
  alternates: { canonical: "https://albostechnologies.com/case-studies" },
};

export default function CaseStudiesPage() {
  const studies = getPublishedCaseStudies();
  return <CaseStudiesPageClient studies={studies} />;
}
