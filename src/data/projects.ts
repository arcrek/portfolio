export interface ArchitectureNode {
  id: string;
  step: string;
  label: string;
  protocol: string;
  detail: string;
}

export interface ArchitectureFlow {
  title: string;
  summary: string;
  nodes: ArchitectureNode[];
}

export interface ProjectItem {
  id: string;
  index: string;
  tier: "flagship" | "index";
  repoSlug: string;
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  techStack: string[];
  whyIBuiltThis: string;
  howItWorks: string;
  keyHighlights: string[];
  githubUrl: string;
  architectureFlow?: ArchitectureFlow;
}

export const CURATED_PROJECTS: ProjectItem[] = [
  {
    id: "tmail",
    index: "01",
    tier: "flagship",
    repoSlug: "arcrek/tmail",
    title: "TMail",
    tagline: "A passwordless temporary-mail web app and API with automatic domain provisioning through Postfix and Stalwart JMAP.",
    category: "Mail Protocols & Systems",
    featured: true,
    techStack: ["Python", "FastAPI", "Stalwart JMAP", "Postfix MTA", "Docker", "Redis"],
    whyIBuiltThis: "I wanted a self-hosted disposable mail system for testing signups without paying monthly SaaS subscriptions or dealing with IMAP polling lag.",
    howItWorks: "Wired incoming SMTP streams through Postfix into a Stalwart JMAP backend. Inbound messages push directly into Redis in-memory buffers with automatic TTL expiry, skipping disk clutter entirely.",
    keyHighlights: [
      "Passwordless token sessions instead of database user accounts",
      "Real-time email push over WebSockets using JMAP events",
      "Automated domain DNS provisioning in isolated Docker containers"
    ],
    githubUrl: "https://github.com/arcrek/tmail",
    architectureFlow: {
      title: "Zero-Disk Inbound Mail & JMAP Push Pipeline",
      summary: "Click or hover any stage to inspect how inbound SMTP traffic becomes a real-time browser event.",
      nodes: [
        {
          id: "smtp-ingress",
          step: "01",
          label: "Postfix MTA",
          protocol: "SMTP :25",
          detail: "Accepts inbound mail across dynamically provisioned disposable domains, strips malformed headers, and pipes streams downstream without writing local mbox files."
        },
        {
          id: "stalwart-jmap",
          step: "02",
          label: "Stalwart JMAP",
          protocol: "LMTP / JMAP",
          detail: "Indexes MIME structure and emits state-change events immediately upon receipt, replacing legacy IMAP polling loops with sub-second event dispatch."
        },
        {
          id: "fastapi-core",
          step: "03",
          label: "FastAPI Worker",
          protocol: "AsyncIO",
          detail: "Validates passwordless bearer tokens, scopes ephemeral mailbox namespaces, and coordinates JMAP webhook listeners with Redis buffers."
        },
        {
          id: "redis-ttl",
          step: "04",
          label: "Redis TTL Buffer",
          protocol: "In-Memory TTL",
          detail: "Stores parsed email payloads and attachments strictly in volatile memory with automatic key expiration so stale messages self-purge."
        },
        {
          id: "ws-client",
          step: "05",
          label: "Client Push",
          protocol: "WebSocket / REST",
          detail: "Streams new message arrivals directly to connected browser sessions and headless API callers with zero page refresh."
        }
      ]
    }
  },
  {
    id: "TELEGRAM-ORDER-BOT",
    index: "02",
    tier: "flagship",
    repoSlug: "arcrek/TELEGRAM-ORDER-BOT",
    title: "Telegram Order Bot",
    tagline: "A self-hosted Telegram storefront with PayOS QR payments, balance payments, automatic digital delivery, and a React admin dashboard.",
    category: "Bots & Payments",
    featured: true,
    techStack: ["Python", "aiogram", "PostgreSQL", "PayOS API", "Docker Compose", "React"],
    whyIBuiltThis: "Digital asset selling usually involves manual bank screenshots and tedious manual verification. I wanted a 24/7 autonomous storefront that handles order fulfillment in seconds.",
    howItWorks: "Listens for user commands in Telegram, generates real-time VietQR payment codes via PayOS, verifies incoming payment webhooks idempotently, and delivers digital files instantly with PostgreSQL transactional safety.",
    keyHighlights: [
      "Idempotent webhook processing to prevent duplicate digital delivery",
      "PostgreSQL row-level locking for inventory management",
      "Full Vietnamese and English internationalization (i18n)"
    ],
    githubUrl: "https://github.com/arcrek/TELEGRAM-ORDER-BOT",
    architectureFlow: {
      title: "Transactional VietQR Payment & Fulfillment Pipeline",
      summary: "Click or hover any stage to inspect how orders lock inventory and fulfill idempotently.",
      nodes: [
        {
          id: "tg-bot",
          step: "01",
          label: "aiogram Bot",
          protocol: "Telegram API",
          detail: "Handles bilingual (VI/EN) storefront menus, cart state, and order initiation directly inside Telegram chat threads."
        },
        {
          id: "payos-qr",
          step: "02",
          label: "PayOS VietQR",
          protocol: "Signed REST",
          detail: "Generates unique dynamic VietQR payment intents tied to the order ID with strict expiration windows."
        },
        {
          id: "webhook-guard",
          step: "03",
          label: "Webhook Verifier",
          protocol: "HMAC-SHA256",
          detail: "Validates incoming PayOS settlement callbacks and enforces idempotency keys so replayed webhooks never trigger double fulfillment."
        },
        {
          id: "pg-lock",
          step: "04",
          label: "PostgreSQL Lock",
          protocol: "SELECT FOR UPDATE",
          detail: "Acquires row-level locks on digital stock items, decrements inventory atomically, and records ledger entries in a single ACID transaction."
        },
        {
          id: "auto-delivery",
          step: "05",
          label: "Instant Fulfillment",
          protocol: "TG Dispatch + Admin UI",
          detail: "Delivers credentials or files to the buyer in under two seconds while syncing real-time revenue telemetry to the React admin dashboard."
        }
      ]
    }
  },
  {
    id: "xray-vless-ws-go",
    index: "03",
    tier: "index",
    repoSlug: "arcrek/xray-vless-ws-go",
    title: "Xray VLESS Go",
    tagline: "A Go proxy server on xray-core with graceful shutdown, health checks, systemd integration, and self-updating rollback.",
    category: "Networking & Cloud",
    featured: true,
    techStack: ["Go", "Xray Core", "systemd", "WebSocket", "Linux"],
    whyIBuiltThis: "Managing network routing proxies manually on remote Linux boxes gets messy when updates crash the daemon or leave orphaned processes.",
    howItWorks: "A lightweight Go service manager that handles process supervision, WebSocket handshakes, automated health probe telemetry, and clean graceful shutdowns.",
    keyHighlights: [
      "Zero-downtime config reload and automated rollback on failure",
      "Native Linux systemd unit file and daemon integration",
      "Minimal memory footprint written in pure Go"
    ],
    githubUrl: "https://github.com/arcrek/xray-vless-ws-go"
  },
  {
    id: "outlook-graph-module",
    index: "04",
    tier: "index",
    repoSlug: "arcrek/outlook-graph-module",
    title: "Outlook Graph Module",
    tagline: "A TypeScript/Python client for Microsoft Graph with OAuth2, retry/backoff, and 401/429 recovery baked in.",
    category: "APIs & Tooling",
    featured: false,
    techStack: ["TypeScript", "Python", "Microsoft Graph API", "OAuth2", "Regex"],
    whyIBuiltThis: "Automated test flows frequently need to retrieve 2FA confirmation codes from Outlook mailboxes without a human sitting there waiting to click refresh.",
    howItWorks: "Headless client that manages OAuth2 token lifecycles with transparent refresh and runs incoming emails through regex patterns to extract verification codes across multi-language layouts.",
    keyHighlights: [
      "Automatic token refresh on 401 and exponential backoff on 429 throttling",
      "Multi-language regex engine for localized OTP formats",
      "Dual TypeScript and Python API support"
    ],
    githubUrl: "https://github.com/arcrek/outlook-graph-module"
  },
  {
    id: "canva-automation",
    index: "05",
    tier: "index",
    repoSlug: "arcrek/canva-automation",
    title: "Canva Automation Suite",
    tagline: "Unofficial, fail-closed Canva browser automation for account checks, team sync, invites, role updates, and member removal.",
    category: "Automation & Scripts",
    featured: false,
    techStack: ["Python", "Playwright", "AsyncIO", "Secure Keyring"],
    whyIBuiltThis: "Manually managing team invites and revoking stale seats across multiple workspace accounts was eating up hours every week.",
    howItWorks: "A fail-closed headless browser automation pipeline that verifies DOM state before each step, executes batch account operations, and dumps structured JSON logs.",
    keyHighlights: [
      "Fail-closed architecture that safely aborts on unexpected UI state",
      "Headless persistent sessions with secure keyring credentials",
      "Batch invitation and stale seat revocation workflows"
    ],
    githubUrl: "https://github.com/arcrek/canva-automation"
  },
  {
    id: "VMS",
    index: "06",
    tier: "index",
    repoSlug: "arcrek/VMS",
    title: "VMS (Visitor Management System)",
    tagline: "Enterprise Visitor Management System demo featuring badge issuance, guest check-in workflows, and security audit logs.",
    category: "Enterprise Demo",
    featured: false,
    techStack: ["JavaScript", "Node.js", "REST API", "Audit Logging"],
    whyIBuiltThis: "Built to model structured physical-security check-in pipelines where front-desk badge issuance and host notifications require an immutable audit trail.",
    howItWorks: "Tracks visitor lifecycle states from pre-registration through badge printing and check-out, recording timestamped security events at every transition.",
    keyHighlights: [
      "Role-separated check-in and security operator views",
      "Automated guest badge state tracking and expiration",
      "Searchable compliance and entry/exit audit log"
    ],
    githubUrl: "https://github.com/arcrek/VMS"
  },
  {
    id: "price_board",
    index: "07",
    tier: "index",
    repoSlug: "arcrek/price_board",
    title: "price_board",
    tagline: "A clean, self-hosted dynamic board for product pricing tiers, currency conversion, and promotional badge highlights.",
    category: "Self-Hosted Web",
    featured: false,
    techStack: ["TypeScript", "Vite", "Tailwind CSS"],
    whyIBuiltThis: "Static image price lists go out of date constantly; I needed a lightweight, self-hosted pricing display that updates tiers and currencies cleanly.",
    howItWorks: "Renders structured catalog configuration into responsive pricing tables with instant currency toggling and promotional tier callouts.",
    keyHighlights: [
      "Zero-database static/JSON configuration for instant deployment",
      "Multi-currency formatting and promotional status badges",
      "Responsive layout optimized for both desktop and mobile screens"
    ],
    githubUrl: "https://github.com/arcrek/price_board"
  }
];

