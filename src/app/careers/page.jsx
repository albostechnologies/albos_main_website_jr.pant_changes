import { CareersPageClient } from "@/components/careers/CareersPageClient";
import { getPublishedJobListings } from "@/data/job-listings";

export const metadata = {
  title: "Careers — Albos Technologies Pvt Ltd | Join Our Engineering Team",
  description:
    "Explore open positions at Albos Technologies Pvt Ltd. We are hiring engineers, designers, DevOps specialists, and more. Build the future of enterprise software with a team of 250+ professionals in Pune, India.",
  keywords: [
    "software engineering jobs",
    "React developer jobs Pune",
    "Flutter developer careers",
    "Node.js backend engineer",
    "DevOps engineer India",
    "AI ML engineer positions",
    "UI UX designer jobs",
    "Albos Technologies Pvt Ltd careers",
    "tech jobs Pune",
    "startup hiring India",
  ],
  authors: [{ name: "Albos Technologies Pvt Ltd" }],
  openGraph: {
    title: "Careers — Albos Technologies Pvt Ltd | Join Our Engineering Team",
    description:
      "Explore open positions at Albos Technologies Pvt Ltd. Build the future of enterprise software with 250+ engineers in Pune, India.",
    type: "website",
    url: "https://albostechnologies.com/careers",
    siteName: "Albos Technologies Pvt Ltd",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — Albos Technologies Pvt Ltd | Join Our Engineering Team",
    description:
      "Explore open positions at Albos Technologies Pvt Ltd. Build the future of enterprise software with 250+ engineers in Pune, India.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://albostechnologies.com/careers",
  },
};

export default function CareersPage() {
  const jobs = getPublishedJobListings();
  return <CareersPageClient jobs={jobs} />;
}
