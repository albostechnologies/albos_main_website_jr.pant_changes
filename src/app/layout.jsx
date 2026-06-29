import Script from "next/script";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://albostechnologies.com"),
  title:
    "Albos Technologies Pvt Ltd. - Custom Software, ERP & Mobile App Development Company",
  description:
    "Custom software development company in Pune providing web development, mobile apps, ERP, CRM, AI solutions, and digital transformation services.",
  keywords: [
    "best antivirus software",
    "scalable login",
    "app making websites",
    "the best app developers",
    "crypto ledger",
    "telecalling job",
  ],
  authors: [{ name: "Albos Technologies Pvt Ltd" }],
  alternates: {
    canonical: "https://albostechnologies.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title:
      "Albos Technologies Pvt Ltd. - Custom Software, ERP & Mobile App Development Company",
    description:
      "Custom software development company in Pune providing web development, mobile apps, ERP, CRM, AI solutions, and digital transformation services.",
    type: "website",
    url: "https://albostechnologies.com",
    siteName: "Albos Technologies Pvt Ltd",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Albos Technologies Pvt Ltd. - Custom Software, ERP & Mobile App Development Company",
    description:
      "Custom software development company in Pune providing web development, mobile apps, ERP, CRM, AI solutions, and digital transformation services.",
  },
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAFA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="">
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Albos Technologies Pvt Ltd",
              url: "https://albostechnologies.com",
              logo: "https://albostechnologies.com/logo.png",
              description:
                "Custom software development company in Pune providing web development, mobile apps, ERP, CRM, AI solutions, and digital transformation services.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kunal Plaza, Pune MH 411019",
                addressLocality: "Pune",
                addressRegion: "MH",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-97666-50411",
                contactType: "sales",
              },
              sameAs: [
                "https://www.linkedin.com/company/albos-technologies",
                "https://twitter.com/albostechnologies",
                "https://github.com/albostechnologies",
              ],
            }),
          }}
        />

        {children}
        <Toaster />
      </body>
    </html>
  );
}
