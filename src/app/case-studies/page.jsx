import { getPublishedCaseStudies } from "@/data/case-studies";
import { CaseStudiesPageClient } from "@/components/case-studies/CaseStudiesPageClient";

export const metadata = {
  title: "Case Studies Showcasing Successful Digital Transformation Projects",
  description:
    "Explore case studies highlighting successful software development, mobile applications, digital transformation and business automation projects.",
  keywords: [
    "software development case studies",
    "digital transformation projects",
    "mobile app case studies",
    "business automation",
    "Albos Technologies case studies",
  ],
  authors: [{ name: "Albos Technologies Pvt Ltd" }],
  openGraph: {
    title: "Case Studies Showcasing Successful Digital Transformation Projects",
    description:
      "Explore case studies highlighting successful software development, mobile applications, digital transformation and business automation projects.",
    type: "website",
    url: "https://albostechnologies.com/case-studies",
    siteName: "Albos Technologies Pvt Ltd",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies Showcasing Successful Digital Transformation Projects",
    description:
      "Explore case studies highlighting successful software development, mobile applications, digital transformation and business automation projects.",
  },
  robots: "index, follow",
  alternates: { canonical: "https://albostechnologies.com/case-studies" },
};

export default function CaseStudiesPage() {
  const studies = getPublishedCaseStudies();
  return <CaseStudiesPageClient studies={studies} />;
}
