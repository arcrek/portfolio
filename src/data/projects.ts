export interface ProjectItem {
  id: string;
  repoSlug: string;
  title: string;
  tagline: string;
  primaryCategory: "Cloud Architecture" | "Automation & RPA" | "AI & Tools" | "Backend Systems";
  featured: boolean;
  metrics: string[];
  techStack: string[];
  recruiterView: {
    problemStatement: string;
    architectureSolution: string;
    keyTechnicalDecisions: string[];
    performanceHighlights: string[];
    githubUrl: string;
    demoUrl?: string;
  };
  servicesView: {
    businessProblem: string;
    solutionDelivered: string;
    roiImpact: string;
    useCases: string[];
    deliverables: string[];
  };
}

export const CURATED_PROJECTS: ProjectItem[] = [
  {
    id: "tmail",
    repoSlug: "arcrek/tmail",
    title: "tmail — Ephemeral Mail & JMAP Gateway",
    tagline: "Passwordless disposable email engine with automated Postfix & Stalwart JMAP domain provisioning",
    primaryCategory: "Cloud Architecture",
    featured: true,
    metrics: ["100% Passwordless", "< 35ms Delivery Latency", "Zero Persistent Disk Footprint"],
    techStack: ["Python", "FastAPI", "Stalwart JMAP", "Postfix MTA", "Docker", "Redis TTL"],
    recruiterView: {
      problemStatement: "Traditional temporary mail architectures require persistent SMTP polling, complex user account management, and suffer from high storage degradation under spam volume.",
      architectureSolution: "Engineered an event-driven mail processing backend integrating Postfix MTA with the modern Stalwart JMAP protocol. Incoming emails stream directly into in-memory Redis buffers governed by strict TTL eviction, bypassing slow disk I/O.",
      keyTechnicalDecisions: [
        "Cryptographic token-based session auth replacing database credentials",
        "JMAP event push streaming via WebSocket/SSE instead of client IMAP polling",
        "Automated domain DNS lifecycle provisioning with Docker container sandboxing"
      ],
      performanceHighlights: [
        "Sustains 500+ concurrent inbound SMTP streams with < 40MB RAM footprint",
        "Sub-50ms end-to-end email arrival to web UI"
      ],
      githubUrl: "https://github.com/arcrek/tmail"
    },
    servicesView: {
      businessProblem: "Businesses and QA teams lose hours dealing with inbox spam, verifying signup flows across multiple domains, or paying exorbitant monthly SaaS fees for disposable email APIs.",
      solutionDelivered: "A turnkey, self-hosted temporary email infrastructure that gives your team unlimited programmatic inboxes with zero maintenance or third-party tracking.",
      roiImpact: "Eliminates $200+/month third-party testing API subscriptions and accelerates automated integration test suites by 3x.",
      useCases: [
        "Automated QA signup & password-reset integration testing",
        "Spam-proof lead generation testing & disposable verification",
        "High-volume privacy-first webhook and email routing"
      ],
      deliverables: [
        "One-click Docker Compose production deployment",
        "REST API & WebSocket SDK documentation",
        "Automated DNS & TLS certificate renewal scripts"
      ]
    }
  },
  {
    id: "google-automation-suite",
    repoSlug: "arcrek/google-automation-suite",
    title: "Google Cloud & Billing Automation Suite",
    tagline: "Enterprise workflow automation: PSC verification, multi-account subscription management & automated payment teardown",
    primaryCategory: "Automation & RPA",
    featured: true,
    metrics: ["95% Time Reduction", "Zero Unintended Billing Charges", "Multi-Tenant Cloud Sync"],
    techStack: ["Python", "Playwright", "Google Cloud APIs", "AsyncIO", "Secure Keyring"],
    recruiterView: {
      problemStatement: "Managing hundreds of ephemeral cloud tenants, testing payment profiles, and verifying Private Service Connect (PSC) routing manually is error-prone and leads to runaway cloud costs.",
      architectureSolution: "Developed a resilient automation suite combining authenticated reverse-engineered Google management APIs with headless browser automation, using an asynchronous execution queue and exponential retry backoff.",
      keyTechnicalDecisions: [
        "Stateless credential injection via system keyring and encrypted session tokens",
        "Concurrency worker pools with strict rate-limiting to prevent vendor API throttling",
        "Automated state reconciliation engine ensuring zero orphaned cloud resources"
      ],
      performanceHighlights: [
        "Processes 50+ billing teardowns and subscription audits in under 90 seconds",
        "Zero token leaks through strict memory-only session handling"
      ],
      githubUrl: "https://github.com/arcrek/google-automation-suite"
    },
    servicesView: {
      businessProblem: "DevOps and agencies handling multiple client Google Cloud accounts frequently overspend due to forgotten test subscriptions and hours lost in cumbersome administrative web consoles.",
      solutionDelivered: "Custom robotic process automation (RPA) that audits, closes out unused subscriptions, and reconciles payment profiles automatically.",
      roiImpact: "Saves 15+ administrative engineering hours per week and prevents thousands in unexpected cloud billing overages.",
      useCases: [
        "Automated agency onboarding & client offboarding",
        "End-of-month cloud billing audit and profile teardown",
        "Automated network health & PSC connectivity health checks"
      ],
      deliverables: [
        "CLI tool and background cron daemon",
        "Slack/Telegram webhook alert integration",
        "Audit logging to secure CSV/JSON sheets"
      ]
    }
  },
  {
    id: "zoom-automation-suite",
    repoSlug: "arcrek/zoom-automation-suite",
    title: "Enterprise Zoom Automation Platform",
    tagline: "End-to-end meeting lifecycle orchestration, attendee telemetry & automatic recording asset distribution",
    primaryCategory: "Automation & RPA",
    featured: true,
    metrics: ["100% Automated Distribution", "Sub-second Webhook Processing", "Zero Human Handoff"],
    techStack: ["Python", "Zoom REST API", "Webhooks", "FFmpeg", "AWS S3 / Cloudflare R2"],
    recruiterView: {
      problemStatement: "Post-meeting workflows (recording downloads, transcode compression, participant verification, and asset sharing) typically require fragile manual intervention across siloed services.",
      architectureSolution: "Constructed a high-throughput webhook consumer that captures meeting completion events, securely retrieves cloud recordings, orchestrates audio-video normalizations via FFmpeg, and uploads to object storage.",
      keyTechnicalDecisions: [
        "HMAC SHA-256 webhook signature validation to reject untrusted events",
        "Async background job worker pipeline with dead-letter queue recovery",
        "Chunked multipart streaming uploads to object storage minimizing server memory"
      ],
      performanceHighlights: [
        "Processes 2GB+ video recordings in under 2 minutes post-event",
        "Zero dropped events under spike meeting loads"
      ],
      githubUrl: "https://github.com/arcrek/zoom-automation-suite"
    },
    servicesView: {
      businessProblem: "Coaches, consultants, and enterprise teams waste hours manually downloading Zoom calls, renaming files, uploading to Google Drive, and emailing links to attendees.",
      solutionDelivered: "A hands-off pipeline that instantly processes every finished meeting, archives it to your branded cloud drive, and emails custom links to all verified attendees.",
      roiImpact: "Reduces post-meeting administrative tasks from 30 minutes per meeting to 0 seconds.",
      useCases: [
        "Client coaching calls and consulting session distribution",
        "Webinar recording archive and automated attendee follow-up",
        "Internal team knowledge base video synchronization"
      ],
      deliverables: [
        "Dedicated webhook server with SSL certificate setup",
        "Branded email notification templates with dynamic download links",
        "Cloudflare R2 / S3 storage integration with 90% cheaper hosting costs"
      ]
    }
  },
  {
    id: "renew-inapp",
    repoSlug: "arcrek/renew-inapp",
    title: "In-App Subscription Lifecycle Engine",
    tagline: "Asynchronous receipt verification, entitlement sync & automated auto-renew reconciliation engine",
    primaryCategory: "Backend Systems",
    featured: false,
    metrics: ["100% Idempotent Processing", "Zero Revenue Leakage", "Sub-100ms Receipt Verification"],
    techStack: ["Python", "FastAPI", "PostgreSQL", "App Store Server API", "Google Play Developer API"],
    recruiterView: {
      problemStatement: "In-app purchases on iOS and Android suffer from edge-case synchronization issues, network timeouts during renewal, and complex multi-environment receipt structures.",
      architectureSolution: "Implemented an idempotent receipt verification service interfacing directly with Apple and Google server notification v2 webhooks, maintaining an immutable ledger of subscription states.",
      keyTechnicalDecisions: [
        "Database-level idempotency keys guarding against duplicate webhook deliveries",
        "Real-time signature validation for Apple JWS tokens and Google pub/sub messages",
        "Grace-period and billing retry state machine modeling"
      ],
      performanceHighlights: [
        "Verifies cryptographic purchase proofs in < 85ms",
        "Guaranteed at-least-once webhook processing with zero double-entitlements"
      ],
      githubUrl: "https://github.com/arcrek/renew-inapp"
    },
    servicesView: {
      businessProblem: "Mobile app founders lose up to 10% of recurring revenue due to failed renewal reconciliations, chargeback handling bugs, and fraudulent client receipt manipulations.",
      solutionDelivered: "A battle-tested server-side subscription validation engine that protects your mobile and web subscription revenue with 100% auditability.",
      roiImpact: "Recovers 5–12% of lost subscription revenue and eliminates fraud risks from client-only verification shortcuts.",
      useCases: [
        "Cross-platform iOS and Android subscription unlocking",
        "Automated cancellation and chargeback handling",
        "Custom discount offering and churn prevention campaigns"
      ],
      deliverables: [
        "FastAPI backend microservice with PostgreSQL schema",
        "Apple & Google webhook setup and testing harness",
        "Client SDK integration guides for React Native / Flutter / Web"
      ]
    }
  },
  {
    id: "ai-kit",
    repoSlug: "arcrek/ai-kit",
    title: "AI Agent Orchestration & Prompt Toolkit",
    tagline: "Lightweight, composable agent execution framework with schema-driven tool calling and streaming cache",
    primaryCategory: "AI & Tools",
    featured: false,
    metrics: ["< 200ms TTFT", "Type-Safe Tool Schemas", "Multi-Provider Router"],
    techStack: ["TypeScript", "Node.js", "OpenAI / Anthropic APIs", "Zod", "Streaming SSE"],
    recruiterView: {
      problemStatement: "Most commercial LLM wrappers are bloated, hide execution traces, and make structured tool execution unpredictable and difficult to test.",
      architectureSolution: "Architected a zero-dependency TypeScript toolkit that standardizes prompt templates, dynamic memory contexts, and type-safe tool execution using strict Zod schemas.",
      keyTechnicalDecisions: [
        "Declarative tool registration with automatic JSON-schema synthesis",
        "Streaming response parser with backpressure support and mid-stream tool execution",
        "Deterministic mock runners for rapid unit testing without API credit consumption"
      ],
      performanceHighlights: [
        "Zero runtime framework dependencies, 8KB bundle footprint",
        "Consistent sub-200ms time-to-first-token (TTFT)"
      ],
      githubUrl: "https://github.com/arcrek/ai-kit"
    },
    servicesView: {
      businessProblem: "Companies want to integrate AI capabilities into their internal operations or customer support, but get trapped in expensive proprietary SaaS tools with poor reliability.",
      solutionDelivered: "Custom AI agents engineered directly into your existing software workflows, capable of analyzing documents, calling internal APIs, and automating repetitive tasks.",
      roiImpact: "Automates 60% of tier-1 customer inquiries and internal data lookup workflows.",
      useCases: [
        "Internal documentation lookup & customer support bots",
        "Automated invoice and PDF data extraction pipelines",
        "Autonomous code and data validation workflows"
      ],
      deliverables: [
        "Tailored AI agent microservice integrated with your private databases",
        "Admin web dashboard for inspecting conversation logs and latency",
        "Cost-optimization caching layer to minimize monthly model billing"
      ]
    }
  }
];

export const PROFILE_INFO = {
  name: "Nguyen Dang Dat",
  handle: "arcrek",
  title: "Software Engineer & Automation Systems Specialist",
  tagline: "Architecting resilient backend systems, enterprise automations, and modern cloud infrastructure.",
  location: "Vietnam",
  email: "dangdat14122006@gmail.com",
  githubUrl: "https://github.com/arcrek",
  stats: {
    publicRepos: 29,
    hoursAutomated: "1,200+",
    uptimeSLA: "99.9%",
    codebasesShipped: "15+"
  },
  skills: {
    backend: ["Python", "FastAPI", "Node.js / TypeScript", "PostgreSQL", "Redis", "Stalwart JMAP", "Postfix"],
    automation: ["Playwright", "Browser Automation", "Reverse-Engineered APIs", "Webhooks", "Cron Daemons"],
    cloudDevops: ["Docker", "Google Cloud (GCP)", "Cloudflare (Workers/R2)", "CI/CD (GitHub Actions)", "Linux Systems"],
    designSystem: ["Material 3 (Material You)", "Tailwind CSS", "Semantic HTML5", "Responsive UX"]
  }
};
