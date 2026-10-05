export interface GitHubRepoMeta {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  updatedAt: string;
  htmlUrl: string;
  defaultBranch: string;
}

// Fallback baseline for offline builds or API rate-limited environments
// ONLY public, verified, non-trivial repositories
export const FALLBACK_REPOS: Record<string, GitHubRepoMeta> = {
  "arcrek/tmail": {
    name: "tmail",
    fullName: "arcrek/tmail",
    description: "A passwordless temporary-mail web app and API with automatic domain provisioning through Postfix and Stalwart JMAP",
    stars: 2,
    forks: 0,
    language: "Python",
    topics: ["email", "jmap", "postfix", "fastapi", "temporary-mail", "docker"],
    updatedAt: "2026-09-28T14:20:00Z",
    htmlUrl: "https://github.com/arcrek/tmail",
    defaultBranch: "main"
  },
  "arcrek/canva-automation": {
    name: "canva-automation",
    fullName: "arcrek/canva-automation",
    description: "Unofficial, fail-closed Canva browser automation for account checks, team sync, invites, role updates, and member removal",
    stars: 1,
    forks: 0,
    language: "Python",
    topics: ["automation", "browser-automation", "python", "fail-closed", "account-management"],
    updatedAt: "2026-10-02T10:15:00Z",
    htmlUrl: "https://github.com/arcrek/canva-automation",
    defaultBranch: "main"
  },
  "arcrek/TELEGRAM-ORDER-BOT": {
    name: "TELEGRAM-ORDER-BOT",
    fullName: "arcrek/TELEGRAM-ORDER-BOT",
    description: "Self-hosted Telegram digital storefront bot — Docker Compose, PostgreSQL, PayOS payments, Vietnamese/English i18n",
    stars: 1,
    forks: 0,
    language: "Python",
    topics: ["telegram-bot", "ecommerce", "payos", "docker-compose", "postgresql", "i18n"],
    updatedAt: "2026-09-15T08:30:00Z",
    htmlUrl: "https://github.com/arcrek/TELEGRAM-ORDER-BOT",
    defaultBranch: "main"
  },
  "arcrek/outlook-graph-module": {
    name: "outlook-graph-module",
    fullName: "arcrek/outlook-graph-module",
    description: "Headless Microsoft Outlook/Hotmail Graph API client (TypeScript + Python) — OAuth2, mail polling, multi-language OTP extraction",
    stars: 1,
    forks: 0,
    language: "Python",
    topics: ["microsoft-graph", "oauth2", "otp-extraction", "mail-polling", "headless"],
    updatedAt: "2026-09-20T17:45:00Z",
    htmlUrl: "https://github.com/arcrek/outlook-graph-module",
    defaultBranch: "main"
  },
  "arcrek/VMS": {
    name: "VMS",
    fullName: "arcrek/VMS",
    description: "Enterprise Visitor Management System (VMS) - Acme Corp Demo",
    stars: 0,
    forks: 0,
    language: "JavaScript",
    topics: ["visitor-management", "enterprise", "web-application"],
    updatedAt: "2026-08-25T12:00:00Z",
    htmlUrl: "https://github.com/arcrek/VMS",
    defaultBranch: "main"
  },
  "arcrek/price_board": {
    name: "price_board",
    fullName: "arcrek/price_board",
    description: "A simple, self-hosted board for product pricing",
    stars: 0,
    forks: 0,
    language: "TypeScript",
    topics: ["pricing-board", "typescript", "self-hosted"],
    updatedAt: "2026-09-01T09:00:00Z",
    htmlUrl: "https://github.com/arcrek/price_board",
    defaultBranch: "main"
  },
  "arcrek/xray-vless-ws-go": {
    name: "xray-vless-ws-go",
    fullName: "arcrek/xray-vless-ws-go",
    description: "High-performance network routing proxy & secure tunnel daemon in Go",
    stars: 0,
    forks: 0,
    language: "Go",
    topics: ["go", "vless", "websocket", "networking", "proxy"],
    updatedAt: "2026-08-10T11:00:00Z",
    htmlUrl: "https://github.com/arcrek/xray-vless-ws-go",
    defaultBranch: "main"
  }
};

export async function fetchGitHubRepo(repoSlug: string): Promise<GitHubRepoMeta> {
  const fallback = FALLBACK_REPOS[repoSlug] || {
    name: repoSlug.split("/")[1] || repoSlug,
    fullName: repoSlug,
    description: "",
    stars: 0,
    forks: 0,
    language: "Python",
    topics: [],
    updatedAt: new Date().toISOString(),
    htmlUrl: `https://github.com/${repoSlug}`,
    defaultBranch: "main"
  };

  try {
    const headers: Record<string, string> = {
      "User-Agent": "Astro-Portfolio-Builder",
      "Accept": "application/vnd.github.v3+json"
    };

    const token = typeof process !== "undefined" ? process.env.GITHUB_TOKEN : undefined;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`https://api.github.com/repos/${repoSlug}`, {
      headers,
      signal: AbortSignal.timeout(3000)
    });

    if (!res.ok) {
      return fallback;
    }

    const data = await res.json();

    // If repo is private, do not expose or leak
    if (data.private) {
      return fallback;
    }

    return {
      name: data.name ?? fallback.name,
      fullName: data.full_name ?? fallback.fullName,
      description: data.description || fallback.description,
      stars: data.stargazers_count ?? fallback.stars,
      forks: data.forks_count ?? fallback.forks,
      language: data.language ?? fallback.language,
      topics: Array.isArray(data.topics) && data.topics.length > 0 ? data.topics : fallback.topics,
      updatedAt: data.updated_at ?? fallback.updatedAt,
      htmlUrl: data.html_url ?? fallback.htmlUrl,
      defaultBranch: data.default_branch ?? fallback.defaultBranch
    };
  } catch {
    // Fail gracefully to fallback without breaking build
    return fallback;
  }
}

export async function fetchAllCuratedRepos(repoSlugs: string[]): Promise<Record<string, GitHubRepoMeta>> {
  const entries = await Promise.all(
    repoSlugs.map(async (slug) => {
      const meta = await fetchGitHubRepo(slug);
      return [slug, meta] as const;
    })
  );
  return Object.fromEntries(entries);
}
