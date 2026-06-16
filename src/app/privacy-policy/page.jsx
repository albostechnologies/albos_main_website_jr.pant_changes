import { ShieldCheck } from "lucide-react";
import { LegalLayout } from "@/components/legal/LegalLayout";

const LAST_UPDATED = "June 2026";

export const metadata = {
  title: "Privacy Policy | Albos Technologies Pvt Ltd",
  description:
    "How Albos Technologies collects, uses, stores, and safeguards your information when you use our website and services.",
  alternates: { canonical: "https://albostechnologies.com/privacy-policy" },
  openGraph: {
    title: "Privacy Policy — Albos Technologies Pvt Ltd",
    description:
      "How Albos Technologies collects, uses, stores, and safeguards your information.",
    url: "https://albostechnologies.com/privacy-policy",
    siteName: "Albos Technologies Pvt Ltd",
    type: "website",
  },
};

const POLICY = `At Albos Technologies, protecting your privacy is one of our core responsibilities. This Privacy Policy explains how we collect, use, store, and safeguard information when you visit our website, interact with our services, submit inquiries, or engage with our marketing communications.

By using our website or services, you acknowledge and agree to the practices described in this policy.

## Our Commitment to Privacy

We value the trust our clients, partners, and website visitors place in us. We are committed to handling your information responsibly, transparently, and in accordance with applicable data protection laws.

## Information We Collect

When you interact with Albos Technologies, we may collect information in several ways.

### Information You Provide Directly

You may voluntarily provide information such as:

* Name
* Email address
* Phone number
* Company or organization name
* Job title
* Project requirements
* Messages submitted through contact forms
* Information provided during consultations or support requests

### Information Collected Automatically

When you browse our website, certain technical information may be collected automatically, including:

* IP address
* Browser details
* Device information
* Operating system
* Pages visited
* Session duration
* Traffic source information

This information helps us improve website performance and user experience.

## How We Use Your Information

The information collected by Albos Technologies may be used to:

* Respond to inquiries and business requests
* Provide software development and IT consulting services
* Prepare project proposals and quotations
* Deliver customer support
* Improve website functionality and user experience
* Analyze website traffic and performance
* Send service updates and business communications
* Share relevant industry insights and marketing materials
* Maintain security and prevent unauthorized activity
* Comply with legal and regulatory requirements

We only process information for legitimate business purposes and in accordance with applicable laws.

## Marketing Communications

From time to time, we may share information about our services, technology solutions, events, or company updates.

You may opt out of receiving promotional communications at any time by contacting us or using the unsubscribe option included in our emails.

## Cookies and Analytics

Our website may use cookies and similar technologies to improve functionality and understand visitor behavior.

These technologies help us:

* Remember user preferences
* Analyze website traffic
* Improve content relevance
* Enhance website performance

You can manage cookie preferences through your browser settings.

## Information Sharing

Albos Technologies does not sell personal information to third parties.

Information may be shared only when necessary with:

* Trusted technology partners
* Cloud hosting providers
* Business service providers
* Professional advisors
* Regulatory authorities when legally required

All such parties are expected to maintain appropriate confidentiality and security standards.

## Data Protection Measures

We implement industry-standard safeguards designed to protect information from unauthorized access, misuse, disclosure, alteration, or loss.

These measures may include:

* Secure hosting environments
* Access control procedures
* Data encryption technologies
* Regular security monitoring
* Internal confidentiality practices

While we strive to maintain strong security, no online system can guarantee absolute protection.

## Data Retention

We retain information only for as long as necessary to fulfill business, contractual, legal, or operational requirements.

Once information is no longer needed, it is securely deleted, anonymized, or archived in accordance with applicable regulations.

## Your Privacy Rights

Depending on your jurisdiction, you may have rights that include:

* Accessing your personal information
* Requesting corrections to inaccurate information
* Requesting deletion of personal data
* Restricting certain processing activities
* Objecting to specific uses of information
* Receiving a portable copy of your data
* Withdrawing previously provided consent

Requests regarding privacy rights may be submitted using the contact details below.

## External Links

Our website may contain links to external websites for informational purposes. Albos Technologies is not responsible for the privacy practices, content, or security of third-party websites.

We recommend reviewing their privacy policies before providing any personal information.

## Contact Us

For questions regarding this Privacy Policy or our data handling practices, please contact:

**Albos Technologies**

Website: https://www.albostechnologies.com/

Email: [info@albostechnologies.com](mailto:info@albostechnologies.com)

Phone: +91 8888581875

Location: Pune, Maharashtra, India

## Policy Updates

As our services, technologies, and legal obligations evolve, we may update this Privacy Policy periodically.

Any revisions will be posted on this page with the updated revision date. Continued use of our website after updates constitutes acceptance of the revised policy.`;

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      icon={ShieldCheck}
      eyebrow="Legal"
      title="Privacy Policy"
      dateLabel="Last updated"
      dateValue={LAST_UPDATED}
      activePage="privacy"
      markdown={POLICY}
    />
  );
}
