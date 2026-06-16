"use client";

import { useState } from "react";

// Stable Simple Icons slugs for the technologies we showcase. Rendered from the
// Simple Icons CDN (brand colour by default). Anything not mapped — or any logo
// that fails to load — falls back to a tidy monogram badge, so the UI never
// shows a broken image.
const TECH_SLUGS = {
  React: "react",
  "Next.js": "nextdotjs",
  "Vue.js": "vuedotjs",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  "Node.js": "nodedotjs",
  Laravel: "laravel",
  Django: "django",
  ".NET": "dotnet",
  NestJS: "nestjs",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Redis: "redis",
  AWS: "amazonwebservices",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Swift: "swift",
  SwiftUI: "swift",
  Kotlin: "kotlin",
  "Jetpack Compose": "jetpackcompose",
  Flutter: "flutter",
  "React Native": "react",
  Firebase: "firebase",
  GraphQL: "graphql",
  // additional services
  Solidity: "solidity",
  Ethereum: "ethereum",
  Solana: "solana",
  Polygon: "polygon",
  Chainlink: "chainlink",
  IPFS: "ipfs",
  Unity: "unity",
  Unreal: "unrealengine",
  Salesforce: "salesforce",
  "Apache Kafka": "apachekafka",
  RabbitMQ: "rabbitmq",
  gRPC: "grpc",
  // IoT & Embedded
  Arduino: "arduino",
  "Raspberry Pi": "raspberrypi",
  MQTT: "mqtt",
  Bluetooth: "bluetooth",
  Azure: "microsoftazure",
  InfluxDB: "influxdb",
  Grafana: "grafana",
  // Game development
  Godot: "godotengine",
  Lua: "lua",
  Blender: "blender",
  OpenGL: "opengl",
  Photoshop: "adobephotoshop",
  // Digital marketing
  "Google Ads": "googleads",
  Meta: "meta",
  LinkedIn: "linkedin",
  "Google Search Console": "googlesearchconsole",
  Semrush: "semrush",
  Ahrefs: "ahrefs",
  "Google Analytics": "googleanalytics",
  "Tag Manager": "googletagmanager",
  WordPress: "wordpress",
  HubSpot: "hubspot",
  Mailchimp: "mailchimp",
  // ERP / CRM & automation
  SAP: "sap",
  Zapier: "zapier",
  n8n: "n8n",
  // Telecalling & support
  Twilio: "twilio",
  Asterisk: "asterisk",
  Zendesk: "zendesk",
  Intercom: "intercom",
  Zoho: "zoho",
  "Power BI": "powerbi",
};

export function TechLogo({ name, className = "" }) {
  const [errored, setErrored] = useState(false);
  const slug = TECH_SLUGS[name];

  if (!slug || errored) {
    return (
      <span
        aria-hidden="true"
        className={`flex size-5 shrink-0 items-center justify-center rounded bg-[#F97316]/10 font-[family-name:var(--font-jetbrains-mono)] text-[8px] font-bold text-[#F97316] ${className}`}
      >
        {name
          .replace(/[^A-Za-z]/g, "")
          .slice(0, 2)
          .toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={`${name} logo`}
      width={20}
      height={20}
      loading="lazy"
      className={`size-5 shrink-0 object-contain transition-transform duration-300 ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
