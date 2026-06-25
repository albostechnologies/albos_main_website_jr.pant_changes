import { getWhatsAppUrl } from "@/lib/utils";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Technologies", href: "/technologies" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

// Services are defined in @/data/services and re-exported here so existing
// imports (ServicesSection, ExpertiseSection, ContactSection, Footer) keep working.
export { SERVICES } from "@/data/services";

export const STATS = [
  { value: 10, suffix: "+", label: "Years Active" },
  { value: 500, suffix: "+", label: "Projects Shipped" },
  { value: 320, suffix: "+", label: "Happy Clients" },
  { value: 12, suffix: "", label: "Industries" },
];

export { CASE_STUDIES } from "@/data/case-studies";

export const TECH_STACK = {
  web: {
    label: "Web Platform",
    categories: [
      {
        name: "Front-End",
        devCount: 44,
        techs: [
          { name: "React", color: "#61DAFB" },
          { name: "Next.js", color: "#FFFFFF" },
          { name: "Vue.js", color: "#4FC08D" },
          { name: "Angular", color: "#DD0031" },
          { name: "TypeScript", color: "#3178C6" },
          { name: "Tailwind CSS", color: "#06B6D4" },
        ],
      },
      {
        name: "Back-End",
        devCount: 38,
        techs: [
          { name: "Node.js", color: "#339933" },
          { name: "Python", color: "#3776AB" },
          { name: "Java", color: "#ED8B00" },
          { name: ".NET", color: "#512BD4" },
          { name: "NestJS", color: "#E0234E" },
          { name: "GraphQL", color: "#E10098" },
        ],
      },
    ],
  },
  database: {
    label: "Database",
    categories: [
      {
        name: "SQL",
        devCount: 30,
        techs: [
          { name: "PostgreSQL", color: "#4169E1" },
          { name: "MySQL", color: "#4479A1" },
          { name: "SQL Server", color: "#CC2927" },
        ],
      },
      {
        name: "NoSQL",
        devCount: 22,
        techs: [
          { name: "MongoDB", color: "#47A248" },
          { name: "Redis", color: "#DC382D" },
          { name: "Elasticsearch", color: "#005571" },
          { name: "DynamoDB", color: "#4053D6" },
        ],
      },
    ],
  },
  cloud: {
    label: "Cloud & DevOps",
    categories: [
      {
        name: "Cloud",
        devCount: 24,
        techs: [
          { name: "AWS", color: "#FF9900" },
          { name: "Azure", color: "#0078D4" },
          { name: "GCP", color: "#4285F4" },
        ],
      },
      {
        name: "DevOps",
        devCount: 20,
        techs: [
          { name: "Docker", color: "#2496ED" },
          { name: "Kubernetes", color: "#326CE5" },
          { name: "Terraform", color: "#7B42BC" },
          { name: "Jenkins", color: "#D24939" },
          { name: "GitHub Actions", color: "#2088FF" },
        ],
      },
    ],
  },
  mobile: {
    label: "Mobile Apps",
    categories: [
      {
        name: "Cross-Platform",
        devCount: 32,
        techs: [
          { name: "React Native", color: "#61DAFB" },
          { name: "Flutter", color: "#02569B" },
        ],
      },
      {
        name: "Native",
        devCount: 28,
        techs: [
          { name: "Swift", color: "#F05138" },
          { name: "Kotlin", color: "#7F52FF" },
          { name: "Objective-C", color: "#438EFF" },
          { name: "Java", color: "#ED8B00" },
        ],
      },
    ],
  },
};

export const AWARDS = [
  { name: "Clutch India", year: "2024", detail: "Top Developer" },
  { name: "ISO Certified", year: "2022", detail: "Quality Management" },
  { name: "NASSCOM Member", year: "2023", detail: "Industry Body" },
  { name: "Clutch", year: "2024", detail: "4.9★ Rating" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Albos Technologies Pvt Ltd transformed our entire digital infrastructure. Their team delivered a platform that handles 10M+ transactions daily without breaking a sweat.",
    name: "Sarah Chen",
    title: "CTO",
    company: "FinTrack Pro",
  },
  {
    quote:
      "Working with Albos was a game-changer. They didn't just build our app — they helped us rethink our entire approach to patient engagement.",
    name: "Dr. Michael Torres",
    title: "CEO",
    company: "MedConnect",
  },
  {
    quote:
      "The quality of engineering is outstanding. Our platform went from concept to 200K users in under a year, and it's never been down.",
    name: "Priya Sharma",
    title: "VP of Engineering",
    company: "EduSpark",
  },
  {
    quote:
      "Albos delivered our supply chain platform on time and under budget. Their Pune team is world-class — responsive, skilled, and genuinely invested in our success.",
    name: "James Rodriguez",
    title: "COO",
    company: "LogiFlow",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    duration: "1–2 weeks",
    description:
      "We dive deep into your business goals, user needs, and technical requirements. Stakeholder interviews, competitive analysis, and technical audits set the foundation.",
    deliverables: [
      "Requirements Document",
      "Technical Architecture",
      "Project Roadmap",
    ],
  },
  {
    number: "02",
    title: "Design",
    duration: "1–3 weeks",
    description:
      "Our design team creates wireframes, prototypes, and a visual design system. Every screen is crafted for usability, accessibility, and brand alignment.",
    deliverables: ["Wireframes", "UI/UX Prototypes", "Design System"],
  },
  {
    number: "03",
    title: "Build",
    duration: "4–16 weeks",
    description:
      "Agile sprints deliver working software incrementally. Daily standups, code reviews, and continuous integration ensure quality at every step.",
    deliverables: ["Working Software", "API Documentation", "Test Reports"],
  },
  {
    number: "04",
    title: "Scale",
    duration: "Ongoing",
    description:
      "Post-launch support, performance optimization, and feature iteration. We monitor, measure, and evolve your product for sustained growth.",
    deliverables: ["Performance Reports", "Feature Roadmap", "24/7 Support"],
  },
];

