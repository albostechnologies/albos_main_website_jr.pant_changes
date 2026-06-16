import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SERVICES } from "@/data/services";

export const metadata = {
  title:
    "Services — Albos Technologies Pvt Ltd | Software Engineering & Digital",
  description:
    "End-to-end software engineering services: web & mobile app development, blockchain, APIs & integrations, IoT, game development, digital marketing, ERP/CRM, and support.",
  keywords: SERVICES.map((service) => service.title),
  alternates: { canonical: "https://albostechnologies.com/services" },
  openGraph: {
    title: "Services — Albos Technologies Pvt Ltd",
    description:
      "From concept to scale — we architect, design, build, and maintain enterprise software across every industry.",
    url: "https://albostechnologies.com/services",
    siteName: "Albos Technologies Pvt Ltd",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Albos Technologies Services",
    itemListElement: SERVICES.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.title,
      url: `https://albostechnologies.com/services/${service.slug}`,
    })),
  };

  return (
    <>
      <Navbar activePage="services" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        <ServicesSection />
      </main>

      <Footer />
    </>
  );
}
