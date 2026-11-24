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
  repoSlug?: string;
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  status?: "production" | "in-development";
  sourceVisibility?: "open" | "closed";
  techStack: string[];
  whyIBuiltThis: string;
  howItWorks: string;
  keyHighlights: string[];
  githubUrl?: string;
  architectureFlow?: ArchitectureFlow;
}

export const CURATED_PROJECTS: ProjectItem[] = [
  {
    id: "verikey",
    index: "01",
    tier: "flagship",
    title: "VeriKey",
    tagline:
      "An ESP32-S3 hardware security key supporting FIDO2/WebAuthn, OpenPGP, PIV, and OATH 2FA, with a browser Web Manager over WebUSB.",
    category: "Hardware Security & Embedded",
    featured: true,
    status: "in-development",
    sourceVisibility: "closed",
    techStack: ["C", "ESP-IDF", "ESP32-S3", "FIDO2 / CTAP2", "OpenPGP / PIV", "WebUSB", "React / TypeScript"],
    whyIBuiltThis:
      "Commercial hardware security keys are closed black boxes tied to heavy desktop tools. I wanted to build my own multifunction token and manage it straight from the browser with nothing to install.",
    howItWorks:
      "ESP32-S3 firmware exposes a USB Composite device (CTAPHID, CCID, and WebUSB) that routes requests into separate cryptographic applets. A static React/TypeScript web app talks directly to the device over WebUSB—no backend required. Currently in active development and closed source.",
    keyHighlights: [
      "FIDO2/WebAuthn, OpenPGP, PIV, and OATH 2FA on a single USB Composite device",
      "Browser-based WebUSB manager built with React and TypeScript, with no server or desktop installer",
      "Private keys stay isolated on the ESP32-S3 for on-device signing"
    ],
    architectureFlow: {
      title: "USB Composite Token & WebUSB Flow",
      summary: "Select a stage to see how requests move from the host to the device.",
      nodes: [
        {
          id: "host-browser",
          step: "01",
          label: "Host & Browser",
          protocol: "WebAuthn / GPG",
          detail:
            "Starts passkey sign-in, GPG signing, smart-card operations, or configuration requests from standard OS and browser clients."
        },
        {
          id: "usb-composite",
          step: "02",
          label: "USB Composite",
          protocol: "CTAPHID / CCID",
          detail:
            "Exposes CTAPHID, CCID smart-card, and WebUSB interfaces together on the ESP32-S3 so browsers and native tools can share one key."
        },
        {
          id: "security-applets",
          step: "03",
          label: "Security Applets",
          protocol: "FIDO2 / PIV",
          detail:
            "Routes incoming frames to isolated FIDO2, OpenPGP, PIV, and OATH handlers with per-applet PIN and touch checks."
        },
        {
          id: "key-envelope",
          step: "04",
          label: "Key Storage",
          protocol: "On-Device",
          detail:
            "Keeps private keys inside hardware-protected storage so signing happens on the chip without exposing raw secrets."
        },
        {
          id: "web-manager",
          step: "05",
          label: "Web Manager",
          protocol: "WebUSB",
          detail:
            "Static React and TypeScript interface for configuring applets, reading OATH codes, and checking device status directly over WebUSB."
        }
      ]
    }
  },
  {
    id: "tmail",
    index: "02",
    tier: "flagship",
    repoSlug: "arcrek/tmail",
    title: "TMail",
    tagline:
      "Self-hosted disposable email app and API with automatic domain setup, built on Postfix and Stalwart JMAP.",
    category: "Mail & Backend",
    featured: true,
    techStack: ["Python", "FastAPI", "Stalwart JMAP", "Postfix", "Docker", "Redis"],
    whyIBuiltThis:
      "I needed disposable inboxes for testing signups without paying for SaaS plans or waiting on slow IMAP polling.",
    howItWorks:
      "Inbound SMTP passes through Postfix into Stalwart JMAP. FastAPI listens for new-mail events, buffers parsed messages in Redis with short TTLs so nothing piles up on disk, and pushes updates to the browser over WebSockets.",
    keyHighlights: [
      "Token-based temporary sessions with no user accounts or passwords",
      "Instant inbox updates over WebSockets backed by JMAP events",
      "Automatic domain DNS setup running inside Docker containers"
    ],
    githubUrl: "https://github.com/arcrek/tmail",
    architectureFlow: {
      title: "Inbound Mail & JMAP Push Flow",
      summary: "Select a stage to trace an incoming email from SMTP to the browser.",
      nodes: [
        {
          id: "smtp-ingress",
          step: "01",
          label: "Postfix MTA",
          protocol: "SMTP :25",
          detail:
            "Receives mail for provisioned disposable domains, cleans malformed headers, and forwards streams without saving local mbox files."
        },
        {
          id: "stalwart-jmap",
          step: "02",
          label: "Stalwart JMAP",
          protocol: "LMTP / JMAP",
          detail:
            "Parses MIME bodies and triggers JMAP state updates immediately on arrival instead of relying on periodic IMAP polling."
        },
        {
          id: "fastapi-core",
          step: "03",
          label: "FastAPI Worker",
          protocol: "AsyncIO",
          detail:
            "Checks session tokens, isolates temporary inboxes, and bridges JMAP events into Redis and active client connections."
        },
        {
          id: "redis-ttl",
          step: "04",
          label: "Redis Buffer",
          protocol: "In-Memory TTL",
          detail:
            "Holds parsed messages and attachments in memory with automatic expiration so old mail cleans itself up."
        },
        {
          id: "ws-client",
          step: "05",
          label: "Client Push",
          protocol: "WS / REST",
          detail:
            "Pushes incoming messages to open browser tabs and API clients as soon as they land."
        }
      ]
    }
  },
  {
    id: "TELEGRAM-ORDER-BOT",
    index: "03",
    tier: "flagship",
    repoSlug: "arcrek/TELEGRAM-ORDER-BOT",
    title: "Telegram Order Bot",
    tagline:
      "Self-hosted Telegram shop with PayOS VietQR payments, wallet balances, instant digital delivery, and a React admin panel.",
    category: "Bots & Payments",
    featured: true,
    techStack: ["Python", "aiogram", "PostgreSQL", "PayOS API", "Docker Compose", "React"],
    whyIBuiltThis:
      "Selling digital items usually turns into checking bank transfer screenshots by hand. I wanted a bot that verifies payments and delivers orders automatically, day or night.",
    howItWorks:
      "Customers browse and order inside Telegram. The bot creates a dynamic VietQR code through PayOS, checks signed webhooks for duplicate deliveries, locks stock rows in PostgreSQL, and sends the purchased item immediately.",
    keyHighlights: [
      "Idempotent webhook handling so retried callbacks never deliver an order twice",
      "PostgreSQL row locking to prevent overselling limited digital stock",
      "Vietnamese and English interface with a React admin dashboard"
    ],
    githubUrl: "https://github.com/arcrek/TELEGRAM-ORDER-BOT",
    architectureFlow: {
      title: "VietQR Payment & Order Fulfillment Flow",
      summary: "Select a stage to see how payments are verified and fulfilled safely.",
      nodes: [
        {
          id: "tg-bot",
          step: "01",
          label: "aiogram Bot",
          protocol: "Telegram API",
          detail:
            "Runs the bilingual (VI/EN) catalog, cart, wallet balance, and checkout steps directly inside Telegram."
        },
        {
          id: "payos-qr",
          step: "02",
          label: "PayOS VietQR",
          protocol: "Signed REST",
          detail:
            "Generates a per-order VietQR payment link with an expiry window tied directly to the order ID."
        },
        {
          id: "webhook-guard",
          step: "03",
          label: "Webhook Check",
          protocol: "HMAC-SHA256",
          detail:
            "Verifies PayOS webhook signatures and checks idempotency keys so replayed requests cannot double-fulfill an order."
        },
        {
          id: "pg-lock",
          step: "04",
          label: "PostgreSQL Lock",
          protocol: "Row Lock (SQL)",
          detail:
            "Uses SELECT FOR UPDATE to claim stock, decrement inventory, and write the order ledger inside one transaction."
        },
        {
          id: "auto-delivery",
          step: "05",
          label: "Auto Delivery",
          protocol: "TG + Admin UI",
          detail:
            "Sends files or credentials back to the buyer within seconds and updates sales records in the React admin panel."
        }
      ]
    }
  },
  {
    id: "xray-vless-ws-go",
    index: "04",
    tier: "index",
    repoSlug: "arcrek/xray-vless-ws-go",
    title: "Xray VLESS Go",
    tagline:
      "Go wrapper for xray-core with health checks, systemd integration, graceful shutdown, and automatic rollback on bad updates.",
    category: "Networking",
    featured: true,
    techStack: ["Go", "Xray Core", "systemd", "WebSocket", "Linux"],
    whyIBuiltThis:
      "Updating proxy daemons by hand on remote Linux servers gets annoying fast when a bad config crashes the service or leaves stray processes behind.",
    howItWorks:
      "A small Go binary manages the xray-core process, checks tunnel health, handles graceful shutdown signals, and rolls back to the previous working version if an update fails startup checks.",
    keyHighlights: [
      "Zero-downtime config reloads with automatic rollback on failure",
      "Ships with a native Linux systemd service unit",
      "Small memory footprint written in pure Go"
    ],
    githubUrl: "https://github.com/arcrek/xray-vless-ws-go"
  },
  {
    id: "outlook-graph-module",
    index: "05",
    tier: "index",
    repoSlug: "arcrek/outlook-graph-module",
    title: "Outlook Graph Module",
    tagline:
      "TypeScript and Python Microsoft Graph client with OAuth2 refresh, backoff on rate limits, and OTP extraction.",
    category: "APIs & Tooling",
    featured: false,
    techStack: ["TypeScript", "Python", "Microsoft Graph", "OAuth2", "Regex"],
    whyIBuiltThis:
      "Automated test scripts often need 2FA codes from Outlook mailboxes without someone manually opening a browser and hitting refresh.",
    howItWorks:
      "Handles OAuth2 token refresh automatically, retries throttled requests with exponential backoff, and extracts verification codes from incoming emails across multiple languages.",
    keyHighlights: [
      "Automatic token refresh on 401 and exponential backoff on 429 responses",
      "Multi-language regex rules for localized OTP emails",
      "Shared API design available in both TypeScript and Python"
    ],
    githubUrl: "https://github.com/arcrek/outlook-graph-module"
  },
  {
    id: "canva-automation",
    index: "06",
    tier: "index",
    repoSlug: "arcrek/canva-automation",
    title: "Canva Automation Suite",
    tagline:
      "Playwright automation for checking Canva accounts, syncing teams, sending invites, updating roles, and removing inactive seats.",
    category: "Automation",
    featured: false,
    techStack: ["Python", "Playwright", "AsyncIO", "Keyring"],
    whyIBuiltThis:
      "Sending team invites and cleaning up unused seats across several workspaces by hand was taking hours every week.",
    howItWorks:
      "Drives headless Chromium with Playwright, checks expected page state before every action so it stops safely if the UI changes, and writes structured JSON run logs.",
    keyHighlights: [
      "Aborts safely instead of clicking blindly when the page DOM changes",
      "Persistent headless sessions backed by the OS keyring",
      "Batch invite, role change, and stale-seat cleanup workflows"
    ],
    githubUrl: "https://github.com/arcrek/canva-automation"
  },
  {
    id: "VMS",
    index: "07",
    tier: "index",
    repoSlug: "arcrek/VMS",
    title: "VMS (Visitor Management System)",
    tagline:
      "Visitor management web app with guest check-in, badge issuance, host alerts, and searchable entry logs.",
    category: "Web App",
    featured: false,
    techStack: ["JavaScript", "Node.js", "REST API", "Audit Logs"],
    whyIBuiltThis:
      "Built as a practical model for front-desk check-in flows where receptionists and security staff need clear badge tracking and entry history.",
    howItWorks:
      "Tracks each guest from pre-registration through badge printing and check-out, logging timestamps and operator actions at each step.",
    keyHighlights: [
      "Separate views for front-desk check-in and security staff",
      "Badge status tracking with automatic expiration",
      "Searchable guest entry and exit log"
    ],
    githubUrl: "https://github.com/arcrek/VMS"
  },
  {
    id: "price_board",
    index: "08",
    tier: "index",
    repoSlug: "arcrek/price_board",
    title: "Price Board",
    tagline:
      "Lightweight self-hosted pricing page for product tiers, currency switching, and promo callouts.",
    category: "Web App",
    featured: false,
    techStack: ["TypeScript", "Vite", "Tailwind CSS"],
    whyIBuiltThis:
      "Image-based price lists go stale immediately. I wanted a simple page driven by a config file that updates prices and currencies cleanly.",
    howItWorks:
      "Reads a JSON catalog at build or runtime to render responsive pricing cards with currency toggling and optional promo badges.",
    keyHighlights: [
      "Driven by static JSON configuration—no database needed",
      "Currency switching and highlighted promo tiers",
      "Responsive layout for both desktop and phone screens"
    ],
    githubUrl: "https://github.com/arcrek/price_board"
  }
];

