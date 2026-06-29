// Single source of truth for the company's services.
//
// The base fields (id, title, slug, description, capabilities, locations,
// metric, techStack) are consumed across the site (ServicesSection,
// ExpertiseSection, ContactSection, Footer). The richer fields (tagline,
// overview, outcomes, faqs, content, icon) power the dedicated /services/[slug] pages.
//
// `SERVICES` is re-exported from "@/lib/constants" for backwards compatibility.

export const SERVICES = [
  {
    id: "01",
    title: "Web App Development",
    slug: "web-app-development",
    seo: {
      metaTitle:
        "Web App Development Company | Best Web App Developers | Albos Tech",
      metaDescription:
        "Web app development services by the best web app developers. We build secure, scalable web applications and android app development website solutions that drive growth.",
      focusKeyword: "web app development",
      keywords: [
        "app making websites",
        "best web app developers",
        "android app development website",
      ],
    },
    icon: "Globe",
    tagline: "Fast, scalable web platforms engineered for growth.",
    description:
      "High-performance web applications built with modern frameworks. From progressive web apps to complex enterprise portals, we deliver scalable solutions that drive business growth.",
    overview:
      "In today's digital-first world, businesses need powerful, scalable, and user-friendly web applications to stay competitive. At Albos Technologies, we specialize in building high-performance web applications that help organizations streamline operations, improve customer engagement, and accelerate business growth. Our team combines modern technologies, responsive design, and agile development methodologies to deliver secure and future-ready solutions.",
    content: [
      "As one of the best web app developers, we create custom solutions tailored to your unique business requirements. Whether you need a customer portal, enterprise platform, SaaS application, eCommerce solution, or progressive web app, our developers ensure seamless functionality across all devices and browsers. Our expertise in frontend and backend technologies enables us to develop fast, reliable, and scalable applications that deliver exceptional user experiences.",
      "We also provide comprehensive android app development website solutions, helping businesses extend their digital presence beyond the web. Our integrated approach ensures your web and mobile applications work together seamlessly, providing a consistent user experience and maximizing customer engagement. From concept and UI/UX design to development, testing, deployment, and ongoing support, we manage the entire development lifecycle.",
      "If you're looking for a trusted partner for app making websites, Albos Technologies delivers innovative web applications designed to drive growth, improve efficiency, and support your long-term business objectives. Let us transform your ideas into powerful digital solutions that create measurable results and give your business a competitive advantage in the evolving digital landscape.",
    ],
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
    seo: {
      metaTitle:
        "Mobile App Development Company | Best App Developers | Albos Tech",
      metaDescription:
        "Mobile app development services by the best app developers. We build high-performance Android and iOS apps and help businesses build your own app with no coding.",
      focusKeyword: "mobile app development",
      keywords: [
        "build your own app no coding",
        "the best app developers",
        "online android app development platform",
      ],
    },
    icon: "Smartphone",
    tagline: "Native-quality apps for iOS and Android.",
    description:
      "Native and cross-platform mobile applications for iOS and Android. We build polished, high-performance apps that users love, from MVPs to enterprise-grade solutions.",
    overview:
      "In today's mobile-driven world, businesses need innovative and user-friendly mobile applications to engage customers, improve operational efficiency, and drive growth. At Albos Technologies, we provide custom mobile app development services designed to transform your ideas into powerful digital solutions. Our experienced team develops high-performance Android and iOS applications that deliver seamless user experiences, robust functionality, and long-term scalability.",
    content: [
      "As one of the best app developers, we specialize in creating feature-rich mobile applications tailored to meet the unique needs of startups, small businesses, and enterprises. From concept validation and UI/UX design to development, testing, and deployment, we ensure every app is built with quality, security, and performance in mind. Whether you want to launch a customer-facing application or an enterprise mobility solution, our experts can help bring your vision to life.",
      "Businesses looking to build your own app no coding can also benefit from our consultation services, where we help identify the right technology approach and development strategy for their goals. Additionally, we leverage modern tools and frameworks similar to an online android app development platform to accelerate development while maintaining flexibility and customization.",
      "Partner with Albos Technologies to create innovative mobile applications that enhance customer engagement, strengthen your brand presence, and support sustainable business growth in today's competitive digital marketplace.",
    ],
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
    seo: {
      metaTitle:
        "Blockchain Development Company | Web3 & Smart Contract Services | Albos Tech",
      metaDescription:
        "Blockchain and Web3 development services — smart contracts, DeFi protocols, NFT platforms, and dApps. Secure, audited solutions by experienced blockchain developers.",
      focusKeyword: "blockchain development services",
      keywords: ["crypto ledger", "ledger for crypto"],
    },
    icon: "Boxes",
    tagline: "Secure decentralized apps and smart contracts.",
    description:
      "Decentralized applications and smart contracts built for the next generation of the web. From DeFi protocols to NFT platforms, we engineer secure blockchain solutions.",
    overview:
      "The future of digital business is being shaped by blockchain technology and decentralized applications. At Albos Technologies, we provide advanced Blockchain and Web3 development services that help businesses build secure, transparent, and scalable digital solutions. Our team specializes in creating decentralized applications (dApps), smart contracts, NFT platforms, cryptocurrency solutions, and enterprise blockchain systems tailored to your business needs.",
    content: [
      "As organizations increasingly explore blockchain technology, the demand for secure asset management and transaction tracking continues to grow. Businesses and investors often seek solutions to find crypto ledger systems that offer transparency, security, and efficient recordkeeping. Our blockchain experts develop customized platforms that enable secure digital transactions while maintaining complete data integrity and trust.",
      "We also build innovative solutions inspired by the concept of a ledger for crypto, helping businesses manage digital assets, streamline operations, and improve transaction verification processes. By leveraging modern blockchain frameworks and Web3 technologies, we create decentralized ecosystems that enhance security, reduce operational costs, and improve user confidence.",
      "Whether you're launching a cryptocurrency platform, developing smart contracts, creating a DeFi application, or building a blockchain-powered business solution, Albos Technologies delivers end-to-end development services. Our focus on innovation, security, and scalability ensures your Web3 project is ready for the evolving digital economy and positioned for long-term success.",
    ],
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
    seo: {
      metaTitle:
        "API & Integration Services | Custom API Development | Albos Tech",
      metaDescription:
        "API and integration services that connect CRMs, ERPs, payment gateways and cloud platforms. We build secure, scalable custom API solutions, including DroneKit integrations.",
      focusKeyword: "api and integration services",
      keywords: ["DroneKit"],
    },
    icon: "Webhook",
    tagline: "Robust APIs and seamless system integrations.",
    description:
      "Robust, scalable APIs and seamless system integrations. We design and build RESTful services, GraphQL endpoints, and microservice architectures that power modern businesses.",
    overview:
      "Modern businesses rely on multiple software platforms, cloud applications, and digital tools to operate efficiently. At Albos Technologies, we provide comprehensive API and Integration services that help organizations connect their systems, automate workflows, and improve data exchange across various platforms. Our expert developers build secure, scalable, and high-performance integrations that enhance productivity and streamline business operations.",
    content: [
      "We specialize in connecting CRMs, ERPs, payment gateways, eCommerce platforms, cloud services, mobile applications, and third-party software through custom API solutions. By enabling seamless communication between systems, businesses can eliminate manual processes, reduce errors, and gain real-time access to critical data. Our integration services are designed to support growth while ensuring reliability, security, and optimal performance.",
      "For businesses working with advanced technologies, including IoT and unmanned systems, we also develop integrations compatible with platforms such as DroneKit, enabling efficient communication between software applications and drone-based systems. Whether you require data synchronization, cloud connectivity, automation workflows, or custom middleware solutions, our team delivers tailored integration strategies that meet your operational requirements.",
      "At Albos Technologies, we follow industry best practices to ensure secure API development and seamless system interoperability. From planning and development to deployment and ongoing support, we help businesses create connected digital ecosystems that improve efficiency, enhance customer experiences, and drive innovation.",
    ],
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
    seo: {
      metaTitle:
        "IoT & API Development Services for Smart Business Solutions | Albos Tech",
      metaDescription:
        "IoT & API development services delivering secure device connectivity, real-time data exchange, seamless integrations and scalable solutions for business growth.",
      focusKeyword: "iot api development services",
      keywords: ["iot router", "firebeetle esp32"],
    },
    icon: "Cpu",
    tagline: "Connected devices that bridge physical and digital.",
    description:
      "Connected devices and embedded systems that bridge the physical and digital worlds. From sensor networks to edge computing, we build intelligent IoT ecosystems.",
    overview:
      "The Internet of Things (IoT) is transforming the way businesses connect devices, collect data, and automate operations. At Albos Technologies, we provide innovative IoT and Embedded Systems development services that help organizations build intelligent, connected ecosystems for improved efficiency, productivity, and decision-making. Our solutions are designed to enable real-time monitoring, remote control, and seamless communication between devices and applications.",
    content: [
      "Our experienced engineers develop custom IoT platforms, embedded software, sensor integrations, edge computing solutions, and cloud-connected systems tailored to diverse industry requirements. Whether you need smart industrial automation, healthcare monitoring, logistics tracking, or smart home applications, we create scalable and secure IoT architectures that support long-term business growth.",
      "We work with a wide range of IoT hardware and communication technologies, including advanced IoT routers that ensure reliable connectivity and efficient data transmission across networks. Our expertise also extends to popular development boards such as FireBeetle ESP32, enabling rapid prototyping and deployment of intelligent connected devices. By combining robust hardware integration with powerful software development, we deliver solutions that maximize performance and operational efficiency.",
      "At Albos Technologies, we focus on innovation, security, and scalability throughout the IoT development lifecycle. From concept and device design to deployment and maintenance, we help businesses leverage connected technologies to create smarter operations, improve customer experiences, and gain a competitive advantage in the digital era.",
    ],
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
    seo: {
      metaTitle:
        "Game Development Company | Game Development Services | Albos Tech",
      metaDescription:
        "Professional game development services for mobile, web, PC and console. We build immersive games using AI in game development and industry-leading tools.",
      focusKeyword: "game development services",
      keywords: [
        "pc for game development",
        "free game development software",
        "ai in game development",
      ],
    },
    icon: "Gamepad2",
    tagline: "Immersive games across mobile, desktop, and XR.",
    description:
      "Immersive gaming experiences across platforms. From casual mobile games to complex AR/VR simulations, we bring creative visions to life with cutting-edge game engines.",
    overview:
      "The gaming industry continues to evolve rapidly, creating new opportunities for businesses, startups, and entertainment brands to engage audiences through immersive digital experiences. At Albos Technologies, we offer professional game development services that transform innovative ideas into high-quality, interactive games for multiple platforms. Our experienced developers, designers, and artists work together to create engaging gameplay, stunning visuals, and seamless performance across mobile, web, PC, and console environments.",
    content: [
      "Our game development solutions cover the entire production lifecycle, including concept design, character creation, game mechanics, UI/UX design, coding, testing, deployment, and post-launch support. Whether you're building casual games, multiplayer experiences, educational games, or enterprise gamification solutions, we deliver customized products tailored to your business goals.",
      "We leverage advanced technologies and optimize development workflows to ensure compatibility with modern PCs for game development, enabling efficient production and high-performance gaming experiences. Our team also utilizes industry-leading tools, including popular and free game development software, to accelerate development while maintaining exceptional quality standards. Additionally, we integrate AI in game development to enhance player behavior, create intelligent NPCs, personalize gameplay experiences, and improve overall game performance.",
      "At Albos Technologies, we focus on creativity, innovation, and technical excellence to deliver games that captivate users and drive engagement. Our goal is to help businesses launch successful gaming products that stand out in today's competitive digital entertainment market.",
    ],
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
    seo: {
      metaTitle: "Digital Marketing Services Company in India | Albos Tech",
      metaDescription:
        "Digital marketing services helping businesses increase online visibility, generate quality leads, improve rankings and drive measurable business growth.",
      focusKeyword: "digital marketing services",
      keywords: [
        "digital advertising display screens",
        "ai digital marketing",
        "digital marketing analytics",
      ],
    },
    icon: "Megaphone",
    tagline: "Data-driven growth that compounds.",
    description:
      "Data-driven digital marketing strategies that amplify your brand and drive measurable growth. From SEO to paid campaigns, we optimize every touchpoint for conversions.",
    overview:
      "In today's competitive digital landscape, businesses need more than just an online presence—they need a strategic marketing approach that drives visibility, engagement, and conversions. At Albos Technologies, we provide comprehensive Digital Marketing and SEO services designed to help businesses attract qualified leads, strengthen brand awareness, and achieve sustainable growth across digital channels.",
    content: [
      "Our team develops customized marketing strategies that combine search engine optimization, content marketing, social media management, pay-per-click advertising, email campaigns, and conversion optimization. By leveraging advanced AI digital marketing technologies, we analyze customer behavior, automate marketing processes, and create highly targeted campaigns that deliver measurable results. This data-driven approach helps businesses maximize their return on investment while improving customer engagement.",
      "We also support businesses looking to expand their brand presence through innovative solutions, including campaigns integrated with digital advertising display screens and other digital media channels. These strategies help create consistent brand messaging across both online and offline customer touchpoints.",
      "To ensure continuous improvement, we utilize advanced digital marketing analytics tools that provide valuable insights into campaign performance, audience behavior, website traffic, and conversion trends. This enables businesses to make informed decisions and optimize their marketing efforts for maximum effectiveness.",
      "At Albos Technologies, our goal is to help businesses build a strong digital presence, generate quality leads, and achieve long-term success through innovative marketing solutions tailored to their unique objectives.",
    ],
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
    seo: {
      metaTitle:
        "ERP & CRM Development Services for Business Automation | Albos Tech",
      metaDescription:
        "ERP and CRM development services delivering streamlined workflows, customer management, process automation and improved operational efficiency.",
      focusKeyword: "erp crm development services",
      keywords: [
        "erp system",
        "erp vs crm",
        "best erp and crm for small business",
        "erp crm for small business",
      ],
    },
    icon: "Building2",
    tagline: "Unify your operations and customer data.",
    description:
      "Enterprise resource planning and customer relationship management systems tailored to your workflows. We automate processes and unify data across your organization.",
    overview:
      "Efficient business management requires the right tools to streamline operations, improve customer relationships, and support sustainable growth. At Albos Technologies, we provide customized ERP and CRM development services that help businesses automate processes, centralize data, and enhance decision-making. Our solutions are designed to improve productivity, reduce operational costs, and deliver a seamless experience across departments.",
    content: [
      "A modern ERP system enables businesses to manage critical functions such as finance, inventory, procurement, human resources, sales, and operations from a single platform. By integrating business processes into one centralized system, organizations can gain real-time insights, improve efficiency, and make data-driven decisions faster. Our ERP solutions are scalable and tailored to meet the unique requirements of startups, SMEs, and large enterprises.",
      "Many businesses often compare ERP vs CRM when selecting the right technology solution. While ERP focuses on streamlining internal operations and resource management, CRM is designed to enhance customer interactions, sales performance, and customer retention. At Albos Technologies, we develop integrated ERP and CRM platforms that provide the benefits of both systems in a unified solution.",
      "Recognized among providers of the best ERP and CRM for small business, we create flexible and cost-effective ERP CRM for small business solutions that help companies manage growth efficiently. From implementation and customization to integration and support, our experts ensure your business has the technology foundation needed for long-term success.",
    ],
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
    seo: {
      metaTitle:
        "Telecalling Support Services | Telecalling Outsourcing | Albos Tech",
      metaDescription:
        "Professional telecalling support services for inbound and outbound calls. Reliable telecalling outsourcing services with an integrated telecaller management system.",
      focusKeyword: "telecalling support services",
      keywords: [
        "telecalling job",
        "telecalling outsourcing",
        "telecaller management system",
      ],
    },
    icon: "Headset",
    tagline: "Customer support that protects your brand.",
    description:
      "Professional customer support and telecalling services that keep your clients satisfied. From inbound support to outbound campaigns, we represent your brand with excellence.",
    overview:
      "Effective communication is essential for building strong customer relationships and driving business growth. At Albos Technologies, we provide professional Telecalling Support Services that help businesses connect with customers, generate qualified leads, improve customer satisfaction, and increase sales opportunities. Our dedicated telecalling team is trained to handle inbound and outbound calls with professionalism, ensuring a positive experience for every customer interaction.",
    content: [
      "Our services cover lead generation, appointment scheduling, customer support, follow-up calls, survey campaigns, and sales assistance. Whether you are a startup, small business, or enterprise, our telecalling solutions are designed to streamline communication processes and improve operational efficiency. Businesses seeking reliable telecalling outsourcing services can leverage our experienced team to reduce operational costs while maintaining high-quality customer engagement.",
      "We also provide advanced solutions integrated with a telecaller management system, enabling businesses to monitor performance, track customer interactions, manage call records, and optimize team productivity. These systems help organizations improve response times, increase conversion rates, and maintain consistent service quality across all customer touchpoints.",
      "For organizations looking to expand customer outreach or support teams, our expertise in managing telecalling job operations ensures efficient workforce management and effective communication strategies. At Albos Technologies, we combine technology, skilled professionals, and customer-focused processes to deliver telecalling services that strengthen customer relationships, enhance brand reputation, and support long-term business growth.",
    ],
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

/** Image paths used on /services — single source of truth for listing and detail pages. */
const SERVICE_IMAGE_OVERRIDES = {
  "erp-crm-systems": "/images/services/erp-crm-systems.jpg",
  "telecalling-support": "/images/services/telecalling-support.jpg",
};

/** Returns the hero/card image for a service (matches the /services listing page). */
export function getServiceImage(slug) {
  return SERVICE_IMAGE_OVERRIDES[slug] ?? `/images/services/${slug}.png`;
}

/** Open Graph / social share image (high-res JPG variant). */
export function getServiceOgImage(slug) {
  return `/images/services/${slug}.jpg`;
}

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
