// Single source of truth for the company's services.
//
// The base fields (id, title, slug, description, capabilities, locations,
// metric, techStack) are consumed across the site (ServicesSection,
// ExpertiseSection, ContactSection, Footer). The richer fields (tagline,
// overview, outcomes, faqs, icon) power the dedicated /services/[slug] pages.
//
// `SERVICES` is re-exported from "@/lib/constants" for backwards compatibility.

export const SERVICES = [
  {
    id: "01",
    title: "Web App Development",
    slug: "web-app-development",
    icon: "Globe",
    tagline: "Fast, scalable web platforms engineered for growth.",
    description:
      "High-performance web applications built with modern frameworks. From progressive web apps to complex enterprise portals, we deliver scalable solutions that drive business growth.",
    overview:
      "We design and engineer web applications that stay fast and maintainable as they scale — from customer-facing products and SaaS platforms to internal enterprise portals. Our teams own the full stack, pairing thoughtful frontend architecture with resilient backends so your product performs under real-world load.",
    capabilities: [
      "Frontend Architecture",
      "Backend Engineering",
      "Full-Stack Development",
      "CMS Integration",
      "Performance Optimization",
    ],
    locations: ["Pune"],
    metric: "60+ Developers",
    techStack: ["React", "Next.js", "Node.js", "Laravel", "Django"],
    outcomes: [
      { value: "500+", label: "Products shipped" },
      { value: "<1.5s", label: "Typical load time" },
      { value: "99.9%", label: "Uptime targets" },
    ],
    faqs: [
      {
        question: "Which frameworks do you build with?",
        answer:
          "We default to React and Next.js for product UIs, backed by Node.js, Laravel, or Django depending on your ecosystem. We choose the stack around your team and constraints, not the other way around.",
      },
      {
        question: "Can you work with our existing codebase?",
        answer:
          "Yes. We regularly join existing projects — auditing the codebase, stabilising it, and shipping incrementally so you keep delivering while we improve architecture and performance.",
      },
      {
        question: "How do you handle performance and SEO?",
        answer:
          "Performance is built in from day one: server-side rendering, code-splitting, image optimisation, and Core Web Vitals budgets that we measure on every release.",
      },
    ],
    whatWeBuild: [
      {
        title: "SaaS Platforms",
        icon: "Cloud",
        description:
          "Multi-tenant products with billing, roles, and analytics — built to scale from your first customer to thousands.",
      },
      {
        title: "Enterprise Portals",
        icon: "Building2",
        description:
          "Secure internal platforms that unify workflows, data, and teams behind single sign-on.",
      },
      {
        title: "Progressive Web Apps",
        icon: "Globe",
        description:
          "Installable, offline-capable web apps that feel native on every device.",
      },
      {
        title: "E-commerce & Marketplaces",
        icon: "ShoppingCart",
        description:
          "High-converting storefronts and multi-vendor marketplaces with secure payments.",
      },
      {
        title: "Real-time Dashboards",
        icon: "LayoutDashboard",
        description:
          "Live data visualisation and reporting powered by streaming APIs and websockets.",
      },
      {
        title: "Headless & CMS Sites",
        icon: "Newspaper",
        description:
          "Fast, content-rich sites with a headless CMS your marketing team can own.",
      },
    ],
    techCategories: [
      {
        category: "Frontend",
        items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Laravel", "Django", ".NET", "NestJS"],
      },
      {
        category: "Database",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
      },
      {
        category: "DevOps & Cloud",
        items: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      },
    ],
    whyChooseUs: [
      {
        title: "Senior full-stack teams",
        description:
          "60+ engineers who own the product end to end — no hand-offs between disconnected silos.",
      },
      {
        title: "Performance by default",
        description:
          "Server-side rendering, caching, and Core Web Vitals budgets baked into every build.",
      },
      {
        title: "Built to scale",
        description:
          "Architecture decisions that hold up from MVP to millions of requests.",
      },
      {
        title: "Transparent delivery",
        description:
          "Agile sprints, live demos, and shared dashboards so you always know where things stand.",
      },
    ],
  },
  {
    id: "02",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    icon: "Smartphone",
    tagline: "Native-quality apps for iOS and Android.",
    description:
      "Native and cross-platform mobile applications for iOS and Android. We build polished, high-performance apps that users love, from MVPs to enterprise-grade solutions.",
    overview:
      "From a first MVP to a feature-rich enterprise app, we build mobile experiences that feel native and perform reliably across devices. We handle the full lifecycle — architecture, development, store submission, and post-launch iteration — so you ship confidently and keep improving.",
    capabilities: [
      "Android / Kotlin",
      "iOS / Swift",
      "Flutter Development",
      "React Native",
      "App Store Optimization",
    ],
    locations: ["Pune"],
    metric: "45+ Developers",
    techStack: ["Kotlin", "Swift", "Flutter", "React Native"],
    outcomes: [
      { value: "120+", label: "Apps launched" },
      { value: "4.7★", label: "Avg. store rating" },
      { value: "2 OS", label: "iOS & Android" },
    ],
    faqs: [
      {
        question: "Native or cross-platform — which is right for us?",
        answer:
          "It depends on your performance needs, budget, and timeline. We help you decide: Flutter or React Native to ship both platforms from one codebase, or fully native Swift/Kotlin when you need maximum control.",
      },
      {
        question: "Do you handle App Store and Play Store submission?",
        answer:
          "Yes — we manage the entire release process, including store listings, review compliance, and staged rollouts, plus App Store Optimization to improve discoverability.",
      },
      {
        question: "Can you maintain the app after launch?",
        answer:
          "We offer ongoing support and feature development, with monitoring and crash reporting so issues are caught and resolved quickly.",
      },
    ],
    whatWeBuild: [
      {
        title: "Consumer Apps",
        icon: "Smartphone",
        description:
          "Polished iOS & Android apps designed to win ratings, engagement, and retention.",
      },
      {
        title: "Enterprise & Field Apps",
        icon: "Briefcase",
        description:
          "Secure sales, operations, and field apps integrated with your existing backend.",
      },
      {
        title: "Cross-platform Apps",
        icon: "Layers",
        description:
          "One Flutter or React Native codebase shipping to both the App Store and Play Store.",
      },
      {
        title: "On-demand & Marketplace",
        icon: "ShoppingBag",
        description:
          "Booking, delivery, and marketplace apps with real-time tracking and payments.",
      },
      {
        title: "Wearable & IoT Companions",
        icon: "Watch",
        description:
          "Mobile apps that pair with wearables and connected devices.",
      },
      {
        title: "MVPs & Prototypes",
        icon: "Rocket",
        description:
          "Validate fast with a production-quality MVP in weeks, not months.",
      },
    ],
    techCategories: [
      { category: "Native iOS", items: ["Swift", "SwiftUI", "Objective-C"] },
      {
        category: "Native Android",
        items: ["Kotlin", "Jetpack Compose", "Java"],
      },
      { category: "Cross-platform", items: ["Flutter", "React Native"] },
      {
        category: "Backend & Services",
        items: ["Node.js", "Firebase", "REST", "GraphQL"],
      },
    ],
    whyChooseUs: [
      {
        title: "Native-grade quality",
        description:
          "Smooth, 60fps experiences whether we build fully native or cross-platform.",
      },
      {
        title: "Full lifecycle delivery",
        description:
          "From architecture to store submission and post-launch growth — handled end to end.",
      },
      {
        title: "Store-ready",
        description:
          "App Store Optimization, review compliance, and staged rollouts taken care of.",
      },
      {
        title: "Reliable & observable",
        description:
          "Crash reporting and analytics so issues are caught before users ever complain.",
      },
    ],
  },
  {
    id: "03",
    title: "Blockchain & Web3",
    slug: "blockchain-web3",
    icon: "Boxes",
    tagline: "Secure decentralized apps and smart contracts.",
    description:
      "Decentralized applications and smart contracts built for the next generation of the web. From DeFi protocols to NFT platforms, we engineer secure blockchain solutions.",
    overview:
      "We build production-grade decentralized applications where security is non-negotiable. From smart contract architecture to DeFi protocols and NFT platforms, our engineers ship audited, gas-efficient code and integrate it with intuitive front ends users can actually trust.",
    capabilities: [
      "Smart Contract Development",
      "DeFi Protocols",
      "NFT Platforms",
      "Token Engineering",
      "Security Auditing",
    ],
    locations: ["Pune"],
    metric: "20+ Engineers",
    techStack: ["Solidity", "Ethereum", "Solana", "Web3.js"],
    outcomes: [
      { value: "100%", label: "Audited contracts" },
      { value: "EVM", label: "& Solana ready" },
      { value: "24/7", label: "On-chain monitoring" },
    ],
    faqs: [
      {
        question: "Which chains do you develop for?",
        answer:
          "Primarily EVM-compatible chains (Ethereum, Polygon, BNB Chain) and Solana. We recommend a chain based on your cost, throughput, and ecosystem requirements.",
      },
      {
        question: "How do you ensure smart contract security?",
        answer:
          "Every contract goes through internal review, automated analysis, and comprehensive test coverage. For high-value protocols we coordinate third-party audits before mainnet.",
      },
      {
        question: "Can you build the full dApp, not just contracts?",
        answer:
          "Yes — we deliver the complete product: smart contracts, indexing, wallet integration, and a polished web interface.",
      },
    ],
    whatWeBuild: [
      {
        title: "Smart Contracts",
        icon: "FileCode",
        description:
          "Audited, gas-optimised contracts for tokens, vaults, and protocol logic.",
      },
      {
        title: "DeFi Protocols",
        icon: "Landmark",
        description:
          "Lending, staking, AMMs, and yield platforms engineered for on-chain security.",
      },
      {
        title: "NFT Platforms",
        icon: "Gem",
        description:
          "Minting, marketplaces, and royalties across major token standards.",
      },
      {
        title: "Token Engineering",
        icon: "Coins",
        description:
          "Tokenomics design and ERC-20/721/1155 issuance with vesting and distribution.",
      },
      {
        title: "DAOs & Governance",
        icon: "Vote",
        description:
          "On-chain voting, treasuries, and modular governance systems.",
      },
      {
        title: "Wallet & dApp Integration",
        icon: "Wallet",
        description:
          "Seamless wallet connections and polished, trustworthy dApp front ends.",
      },
    ],
    techCategories: [
      {
        category: "Chains & Protocols",
        items: ["Ethereum", "Solana", "Polygon", "Chainlink"],
      },
      { category: "Smart Contracts", items: ["Solidity", "Hardhat", "IPFS"] },
      {
        category: "dApp & Backend",
        items: ["React", "Next.js", "Node.js", "GraphQL"],
      },
    ],
    whyChooseUs: [
      {
        title: "Security-first",
        description:
          "Every contract is reviewed, tested, and audited before it ever reaches mainnet.",
      },
      {
        title: "Gas-optimised",
        description:
          "Efficient contracts that keep transaction costs low for your users.",
      },
      {
        title: "Full-stack web3",
        description:
          "Contracts, indexing, wallets, and front end delivered as one cohesive product.",
      },
      {
        title: "Multi-chain ready",
        description:
          "EVM chains and Solana — we deploy where your users already are.",
      },
    ],
  },
  {
    id: "04",
    title: "API & Integrations",
    slug: "api-integrations",
    icon: "Webhook",
    tagline: "Robust APIs and seamless system integrations.",
    description:
      "Robust, scalable APIs and seamless system integrations. We design and build RESTful services, GraphQL endpoints, and microservice architectures that power modern businesses.",
    overview:
      "We design APIs and integrations that connect your systems cleanly and scale with demand. Whether you need a public REST or GraphQL API, a microservice backbone, or integrations with third-party platforms, we focus on clear contracts, observability, and reliability.",
    capabilities: [
      "REST API Design",
      "GraphQL Development",
      "Microservices Architecture",
      "Third-Party Integrations",
      "API Gateway Management",
    ],
    locations: ["Pune"],
    metric: "35+ Engineers",
    techStack: ["Node.js", "GraphQL", "REST", "Microservices"],
    outcomes: [
      { value: "1B+", label: "Requests served" },
      { value: "<100ms", label: "p95 latency" },
      { value: "100+", label: "Integrations built" },
    ],
    faqs: [
      {
        question: "REST or GraphQL?",
        answer:
          "Both have their place. We use GraphQL when clients need flexible querying and REST for simpler, cacheable resource APIs — and we're happy to run them side by side.",
      },
      {
        question: "Can you integrate with our existing tools?",
        answer:
          "Yes — payments, CRMs, ERPs, messaging, analytics, and custom legacy systems. We build resilient integrations with retries, idempotency, and proper error handling.",
      },
      {
        question: "How do you document your APIs?",
        answer:
          "We ship machine-readable specs (OpenAPI / GraphQL schema) plus human-friendly docs, so your team and partners can integrate without guesswork.",
      },
    ],
    whatWeBuild: [
      {
        title: "REST APIs",
        icon: "Server",
        description:
          "Clean, versioned, well-documented REST services your partners love to use.",
      },
      {
        title: "GraphQL APIs",
        icon: "Share2",
        description:
          "Flexible schemas with efficient querying for modern web and mobile clients.",
      },
      {
        title: "Microservices",
        icon: "Boxes",
        description: "Decoupled services that scale and deploy independently.",
      },
      {
        title: "Third-party Integrations",
        icon: "Plug",
        description: "Payments, CRMs, ERPs, and SaaS tools connected reliably.",
      },
      {
        title: "API Gateways",
        icon: "ShieldCheck",
        description:
          "Routing, authentication, rate limiting, and observability at the edge.",
      },
      {
        title: "Webhooks & Events",
        icon: "Zap",
        description:
          "Event-driven pipelines with retries and idempotency built in.",
      },
    ],
    techCategories: [
      { category: "APIs", items: ["Node.js", "GraphQL", "REST", "gRPC"] },
      {
        category: "Messaging & Events",
        items: ["Apache Kafka", "RabbitMQ", "Redis"],
      },
      { category: "Data", items: ["PostgreSQL", "MongoDB", "Redis"] },
      { category: "Infrastructure", items: ["Docker", "Kubernetes", "AWS"] },
    ],
    whyChooseUs: [
      {
        title: "Reliable by design",
        description:
          "Retries, idempotency, and graceful failure handling baked into every integration.",
      },
      {
        title: "Documented & versioned",
        description:
          "OpenAPI and GraphQL schemas so teams integrate without guesswork.",
      },
      {
        title: "Fully observable",
        description: "Logging, metrics, and tracing on every endpoint.",
      },
      {
        title: "Scales with you",
        description:
          "A microservice architecture that grows from MVP to high traffic.",
      },
    ],
  },
  {
    id: "05",
    title: "IoT & Embedded",
    slug: "iot-embedded",
    icon: "Cpu",
    tagline: "Connected devices that bridge physical and digital.",
    description:
      "Connected devices and embedded systems that bridge the physical and digital worlds. From sensor networks to edge computing, we build intelligent IoT ecosystems.",
    overview:
      "We build end-to-end IoT ecosystems — from firmware on the device to the cloud platform that makes the data useful. Our teams handle sensor integration, edge processing, secure connectivity, and real-time dashboards so you can monitor and act on what your hardware sees.",
    capabilities: [
      "IoT Platform Development",
      "Embedded Systems",
      "Edge Computing",
      "Sensor Integration",
      "Real-Time Data Processing",
    ],
    locations: ["Pune"],
    metric: "15+ Engineers",
    techStack: ["IoT", "Embedded C", "Edge Computing", "MQTT"],
    outcomes: [
      { value: "10k+", label: "Devices connected" },
      { value: "Real-time", label: "Data pipelines" },
      { value: "Edge", label: "& cloud ready" },
    ],
    faqs: [
      {
        question: "Do you work with our hardware?",
        answer:
          "Yes. We integrate with your chosen microcontrollers and sensors, or advise on hardware selection if you're starting fresh.",
      },
      {
        question: "How do you handle connectivity and offline behaviour?",
        answer:
          "We design for unreliable networks using protocols like MQTT, local buffering, and edge processing so devices keep working and sync when connectivity returns.",
      },
      {
        question: "Can you build the dashboards too?",
        answer:
          "Absolutely — we deliver real-time monitoring dashboards and alerting on top of the device data, fully integrated with the platform.",
      },
    ],
    whatWeBuild: [
      {
        title: "Connected Devices",
        icon: "Cpu",
        description:
          "Firmware and embedded systems for sensors, controllers, and smart products.",
      },
      {
        title: "IoT Platforms",
        icon: "Network",
        description:
          "Device management, provisioning, and OTA updates at fleet scale.",
      },
      {
        title: "Edge Computing",
        icon: "Server",
        description:
          "On-device processing that keeps working with unreliable connectivity.",
      },
      {
        title: "Real-time Telemetry",
        icon: "Gauge",
        description:
          "Live monitoring and alerting on everything your devices report.",
      },
      {
        title: "Sensor Networks",
        icon: "Wifi",
        description:
          "Reliable data capture across distributed sensors and gateways.",
      },
      {
        title: "Smart Automation",
        icon: "Zap",
        description:
          "Rules and triggers that let your devices act on their own.",
      },
    ],
    techCategories: [
      {
        category: "Devices & Firmware",
        items: ["Arduino", "Raspberry Pi", "Embedded C"],
      },
      { category: "Connectivity", items: ["MQTT", "Bluetooth", "LoRa"] },
      { category: "Edge & Cloud", items: ["AWS", "Azure", "Node.js"] },
      {
        category: "Data & Dashboards",
        items: ["InfluxDB", "Grafana", "Redis"],
      },
    ],
    whyChooseUs: [
      {
        title: "Hardware to cloud",
        description:
          "One team across firmware, connectivity, and the cloud platform.",
      },
      {
        title: "Built for the real world",
        description:
          "Edge buffering and resilient protocols keep devices working offline.",
      },
      {
        title: "Secure by design",
        description:
          "Encrypted comms, secure provisioning, and over-the-air updates.",
      },
      {
        title: "Actionable data",
        description:
          "Dashboards and alerts that turn raw telemetry into decisions.",
      },
    ],
  },
  {
    id: "06",
    title: "Game Development",
    slug: "game-development",
    icon: "Gamepad2",
    tagline: "Immersive games across mobile, desktop, and XR.",
    description:
      "Immersive gaming experiences across platforms. From casual mobile games to complex AR/VR simulations, we bring creative visions to life with cutting-edge game engines.",
    overview:
      "From casual mobile titles to AR/VR simulations, we turn creative concepts into polished, performant games. Our team covers gameplay engineering, multiplayer systems, and game UX, using industry-standard engines to ship experiences that look great and run smoothly.",
    capabilities: [
      "Unity Development",
      "Unreal Engine",
      "AR / VR Experiences",
      "Multiplayer Systems",
      "Game UX Design",
    ],
    locations: ["Pune"],
    metric: "12+ Developers",
    techStack: ["Unity", "Unreal", "AR/VR", "C#"],
    outcomes: [
      { value: "Unity", label: "& Unreal expertise" },
      { value: "AR/VR", label: "immersive builds" },
      { value: "60 FPS", label: "performance targets" },
    ],
    faqs: [
      {
        question: "Unity or Unreal?",
        answer:
          "We use Unity for fast iteration and mobile/AR/VR, and Unreal when you need high-fidelity visuals. We recommend the engine that fits your art direction and platform targets.",
      },
      {
        question: "Can you build multiplayer games?",
        answer:
          "Yes — we design and implement real-time multiplayer systems, including matchmaking, netcode, and backend services.",
      },
      {
        question: "Do you do AR/VR experiences?",
        answer:
          "We build immersive AR and VR applications for training, product visualisation, and entertainment across major headsets and mobile AR.",
      },
    ],
    whatWeBuild: [
      {
        title: "Mobile Games",
        icon: "Smartphone",
        description:
          "Casual and mid-core games tuned for retention and monetisation.",
      },
      {
        title: "PC & Console",
        icon: "Gamepad2",
        description: "High-fidelity experiences built in Unity and Unreal.",
      },
      {
        title: "AR Experiences",
        icon: "Camera",
        description: "Markerless AR for retail, training, and marketing.",
      },
      {
        title: "VR Experiences",
        icon: "Glasses",
        description:
          "Immersive VR for simulation, training, and entertainment.",
      },
      {
        title: "Multiplayer Systems",
        icon: "Users",
        description: "Real-time netcode, matchmaking, and live backends.",
      },
      {
        title: "Game Backends",
        icon: "Server",
        description: "Leaderboards, economies, and live-ops services.",
      },
    ],
    techCategories: [
      { category: "Engines", items: ["Unity", "Unreal", "Godot"] },
      { category: "Languages", items: ["C#", "C++", "Lua"] },
      { category: "AR / VR", items: ["ARKit", "ARCore", "WebXR"] },
      { category: "Art & Tools", items: ["Blender", "OpenGL", "Photoshop"] },
    ],
    whyChooseUs: [
      {
        title: "Cross-platform shipping",
        description: "Mobile, PC, console, and XR from a single team.",
      },
      {
        title: "Performance-obsessed",
        description: "Smooth 60fps experiences on every target device.",
      },
      {
        title: "Full production",
        description: "From concept and art through live-ops and updates.",
      },
      {
        title: "Engaging by design",
        description:
          "Game UX and economy design that keeps players coming back.",
      },
    ],
  },
  {
    id: "07",
    title: "Digital Marketing & SEO",
    slug: "digital-marketing-seo",
    icon: "Megaphone",
    tagline: "Data-driven growth that compounds.",
    description:
      "Data-driven digital marketing strategies that amplify your brand and drive measurable growth. From SEO to paid campaigns, we optimize every touchpoint for conversions.",
    overview:
      "We grow your pipeline with strategies grounded in data, not guesswork. From technical SEO and content to paid campaigns across Google and Meta, we optimise the full funnel and report on the metrics that actually move revenue.",
    capabilities: [
      "Search Engine Optimization",
      "Google Ads Management",
      "Meta Ads Campaigns",
      "Content Strategy",
      "Analytics & Reporting",
    ],
    locations: ["Pune"],
    metric: "18+ Specialists",
    techStack: ["SEO", "Google Ads", "Meta Ads", "Analytics"],
    outcomes: [
      { value: "3x", label: "Avg. traffic growth" },
      { value: "ROI", label: "focused campaigns" },
      { value: "Weekly", label: "reporting cadence" },
    ],
    faqs: [
      {
        question: "How soon will we see results?",
        answer:
          "Paid campaigns can drive traffic within days; SEO is a compounding investment that typically shows meaningful movement over 3–6 months. We set realistic expectations up front.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We tie everything to business outcomes — qualified leads, conversions, and cost per acquisition — with transparent dashboards and regular reporting.",
      },
      {
        question: "Do you handle content as well as ads?",
        answer:
          "Yes — content strategy, on-page optimisation, and paid media work together. We align them so each channel reinforces the others.",
      },
    ],
    whatWeBuild: [
      {
        title: "SEO",
        icon: "Search",
        description:
          "Technical, on-page, and content SEO that compounds over time.",
      },
      {
        title: "Paid Search",
        icon: "Target",
        description: "Google Ads campaigns engineered for return on ad spend.",
      },
      {
        title: "Social Ads",
        icon: "Megaphone",
        description: "Meta and LinkedIn campaigns that actually convert.",
      },
      {
        title: "Content Marketing",
        icon: "PenTool",
        description: "Content strategy and creation that ranks and resonates.",
      },
      {
        title: "Analytics & CRO",
        icon: "LineChart",
        description: "Tracking, dashboards, and conversion-rate optimisation.",
      },
      {
        title: "Email & Automation",
        icon: "Mail",
        description: "Lifecycle campaigns and marketing automation.",
      },
    ],
    techCategories: [
      {
        category: "Search & SEO",
        items: ["Google Search Console", "Semrush", "Ahrefs"],
      },
      { category: "Advertising", items: ["Google Ads", "Meta", "LinkedIn"] },
      {
        category: "Analytics",
        items: ["Google Analytics", "Tag Manager", "Looker Studio"],
      },
      {
        category: "Content & Email",
        items: ["WordPress", "HubSpot", "Mailchimp"],
      },
    ],
    whyChooseUs: [
      {
        title: "Data-driven",
        description:
          "Every decision tied to metrics that actually affect revenue.",
      },
      {
        title: "Full-funnel",
        description: "SEO, paid, content, and CRO working as one system.",
      },
      {
        title: "Transparent reporting",
        description:
          "Clear dashboards and regular reviews — no vanity metrics.",
      },
      {
        title: "ROI-focused",
        description:
          "We optimise for qualified leads and cost per acquisition.",
      },
    ],
  },
  {
    id: "08",
    title: "ERP & CRM Systems",
    slug: "erp-crm-systems",
    icon: "Building2",
    tagline: "Unify your operations and customer data.",
    description:
      "Enterprise resource planning and customer relationship management systems tailored to your workflows. We automate processes and unify data across your organization.",
    overview:
      "We implement and customise ERP and CRM systems around how your business actually works. By automating manual processes and unifying data across departments, we help teams move faster and make decisions from a single source of truth.",
    capabilities: [
      "ERP Implementation",
      "CRM Customization",
      "Business Process Automation",
      "Data Migration",
      "Workflow Optimization",
    ],
    locations: ["Pune"],
    metric: "25+ Engineers",
    techStack: ["ERP", "CRM", "Automation", "SAP", "Salesforce"],
    outcomes: [
      { value: "40%", label: "Less manual work" },
      { value: "1 view", label: "Unified data" },
      { value: "SAP", label: "& Salesforce skilled" },
    ],
    faqs: [
      {
        question: "Do you customise off-the-shelf systems or build custom?",
        answer:
          "Both. We customise platforms like SAP and Salesforce when they fit, and build bespoke systems when your workflows demand it — often a blend of the two.",
      },
      {
        question: "Can you migrate our existing data?",
        answer:
          "Yes — data migration is a core part of our delivery, including cleansing, mapping, and validation so you start on the new system with trustworthy data.",
      },
      {
        question: "Will it integrate with our other tools?",
        answer:
          "We connect your ERP/CRM with the rest of your stack — accounting, support, marketing, and custom systems — so data flows automatically.",
      },
    ],
    whatWeBuild: [
      {
        title: "ERP Implementation",
        icon: "Building2",
        description:
          "Finance, inventory, HR, and operations unified in one system.",
      },
      {
        title: "CRM Customisation",
        icon: "Users",
        description: "Sales, marketing, and support workflows tailored to you.",
      },
      {
        title: "Process Automation",
        icon: "Workflow",
        description: "Automate manual, repetitive business processes.",
      },
      {
        title: "Data Migration",
        icon: "Database",
        description: "Clean, validated migration onto your new platform.",
      },
      {
        title: "Custom Modules",
        icon: "Boxes",
        description: "Bespoke modules built for your unique workflows.",
      },
      {
        title: "System Integrations",
        icon: "Plug",
        description: "Connect accounting, support, and marketing tools.",
      },
    ],
    techCategories: [
      {
        category: "Platforms",
        items: ["SAP", "Salesforce", "Microsoft Dynamics"],
      },
      { category: "Custom Build", items: ["Node.js", ".NET", "PostgreSQL"] },
      { category: "Automation", items: ["Zapier", "n8n", "Power Automate"] },
      { category: "Integration", items: ["REST", "GraphQL", "Webhooks"] },
    ],
    whyChooseUs: [
      {
        title: "Around your workflows",
        description:
          "We fit the system to your business, not the other way round.",
      },
      {
        title: "Clean migrations",
        description: "Cleansed, mapped, and validated data from day one.",
      },
      {
        title: "Less manual work",
        description: "Automation that frees your team for higher-value tasks.",
      },
      {
        title: "A connected stack",
        description: "All your tools talking to each other automatically.",
      },
    ],
  },
  {
    id: "09",
    title: "Telecalling & Support",
    slug: "telecalling-support",
    icon: "Headset",
    tagline: "Customer support that protects your brand.",
    description:
      "Professional customer support and telecalling services that keep your clients satisfied. From inbound support to outbound campaigns, we represent your brand with excellence.",
    overview:
      "We run professional inbound and outbound calling operations that represent your brand with care. From technical helpdesk to outbound campaigns, our trained agents and quality processes keep your customers satisfied and your conversion rates healthy.",
    capabilities: [
      "Customer Support",
      "Inbound Call Center",
      "Outbound Campaigns",
      "Technical Helpdesk",
      "Quality Assurance",
    ],
    locations: ["Pune"],
    metric: "20+ Agents",
    techStack: ["CRM", "VoIP", "Helpdesk", "Analytics"],
    outcomes: [
      { value: "20+", label: "Trained agents" },
      { value: "QA", label: "on every channel" },
      { value: "In/Out", label: "bound coverage" },
    ],
    faqs: [
      {
        question: "Do you provide both inbound and outbound services?",
        answer:
          "Yes — inbound customer support and technical helpdesk, as well as outbound campaigns for sales, follow-ups, and surveys.",
      },
      {
        question: "How do you maintain quality?",
        answer:
          "Every interaction is backed by quality assurance: call scoring, scripts aligned to your brand, and regular coaching for agents.",
      },
      {
        question: "Can you integrate with our CRM?",
        answer:
          "We work within your CRM and helpdesk tools so every conversation is logged and your team has full context.",
      },
    ],
    whatWeBuild: [
      {
        title: "Inbound Support",
        icon: "PhoneIncoming",
        description:
          "Friendly, knowledgeable support that keeps customers happy.",
      },
      {
        title: "Outbound Campaigns",
        icon: "PhoneOutgoing",
        description: "Sales, follow-ups, and surveys that drive results.",
      },
      {
        title: "Technical Helpdesk",
        icon: "Headset",
        description: "Tiered technical support with clear escalation paths.",
      },
      {
        title: "Live Chat & Email",
        icon: "MessageSquare",
        description: "Omnichannel support across chat and email.",
      },
      {
        title: "Quality Assurance",
        icon: "ShieldCheck",
        description: "Call scoring and coaching for consistent quality.",
      },
      {
        title: "CRM Integration",
        icon: "Plug",
        description: "Every interaction logged in your CRM with full context.",
      },
    ],
    techCategories: [
      { category: "Telephony", items: ["Twilio", "Asterisk", "VoIP"] },
      { category: "Helpdesk", items: ["Zendesk", "Freshdesk", "Intercom"] },
      { category: "CRM", items: ["Salesforce", "HubSpot", "Zoho"] },
      {
        category: "Analytics",
        items: ["Google Analytics", "Power BI", "Looker"],
      },
    ],
    whyChooseUs: [
      {
        title: "Brand-aligned",
        description:
          "Agents trained to represent your brand with genuine care.",
      },
      {
        title: "Quality-assured",
        description: "Scoring and coaching on every channel and conversation.",
      },
      {
        title: "Omnichannel",
        description: "Phone, chat, and email handled in one workflow.",
      },
      {
        title: "Fully integrated",
        description: "Logged in your CRM so your team always has context.",
      },
    ],
  },
];

/** Look up a single service by its URL slug. */
export function getServiceBySlug(slug) {
  return SERVICES.find((service) => service.slug === slug);
}

/** All service slugs — used for static path generation. */
export function getServiceSlugs() {
  return SERVICES.map((service) => service.slug);
}

/** Other services to surface as "related" links on a detail page. */
export function getRelatedServices(slug, limit = 3) {
  return SERVICES.filter((service) => service.slug !== slug).slice(0, limit);
}
