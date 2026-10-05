export interface ProjectItem {
  id: string;
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
}

export const CURATED_PROJECTS: ProjectItem[] = [
  {
    id: "tmail",
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
    githubUrl: "https://github.com/arcrek/tmail"
  },
  {
    id: "TELEGRAM-ORDER-BOT",
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
    githubUrl: "https://github.com/arcrek/TELEGRAM-ORDER-BOT"
  },
  {
    id: "xray-vless-ws-go",
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
  }
];

export const PROFILE_INFO = {
  name: "Nguyen Dang Dat",
  handle: "arcrek",
  title: "ICT Student & Builder",
  tagline: "ICT student from Vietnam who turns late-night ideas into things that somehow run in production.",
  location: "Vietnam",
  email: "dangdat14122006@gmail.com",
  githubUrl: "https://github.com/arcrek",
  facebookUrl: "https://facebook.com/arcreklabs",
  stats: {
    publicRepos: "24+",
    homelabContainers: "20+",
    status: "ICT Student / Builder",
    motto: "Works on my machine."
  },
  workflow: [
    { step: "1", title: "Have a half-baked idea at 2 a.m." },
    { step: "2", title: "Explain it to an AI." },
    { step: "3", title: "Accept, edit, and build until it works." },
    { step: "4", title: "Ship it and promise I'll document it later." }
  ],
  homelabStack: [
    { name: "Proxmox VE", desc: "Bare-metal hypervisor hosting all self-hosted VMs and LXC containers." },
    { name: "TrueNAS", desc: "ZFS network storage for backups, media archives, and homelab datasets." },
    { name: "Traefik & Nginx", desc: "Reverse proxy routing internal and public domain traffic with automatic SSL." },
    { name: "AdGuard Home", desc: "Network-wide DNS sinkhole blocking ads, tracking, and malware domains." },
    { name: "Portainer & Docker", desc: "Container orchestration for 20+ microservices and backend databases." },
    { name: "Jellyfin", desc: "Self-hosted media streaming server because paying for subscriptions while having a homelab is a cry for help." }
  ],
  skills: {
    languages: ["Python", "JavaScript / TypeScript", "Go", "HTML / CSS"],
    frameworks: ["FastAPI", "Flask", "Vite", "Astro", "Tailwind CSS"],
    infrastructure: ["Docker", "PostgreSQL", "Nginx", "Traefik", "Cloudflare", "Git", "Proxmox VE", "Linux"]
  }
};