export const TEAM_MEMBERS = [
  { name: "ChandraPrakash Singh Tomar", role: "Founder & CEO" },
  { name: "Maria Santos", role: "CTO" },
  { name: "David Kim", role: "VP of Engineering" },
  { name: "Rachel Green", role: "Head of Design" },
  { name: "Ahmed Hassan", role: "Lead Architect" },
  { name: "Lisa Wang", role: "Head of AI/ML" },
  { name: "James O'Brien", role: "VP of Sales" },
  { name: "Priya Patel", role: "Head of QA" },
];

export const INDUSTRIES = [
  { name: "HealthTech", icon: "Heart", projects: 45 },
  { name: "FinTech", icon: "DollarSign", projects: 62 },
  { name: "EdTech", icon: "GraduationCap", projects: 38 },
  { name: "Retail", icon: "ShoppingCart", projects: 55 },
  { name: "Manufacturing", icon: "Factory", projects: 30 },
  { name: "Logistics", icon: "Truck", projects: 42 },
  { name: "Real Estate", icon: "Building2", projects: 28 },
  { name: "Media", icon: "Play", projects: 35 },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Building Scalable Microservices with Kubernetes",
    category: "Engineering",
    excerpt:
      "A deep dive into production-tested patterns for microservices architecture on Kubernetes clusters.",
    author: "Alex Volkov",
    date: "2024-12-15",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "The Future of AI in Enterprise Software",
    category: "AI & ML",
    excerpt:
      "How LLMs and generative AI are reshaping the enterprise software landscape in 2025.",
    author: "Lisa Wang",
    date: "2024-12-10",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Design Systems That Scale",
    category: "Design",
    excerpt:
      "Lessons from building design systems for Fortune 500 companies with 100+ components.",
    author: "Rachel Green",
    date: "2024-12-05",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Cloud Migration: A CTO's Playbook",
    category: "Cloud",
    excerpt:
      "Step-by-step strategies for migrating legacy systems to cloud infrastructure without downtime.",
    author: "Maria Santos",
    date: "2024-11-28",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 5,
    title: "React Native vs Flutter in 2025",
    category: "Product",
    excerpt:
      "An honest comparison based on shipping 50+ mobile apps with both frameworks.",
    author: "David Kim",
    date: "2024-11-20",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 6,
    title: "HIPAA-Compliant Software Development",
    category: "Engineering",
    excerpt:
      "How we built a telehealth platform serving 50K+ patients while maintaining full HIPAA compliance.",
    author: "Ahmed Hassan",
    date: "2024-11-15",
    readTime: "9 min read",
    featured: false,
  },
];

export const COMPANY_VALUES = [
  {
    title: "Outcome-Obsessed",
    description:
      "We measure success by the results your product achieves, not just clean commits and closed tickets.",
    icon: "Target",
  },
  {
    title: "Security First",
    description:
      "Every codebase ships OWASP-compliant with encrypted data, RBAC, and audit-ready infrastructure as the default.",
    icon: "Shield",
  },
  {
    title: "Radical Honesty",
    description:
      "We tell you when an idea won't work, when a scope is too wide, and when a timeline is unrealistic. You deserve to know.",
    icon: "Eye",
  },
  {
    title: "Speed Without Debt",
    description:
      "Agile 2-week sprints, automated testing, CI/CD from day one. Fast delivery without storing tech debt for later.",
    icon: "Zap",
  },
  {
    title: "Ownership Mindset",
    description:
      "Every engineer treats the project as their own. We ship code we're proud of and stand behind it.",
    icon: "Code2",
  },
  {
    title: "Continuous Learning",
    description:
      "Weekly tech talks, conference budgets, and dedicated R&D time keep us at the cutting edge.",
    icon: "BookOpen",
  },
];

export const CLIENT_LOGOS = [
  "NovaTech",
  "Vertex Solutions",
  "Axiom Digital",
  "Meridian Systems",
  "Apex Global",
  "Stratos Inc",
  "Pinnacle Corp",
  "Helix Partners",
  "Prism Labs",
  "Orion Group",
  "Catalyst AI",
  "Summit Software",
];

export const CONTACT_INFO = {
  phone: "+91 97666 50411",
  whatsapp: "+91 97666 50411",
  whatsappUrl: getWhatsAppUrl("+91 97666 50411"),
  email: "info@albostechnologies.com",
  projectEmail: "project@albostechnologies.com",
  hrEmail: "hr@albostechnologies.com",
  offices: [
    { city: "Pune", address: "Kunal Plaza, Pune MH 411019", teamSize: 250 },
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/albos-technologies-4b7717412",
    youtube: "https://www.youtube.com/@albostechnologies16",
    facebook: "https://www.facebook.com/Albos5412",
    twitter: "https://twitter.com/albostechnologies",
    github: "https://github.com/albostechnologies",
    dribbble: "https://dribbble.com/albostech",
  },
  hours: "Mon – Sat, 10:00 AM – 7:00 PM IST",
  founded: 2014,
  clutchRating: "4.9",
  clutchReviews: 320,
  countries: 18,
  retentionRate: 98,
  certifications: ["ISO Certified", "NASSCOM Member"],
  ceo: "ChandraPrakash Singh Tomar",
  description:
    "Full-stack software engineering company based in Pune, India. Founded in 2014, Albos Technologies Pvt Ltd has shipped 500+ digital products for startups and enterprises across 12 industries and 18 countries.",
};
