const CASE_STUDIES_DATA = [
  {
    id: 1,
    slug: "fintrack-pro",
    title: "FinTrack Pro",
    category: "FinTech",
    image: "/images/case-studies/fintrack-pro.png",
    description:
      "Real-time financial analytics platform processing 10M+ transactions daily with sub-100ms latency.",
    excerpt:
      "How Albos rebuilt a legacy trading analytics stack into a cloud-native platform handling millions of daily transactions.",
    result: "40% faster load time",
    techStack: ["React", "Node.js", "PostgreSQL", "AWS"],
    featured: true,
    client: "FinTrack Pro (Series B FinTech)",
    duration: "10 months",
    teamSize: "14 engineers",
    year: "2024",
    challenge:
      "The client's monolithic dashboard could not keep pace with intraday trading volume. Page loads exceeded 8 seconds, on-call incidents were frequent, and product teams could not ship features without risking production stability.",
    solution:
      "We designed an event-driven microservices architecture on AWS, introduced read-optimized PostgreSQL replicas, and rebuilt the front end in React with aggressive code-splitting and edge caching. Observability (metrics, traces, SLO dashboards) was implemented from day one.",
    outcomes: [
      { label: "Load time improvement", value: "40%" },
      { label: "Daily transactions", value: "10M+" },
      { label: "P99 API latency", value: "<100ms" },
      { label: "Production incidents", value: "-62%" },
    ],
    content: `## Overview

FinTrack Pro needed a platform that could scale with trading volume without sacrificing analyst experience. Albos Technologies Pvt Ltd partnered with their product and infrastructure teams to deliver a full rebuild.

## The challenge

- Legacy monolith with tightly coupled reporting modules
- No clear ownership boundaries between teams
- Slow release cycles and high regression risk
- Growing data volume from real-time market feeds

## Our approach

### Architecture

We decomposed the system into domain-aligned services: ingestion, normalization, analytics, alerting, and admin. Kafka streams decouple peak load from user-facing APIs.

### Frontend performance

The React application uses route-based splitting, virtualized data grids, and memoized chart layers. Critical dashboards load under two seconds on median hardware.

### Reliability

Blue/green deployments, automated rollback, and error budgets per service gave leadership confidence to accelerate the roadmap.

## Results

Within three months of launch, FinTrack Pro reported materially faster dashboards, fewer overnight incidents, and a 40% improvement in median load time across top workflows.`,
  },
  {
    id: 2,
    slug: "medconnect",
    title: "MedConnect",
    category: "HealthTech",
    image: "/images/case-studies/medconnect.png",
    description:
      "HIPAA-compliant telehealth platform connecting 50K+ patients with healthcare providers.",
    excerpt:
      "A secure telehealth experience that scaled patient engagement while meeting HIPAA compliance requirements.",
    result: "3x patient engagement",
    techStack: ["Next.js", "Python", "MongoDB", "Azure"],
    featured: false,
    client: "MedConnect Health",
    duration: "8 months",
    teamSize: "11 engineers",
    year: "2024",
    challenge:
      "MedConnect needed to launch virtual care quickly after rapid growth in demand. Their MVP lacked role-based access controls, audit trails, and a cohesive patient mobile experience.",
    solution:
      "We delivered a Next.js web portal, provider scheduling APIs in Python, and Azure-hosted infrastructure with encryption at rest and in transit. Consent flows, session timeouts, and audit logging were built to HIPAA-aligned patterns.",
    outcomes: [
      { label: "Patient engagement", value: "3x" },
      { label: "Active patients", value: "50K+" },
      { label: "Avg. consult booking", value: "<2 min" },
      { label: "Uptime SLA", value: "99.9%" },
    ],
    content: `## Overview

MedConnect engaged Albos to transform a pilot telehealth tool into an enterprise-ready platform for clinics across India and the Middle East.

## Key deliverables

- Patient and provider portals with SSO
- Appointment scheduling with timezone-aware calendars
- Encrypted video session handoff to approved vendors
- Admin analytics for clinic administrators

## Compliance & security

Access is enforced through RBAC, PHI is segmented per tenant, and all sensitive actions emit structured audit events. Security reviews were conducted before each major release.

## Impact

Patient repeat bookings tripled within two quarters, and support tickets related to login and scheduling dropped sharply after the redesigned onboarding flow shipped.`,
  },
  {
    id: 3,
    slug: "eduspark",
    title: "EduSpark",
    category: "EdTech",
    image: "/images/case-studies/eduspark.png",
    description:
      "AI-powered adaptive learning platform serving 200K+ students across 15 countries.",
    excerpt:
      "Personalized learning paths powered by recommendation models and a unified content authoring system.",
    result: "95% completion rate",
    techStack: ["React Native", "TensorFlow", "Node.js"],
    featured: false,
    client: "EduSpark Global",
    duration: "12 months",
    teamSize: "16 engineers",
    year: "2023",
    challenge:
      "Static course catalogs produced low completion rates. Educators could not experiment with modular content, and mobile apps were inconsistent across iOS and Android.",
    solution:
      "Albos built a cross-platform React Native app, a Node.js API layer, and TensorFlow-based recommendation pipelines that adapt quizzes and revision modules to learner performance.",
    outcomes: [
      { label: "Course completion", value: "95%" },
      { label: "Students served", value: "200K+" },
      { label: "Countries", value: "15" },
      { label: "Content authoring time", value: "-50%" },
    ],
    content: `## Overview

EduSpark wanted learning to feel personal at scale. We unified web, mobile, and instructor tooling behind a single design system and analytics layer.

## Product highlights

- Adaptive study plans based on mastery scores
- Instructor dashboard with cohort insights
- Offline-friendly mobile modules for low-bandwidth regions
- A/B testing hooks for curriculum experiments

## Engineering notes

Recommendation features run asynchronously so mobile clients stay responsive. Model retraining pipelines are isolated from user-facing clusters.

## Outcomes

Completion rates climbed to 95% for flagship programs, and the content team halved the time required to publish new learning paths.`,
  },
  {
    id: 4,
    slug: "logiflow",
    title: "LogiFlow",
    category: "Logistics",
    image: "/images/case-studies/logiflow.png",
    description:
      "End-to-end supply chain visibility platform reducing delivery times by 35%.",
    excerpt:
      "Unified tracking for warehouses, fleets, and last-mile partners with real-time exception alerts.",
    result: "35% faster delivery",
    techStack: ["Vue.js", "Java", "Kafka", "GCP"],
    featured: false,
    client: "LogiFlow Logistics",
    duration: "9 months",
    teamSize: "13 engineers",
    year: "2024",
    challenge:
      "Shipment status lived in disconnected TMS, WMS, and carrier portals. Operations teams relied on spreadsheets to reconcile delays.",
    solution:
      "We implemented a GCP data plane with Kafka event ingestion, a Java core API, and a Vue.js control tower for dispatchers. Geofenced alerts notify teams before SLA breaches.",
    outcomes: [
      { label: "Faster delivery", value: "35%" },
      { label: "SLA breaches", value: "-48%" },
      { label: "Daily events processed", value: "2M+" },
      { label: "Partner integrations", value: "24" },
    ],
    content: `## Overview

LogiFlow needed one pane of glass for domestic and cross-border logistics. Albos integrated carrier webhooks, warehouse scanners, and GPS telematics into a single timeline per shipment.

## Control tower features

- Live map with fleet positions
- Exception queue ranked by revenue impact
- Predictive delay scoring from historical lanes
- Customer-facing tracking pages with white-label branding

## Technical architecture

Kafka buffers burst traffic from partners. The Vue dashboard consumes WebSocket feeds for sub-second status updates on critical lanes.

## Business impact

Average delivery time improved 35%, and operations headcount redirected hours previously spent on manual status checks.`,
  },
  {
    id: 5,
    slug: "retailos",
    title: "RetailOS",
    category: "Retail",
    image: "/images/case-studies/retailos.png",
    description:
      "Omnichannel retail management system handling $2B+ annual transactions.",
    excerpt:
      "Inventory, POS, and e-commerce channels synchronized in real time for a national retail group.",
    result: "2x revenue growth",
    techStack: ["Next.js", "Python", "Redis", "AWS"],
    featured: false,
    client: "RetailOS Commerce Group",
    duration: "11 months",
    teamSize: "15 engineers",
    year: "2023",
    challenge:
      "Online and store inventory frequently disagreed, causing oversells and costly manual reconciliations. Promotions could not run consistently across channels.",
    solution:
      "RetailOS on Albos architecture uses Redis-backed inventory locks, a Python pricing engine, and Next.js admin consoles. POS integrations sync within seconds via webhooks.",
    outcomes: [
      { label: "Revenue growth", value: "2x" },
      { label: "Annual GMV", value: "$2B+" },
      { label: "Oversell incidents", value: "-91%" },
      { label: "Stock sync latency", value: "<5s" },
    ],
    content: `## Overview

A national retailer selected Albos to build the omnichannel backbone for stores, warehouses, and marketplace listings.

## Capabilities delivered

- Unified product catalog with variant-level inventory
- Promotion builder with channel-specific rules
- Store associate mobile tools for click-and-collect
- Executive dashboards for category performance

## Why it worked

Strong consistency boundaries around inventory reservations prevented double-selling during high-traffic sales. Redis gave the low-latency reads checkout required.

## Results

The client doubled digital revenue within a year while shrinking oversell incidents by over 90%.`,
  },
  {
    id: 6,
    slug: "datavault",
    title: "DataVault",
    category: "AI/ML",
    image: "/images/case-studies/datavault.png",
    description:
      "Enterprise data governance platform with automated ML pipeline management.",
    excerpt:
      "Governed data lakes, lineage tracking, and self-service ML pipelines for a global enterprise.",
    result: "80% less manual work",
    techStack: ["React", "Python", "Kubernetes", "Snowflake"],
    featured: false,
    client: "DataVault Enterprise",
    duration: "10 months",
    teamSize: "12 engineers",
    year: "2024",
    challenge:
      "Data science teams spent most of their time on access tickets, environment setup, and manual pipeline babysitting instead of model development.",
    solution:
      "Albos shipped a React governance console, Python orchestration services on Kubernetes, and Snowflake-native storage policies. Lineage graphs and policy-as-code automate approvals.",
    outcomes: [
      { label: "Manual ops reduced", value: "80%" },
      { label: "Models in production", value: "120+" },
      { label: "Policy checks automated", value: "94%" },
      { label: "Mean time to deploy", value: "-70%" },
    ],
    content: `## Overview

DataVault engaged Albos to operationalize ML across business units without sacrificing compliance.

## Platform modules

- Data catalog with ownership and classification tags
- Lineage visualization from ingestion to model features
- Pipeline templates with automated quality gates
- Cost and usage dashboards per department

## Governance by design

Policies are expressed as code and evaluated before datasets are promoted to production zones. Sensitive fields are masked by default in lower environments.

## Impact

Manual operations work dropped 80%, and teams deployed models 70% faster while passing internal audit reviews.`,
  },
];

export function getPublishedCaseStudies() {
  return CASE_STUDIES_DATA;
}

export function getCaseStudyBySlug(slug) {
  return CASE_STUDIES_DATA.find((study) => study.slug === slug);
}

/** Card-friendly list (backward compatible with constants shape) */
export const CASE_STUDIES = CASE_STUDIES_DATA.map((study) => ({
  id: study.id,
  slug: study.slug,
  title: study.title,
  category: study.category,
  image: study.image,
  description: study.description,
  result: study.result,
  techStack: study.techStack,
  featured: study.featured,
}));
