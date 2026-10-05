export interface ProjectItem {
  id: string;
  repoSlug: string;
  title: string;
  tagline: string;
  primaryCategory: "Cloud Architecture" | "Automation & RPA" | "E-Commerce & Payments" | "Headless APIs";
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
    tagline: "Passwordless disposable email engine with automatic domain provisioning through Postfix and Stalwart JMAP",
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
    id: "canva-automation",
    repoSlug: "arcrek/canva-automation",
    title: "Canva Workspace Automation Suite",
    tagline: "Fail-closed browser automation for multi-account health checks, team sync, automated invites & member lifecycle management",
    primaryCategory: "Automation & RPA",
    featured: true,
    metrics: ["Fail-Closed Security", "Zero Stale Team Seats", "100% Headless Execution"],
    techStack: ["Python", "Playwright", "AsyncIO", "Secure Keyring", "Docker"],
    recruiterView: {
      problemStatement: "Enterprise workspace member administration (invitations, role upgrades, stale seat revocations) across distributed teams lacks programmatic APIs and causes licensing overages and security leaks.",
      architectureSolution: "Engineered a hardened, fail-closed browser automation engine with state validation, anti-bot resilience, atomic session handshakes, and verifiable audit logging to manage workspace lifecycles without human intervention.",
      keyTechnicalDecisions: [
        "Fail-closed safety circuit: operations abort safely on unexpected DOM states before taking destructive actions",
        "Isolated persistent browser contexts with dynamic fingerprint sanitization",
        "Structured audit logging exporting JSON action proofs with trace screenshots on failure"
      ],
      performanceHighlights: [
        "Completes bulk member provisioning and permission audits in < 45 seconds",
        "Zero credential leakage through memory-only environment injection"
      ],
      githubUrl: "https://github.com/arcrek/canva-automation"
    },
    servicesView: {
      businessProblem: "Agencies and design teams waste hours every week manually inviting contractors, updating roles, and tracking down unused paid seats across Canva workspaces.",
      solutionDelivered: "A robust background automation service that audits team memberships, invites verified clients automatically upon invoice payment, and revokes expired seats.",
      roiImpact: "Saves 10+ hours per week of manual HR/agency admin and recovers hundreds in unused software licenses.",
      useCases: [
        "Automated client onboarding to agency design workspaces",
        "Scheduled seat audits to eliminate billing for inactive accounts",
        "Bulk team role updates and permission synchronization"
      ],
      deliverables: [
        "CLI runner and background cron scheduler",
        "Docker container ready for cloud deployment",
        "Slack/Telegram webhook notification integration"
      ]
    }
  },
  {
    id: "TELEGRAM-ORDER-BOT",
    repoSlug: "arcrek/TELEGRAM-ORDER-BOT",
    title: "Telegram Digital Commerce & Order Engine",
    tagline: "Self-hosted automated digital storefront bot with PostgreSQL, PayOS webhook checkout & dual Vietnamese/English i18n",
    primaryCategory: "E-Commerce & Payments",
    featured: true,
    metrics: ["Instant VietQR PayOS Sync", "100% Automated Fulfillment", "Multi-Language i18n"],
    techStack: ["Python", "aiogram / Telethon", "PostgreSQL", "PayOS API", "Docker Compose", "AsyncIO"],
    recruiterView: {
      problemStatement: "Conversational commerce bots frequently suffer from race conditions in payment callbacks, inventory double-spending, and fragile multi-language state management.",
      architectureSolution: "Architected an asynchronous conversational storefront using PostgreSQL row-level locks, transactional payment webhooks via PayOS (VietQR), and an internationalized state machine architecture.",
      keyTechnicalDecisions: [
        "Idempotent webhook verification with cryptographically signed PayOS payment events",
        "PostgreSQL transactional inventory reservations with automated rollback on order timeout",
        "Decoupled i18n message formatting supporting runtime locale switching"
      ],
      performanceHighlights: [
        "Processes payment webhook to automated digital delivery in < 150ms",
        "Zero order collision under concurrent checkout traffic"
      ],
      githubUrl: "https://github.com/arcrek/TELEGRAM-ORDER-BOT"
    },
    servicesView: {
      businessProblem: "Digital creators and sellers lose up to 30% of sales due to manual bank transfer checks, delayed order delivery, and customer drop-off during checkout.",
      solutionDelivered: "A 24/7 automated Telegram store that displays your digital catalog, generates instant VietQR/PayOS payment links, verifies payments automatically, and delivers files immediately.",
      roiImpact: "Enables 100% hands-free digital sales, boosting conversion rates and eliminating hours spent manually checking bank statements.",
      useCases: [
        "Digital goods, software license keys, and subscription sales",
        "Automated course or digital asset distribution",
        "VIP community membership access upon verified payment"
      ],
      deliverables: [
        "Complete self-hosted Telegram bot with PostgreSQL database",
        "PayOS payment gateway integration and webhook handlers",
        "Admin control panel for managing products, prices, and revenue analytics"
      ]
    }
  },
  {
    id: "outlook-graph-module",
    repoSlug: "arcrek/outlook-graph-module",
    title: "Headless Microsoft Graph Client & OTP Extractor",
    tagline: "High-performance headless Outlook/Hotmail client with OAuth2, automated mail polling & multi-language OTP regex extraction",
    primaryCategory: "Headless APIs",
    featured: false,
    metrics: ["Sub-2s OTP Extraction", "Multi-Language Regex", "OAuth2 Token Lifecycle"],
    techStack: ["Python", "TypeScript", "Microsoft Graph API", "OAuth2 / PKCE", "Regex Engine"],
    recruiterView: {
      problemStatement: "Automation workflows requiring email two-factor authentication (OTP) often break due to varying language layouts, localized email templates, and OAuth2 token expiration.",
      architectureSolution: "Constructed a dual TypeScript & Python headless client that manages OAuth2 token refresh lifecycles and utilizes an adaptive multi-language regex extraction engine to isolate verification codes across international email formats.",
      keyTechnicalDecisions: [
        "Adaptive regex matrix scoring candidate tokens by entropy and template context",
        "Non-blocking async mailbox polling with delta query optimization",
        "Thread-safe OAuth2 token cache with proactive refresh before expiry"
      ],
      performanceHighlights: [
        "Extracts and delivers verification OTPs within 2 seconds of arrival",
        "99.8% extraction accuracy across 10+ international email formats"
      ],
      githubUrl: "https://github.com/arcrek/outlook-graph-module"
    },
    servicesView: {
      businessProblem: "Automated business workflows that depend on receiving verification codes or alerts via Microsoft Outlook are easily blocked by 2FA challenges and manual human copying.",
      solutionDelivered: "A headless, programmatic email bridge that monitors Outlook mailboxes and feeds verification codes directly into your automation pipelines in real time.",
      roiImpact: "Unblocks 100% automated end-to-end testing and integration workflows without requiring human intervention.",
      useCases: [
        "Automated signup & account verification in CI/CD pipelines",
        "Transactional alert routing and multi-account mail monitoring",
        "Automated vendor notification parsing and ingestion"
      ],
      deliverables: [
        "Reusable Python and TypeScript SDK modules",
        "Azure AD app registration and permissions configuration guide",
        "Unit test suite covering multiple email provider layouts"
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
    publicRepos: "24+",
    hoursAutomated: "1,200+",
    uptimeSLA: "99.9%",
    codebasesShipped: "12+"
  },
  skills: {
    backend: ["Python", "FastAPI", "Go", "TypeScript", "PostgreSQL", "Redis", "Stalwart JMAP", "Postfix"],
    automation: ["Playwright", "Browser Automation", "Reverse-Engineered APIs", "Webhooks", "Cron Daemons"],
    cloudDevops: ["Docker", "Google Cloud (GCP)", "Cloudflare (Workers/R2)", "CI/CD (GitHub Actions)", "Linux Systems"],
    designSystem: ["Material 3 (Material You)", "Tailwind CSS", "Semantic HTML5", "Responsive UX"]
  }
};
