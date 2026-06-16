import { Scale } from "lucide-react";
import { LegalLayout } from "@/components/legal/LegalLayout";

const EFFECTIVE_DATE = "June 2026";

export const metadata = {
  title: "Terms of Use | Albos Technologies Pvt Ltd",
  description:
    "The terms and conditions governing your access to and use of the Albos Technologies website, products, and services.",
  alternates: { canonical: "https://albostechnologies.com/terms-of-use" },
  openGraph: {
    title: "Terms of Use — Albos Technologies Pvt Ltd",
    description:
      "The terms and conditions governing your access to and use of the Albos Technologies website and services.",
    url: "https://albostechnologies.com/terms-of-use",
    siteName: "Albos Technologies Pvt Ltd",
    type: "website",
  },
};

const TERMS = `Welcome to Albos Technologies. These Terms of Use establish the rules and conditions governing your access to our website, products, services, and digital solutions. By accessing our website or engaging with our services, you agree to comply with these terms.

If you do not agree with any provision outlined below, please discontinue the use of our website and services.

## 1. About Albos Technologies

Albos Technologies is a technology company providing software engineering, web development, mobile application development, enterprise solutions, cloud services, digital transformation consulting, and related IT services to businesses worldwide.

## 2. Acceptance of Terms

By visiting our website, submitting an inquiry, requesting a proposal, or purchasing our services, you acknowledge that you have read, understood, and accepted these Terms of Use.

These terms apply to all visitors, clients, partners, vendors, and users of our website.

## 3. Website Access and Usage

You may use our website solely for lawful and legitimate purposes.

Users must not:

* Engage in activities that violate applicable laws or regulations.
* Attempt to gain unauthorized access to website systems or databases.
* Introduce malicious software, harmful code, or disruptive technologies.
* Use the website in a manner that negatively impacts its performance or security.
* Reproduce, modify, distribute, or commercially exploit website content without written permission.

We reserve the right to restrict or terminate access to users who violate these conditions.

## 4. Service Requests and Project Initiation

Submitting an inquiry through our website does not create a contractual relationship.

A project shall be considered officially initiated only after:

* Scope confirmation
* Commercial approval
* Written acceptance by both parties
* Completion of required documentation
* Receipt of applicable advance payments

Project deliverables, milestones, timelines, and payment schedules will be governed by separate agreements or proposals.

## 5. Accuracy of Information

Users are responsible for ensuring that all information submitted to Albos Technologies is accurate, complete, and current.

We reserve the right to reject requests containing false, misleading, incomplete, or unauthorized information.

## 6. Intellectual Property

All materials available on this website, including but not limited to:

* Logos
* Branding elements
* Text content
* Graphics
* Images
* Website design
* Source code
* Software assets

remain the exclusive property of Albos Technologies unless otherwise stated.

No content may be copied, republished, distributed, or used without prior written authorization.

## 7. Client-Owned Content

Clients retain ownership of content, trademarks, branding materials, data, and documentation supplied to Albos Technologies for project execution.

Clients warrant that they possess all necessary rights and permissions for materials provided to us.

## 8. Confidential Business Information

Both Albos Technologies and its clients agree to protect confidential information exchanged during discussions, proposals, and project execution.

Confidential information shall not be disclosed to third parties except:

* With written consent
* To authorized personnel involved in service delivery
* Where disclosure is legally required

## 9. Third-Party Platforms and Integrations

Our solutions may integrate with external platforms, cloud providers, APIs, payment gateways, or software services.

Albos Technologies is not responsible for:

* Changes made by third-party providers
* Third-party service outages
* Licensing changes
* Platform discontinuation
* Security incidents beyond our direct control

Users are encouraged to review the terms of such third-party services independently.

## 10. Service Availability

While we strive to maintain uninterrupted service availability, we do not guarantee that our website or services will always operate without delays, interruptions, or technical issues.

Maintenance activities, upgrades, and external factors may occasionally affect availability.

## 11. Limitation of Responsibility

To the fullest extent permitted by law, Albos Technologies shall not be liable for:

* Indirect damages
* Loss of business opportunities
* Loss of profits
* Data corruption or loss
* Operational interruptions
* Consequential damages arising from website use or service delivery

Any liability, where applicable, shall be limited to the amount paid for the specific service involved.

## 12. Privacy and Data Protection

Any personal information collected through our website or services is handled in accordance with our Privacy Policy.

By using our website, you consent to the collection and processing of information as described in our Privacy Policy.

## 13. Suspension or Termination

We reserve the right to suspend, limit, or terminate access to our website or services where:

* Terms have been violated
* Fraudulent activity is suspected
* Legal obligations require action
* Security risks are identified
* Contractual obligations remain unfulfilled

## 14. Updates to These Terms

Albos Technologies may revise these Terms of Use periodically to reflect changes in technology, legal requirements, or business operations.

The latest version will always be available on our website, and continued use of our services constitutes acceptance of any revisions.

## 15. Applicable Law and Jurisdiction

These Terms of Use shall be governed by the laws of India.

Any disputes arising from the use of our website or services shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra.

## 16. Contact Us

For questions regarding these Terms of Use, please contact:

**Albos Technologies**

Website: [www.albostechnologies.com](http://www.albostechnologies.com)

Email: [info@albostechnologies.com](mailto:info@albostechnologies.com)

Phone: +91 8888581875

Pune, Maharashtra, India`;

export default function TermsOfUsePage() {
  return (
    <LegalLayout
      icon={Scale}
      eyebrow="Legal"
      title="Terms of Use"
      dateLabel="Effective date"
      dateValue={EFFECTIVE_DATE}
      activePage="terms"
      markdown={TERMS}
    />
  );
}