export const PROFILE_INFO = {
  name: "Nguyen Dang Dat",
  handle: "arcrek",
  title: "ICT Student & Systems Builder",
  tagline: "ICT student from Vietnam building self-hosted backends, network proxies, and fail-closed browser automations.",
  location: "Vietnam",
  email: "dangdat14122006@gmail.com",
  githubUrl: "https://github.com/arcrek",
  facebookUrl: "https://facebook.com/arcreklabs",
  stats: {
    publicRepos: "24+",
    homelabContainers: "20+",
    status: "Available for Internships & Projects",
    motto: "Works on my machine."
  },
  workflow: [
    { step: "01", title: "Have a half-baked idea at 2 a.m." },
    { step: "02", title: "Sketch the protocol and explain it to an AI." },
    { step: "03", title: "Accept, edit, and debug until the daemon stays up." },
    { step: "04", title: "Ship it to production and promise I'll document it later." }
  ],
  homelabStack: [
    { name: "Proxmox VE", role: "Bare-Metal Hypervisor", desc: "Hosts all isolated Linux VMs and LXC containers on local hardware." },
    { name: "TrueNAS", role: "ZFS Storage Array", desc: "Network storage pool handling automated snapshots, backups, and media datasets." },
    { name: "Traefik & Nginx", role: "Edge Reverse Proxy", desc: "Routes internal and public domain traffic with automated Let's Encrypt TLS termination." },
    { name: "AdGuard Home", role: "Network DNS Sinkhole", desc: "Filters LAN DNS queries and blocks telemetry, ads, and malware domains network-wide." },
    { name: "Portainer & Docker", role: "Container Runtime", desc: "Orchestrates 20+ self-hosted microservices, workers, and backing databases." },
    { name: "Jellyfin", role: "Media Server", desc: "Self-hosted streaming server because paying for subscriptions while running a homelab is a cry for help." }
  ],
  homelabTopology: {
    title: "Self-Hosted Homelab Network Topology",
    summary: "Click or hover any node to inspect how traffic routes through the home cluster.",
    nodes: [
      {
        id: "edge-ingress",
        step: "01",
        label: "Cloudflare & Traefik",
        protocol: "TLS 1.3 / SNI",
        detail: "Terminates public and split-horizon DNS traffic, enforcing strict TLS certificates and routing rules per subdomain."
      },
      {
        id: "dns-sinkhole",
        step: "02",
        label: "AdGuard Home",
        protocol: "DNS :53 / DoH",
        detail: "Acts as the primary LAN resolver, scrubbing ad/tracker queries and resolving internal `.local` service records."
      },
      {
        id: "proxmox-host",
        step: "03",
        label: "Proxmox VE",
        protocol: "KVM / LXC",
        detail: "Partitions bare-metal CPU and RAM across isolated virtual machines and lightweight Linux containers."
      },
      {
        id: "docker-fleet",
        step: "04",
        label: "Docker + Portainer",
        protocol: "Bridge Networks",
        detail: "Runs 20+ isolated service stacks (databases, bots, mail testing, Jellyfin) with health checks and restart policies."
      },
      {
        id: "truenas-zfs",
        step: "05",
        label: "TrueNAS ZFS",
        protocol: "NFS / SMB / ZFS",
        detail: "Provides redundant ZFS storage pools, scheduled volume snapshots, and off-node backup targets for all stateful services."
      }
    ]
  } as ArchitectureFlow,
  skills: {
    languages: ["Python", "Go", "TypeScript / JavaScript", "SQL", "HTML / CSS"],
    frameworks: ["FastAPI", "aiogram", "Playwright", "Astro", "Tailwind CSS", "Flask"],
    infrastructure: ["Docker", "PostgreSQL", "Redis", "Postfix / JMAP", "Nginx / Traefik", "Linux / systemd", "Cloudflare"]
  }
};
