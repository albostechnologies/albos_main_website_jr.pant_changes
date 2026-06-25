import { CareersPageClient } from "@/components/careers/CareersPageClient";
import { getPublishedJobListings } from "@/data/job-listings";

export const metadata = {
  title: "Careers at Albos Technologies | Join Our Growing Team",
  description:
    "Explore career opportunities at Albos Technologies and become part of a team creating innovative software, mobile and digital solutions.",
  keywords: [
    "careers at albos technologies",
    "software engineering jobs",
    "tech jobs Pune",
    "developer careers India",
    "Albos Technologies hiring",
  ],
  authors: [{ name: "Albos Technologies Pvt Ltd" }],
  openGraph: {
    title: "Careers at Albos Technologies | Join Our Growing Team",
    description:
      "Explore career opportunities at Albos Technologies and become part of a team creating innovative software, mobile and digital solutions.",
    type: "website",
    url: "https://albostechnologies.com/careers",
    siteName: "Albos Technologies Pvt Ltd",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Albos Technologies | Join Our Growing Team",
    description:
      "Explore career opportunities at Albos Technologies and become part of a team creating innovative software, mobile and digital solutions.",
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