export const PROFILE_INFO = {
  name: "Nguyen Dang Dat",
  handle: "arcrek",
  title: "ICT Student & Systems Builder",
  tagline:
    "ICT student in Vietnam building backend services, network tools, and self-hosted software—from mail servers and payment bots to embedded security keys.",
  location: "Vietnam",
  email: "dangdat14122006@gmail.com",
  githubUrl: "https://github.com/arcrek",
  facebookUrl: "https://facebook.com/arcreklabs",
  stats: {
    publicRepos: "24+",
    homelabContainers: "20+",
    status: "Open to internships & projects",
    motto: "Works on my machine."
  },
  workflow: [
    { step: "01", title: "Get an itch to automate or self-host something annoying." },
    { step: "02", title: "Sketch the data flow, protocol boundaries, and failure cases." },
    { step: "03", title: "Build the smallest working daemon and test it on real hardware." },
    { step: "04", title: "Put it behind Docker and Traefik, then clean up the docs." }
  ],
  homelabStack: [
    {
      name: "Proxmox VE",
      role: "Hypervisor",
      desc: "Runs isolated Linux VMs and LXC containers on local hardware."
    },
    {
      name: "TrueNAS",
      role: "ZFS Storage",
      desc: "Network storage pool for scheduled snapshots, backups, and media datasets."
    },
    {
      name: "Traefik & Nginx",
      role: "Reverse Proxy",
      desc: "Routes internal and public domains with automatic Let's Encrypt TLS."
    },
    {
      name: "AdGuard Home",
      role: "LAN DNS",
      desc: "Resolves local domains and blocks ads, trackers, and malware network-wide."
    },
    {
      name: "Portainer & Docker",
      role: "Containers",
      desc: "Runs 20+ self-hosted services, bots, and databases with restart policies."
    },
    {
      name: "Jellyfin",
      role: "Media Server",
      desc: "Self-hosted media streaming—mostly to justify keeping the storage box running."
    }
  ],
  homelabTopology: {
    title: "Home Cluster Network Topology",
    summary: "Select a stage to see how traffic moves from the edge to storage.",
    nodes: [
      {
        id: "edge-ingress",
        step: "01",
        label: "Cloudflare & Traefik",
        protocol: "TLS 1.3 / SNI",
        detail:
          "Terminates TLS for public and internal subdomains and forwards requests to the right container or VM."
      },
      {
        id: "dns-sinkhole",
        step: "02",
        label: "AdGuard Home",
        protocol: "DNS :53 / DoH",
        detail:
          "Handles LAN DNS resolution, blocks ad and tracker domains, and maps internal service hostnames."
      },
      {
        id: "proxmox-host",
        step: "03",
        label: "Proxmox VE",
        protocol: "KVM / LXC",
        detail:
          "Splits bare-metal CPU and RAM across separate virtual machines and lightweight Linux containers."
      },
      {
        id: "docker-fleet",
        step: "04",
        label: "Docker & Portainer",
        protocol: "Bridge Nets",
        detail:
          "Hosts 20+ containerized stacks (databases, Telegram bots, mail tests, Jellyfin) with health checks."
      },
      {
        id: "truenas-zfs",
        step: "05",
        label: "TrueNAS ZFS",
        protocol: "NFS / SMB",
        detail:
          "Provides redundant ZFS storage, scheduled snapshots, and backup targets for stateful services."
      }
    ]
  } as ArchitectureFlow,
  skills: {
    languages: ["Python", "Go", "C", "TypeScript / JS", "SQL"],
    frameworks: ["FastAPI", "React", "ESP-IDF", "aiogram", "Playwright", "Astro", "Tailwind CSS"],
    infrastructure: ["Docker", "PostgreSQL", "Redis", "Postfix / JMAP", "Nginx / Traefik", "Linux / systemd", "Cloudflare"]
  }
};
