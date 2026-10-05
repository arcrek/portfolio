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
export const FALLBACK_REPOS: Record<string, GitHubRepoMeta> = {
  "arcrek/tmail": {
    name: "tmail",
    fullName: "arcrek/tmail",
    description: "A passwordless temporary-mail web app and API with automatic domain provisioning through Postfix and Stalwart JMAP",
    stars: 12,
    forks: 2,
    language: "Python",
    topics: ["email", "jmap", "postfix", "fastapi", "temporary-mail", "docker"],
    updatedAt: "2026-09-28T14:20:00Z",
    htmlUrl: "https://github.com/arcrek/tmail",
    defaultBranch: "main"
  },
  "arcrek/google-automation-suite": {
    name: "google-automation-suite",
    fullName: "arcrek/google-automation-suite",
    description: "Google Automation Suite: PSC Checker, Subscription Manager & Payments Profile Closer",
    stars: 8,
    forks: 1,
    language: "Python",
    topics: ["automation", "google-cloud", "reverse-engineering", "playwright", "billing-lifecycle"],
    updatedAt: "2026-10-02T10:15:00Z",
    htmlUrl: "https://github.com/arcrek/google-automation-suite",
    defaultBranch: "main"
  },
  "arcrek/zoom-automation-suite": {
    name: "zoom-automation-suite",
    fullName: "arcrek/zoom-automation-suite",
    description: "Enterprise Zoom Automation: Meeting Lifecycle, Attendee Tracking & Asset Distribution",
    stars: 6,
    forks: 0,
    language: "Python",
    topics: ["zoom-api", "automation", "webhooks", "python", "video-processing"],
    updatedAt: "2026-09-15T08:30:00Z",
    htmlUrl: "https://github.com/arcrek/zoom-automation-suite",
    defaultBranch: "main"
  },
  "arcrek/renew-inapp": {
    name: "renew-inapp",
    fullName: "arcrek/renew-inapp",
    description: "In-App Subscription Validation & Auto-Renewal Lifecycle Engine",
    stars: 5,
    forks: 0,
    language: "Python",
    topics: ["in-app-purchases", "receipt-validation", "subscription-management", "fastapi"],
    updatedAt: "2026-08-20T17:45:00Z",
    htmlUrl: "https://github.com/arcrek/renew-inapp",
    defaultBranch: "main"
  },
  "arcrek/ai-kit": {
    name: "ai-kit",
    fullName: "arcrek/ai-kit",
    description: "Lightweight AI Agent Toolkit & Multi-Model Execution Framework",
    stars: 9,
    forks: 2,
    language: "TypeScript",
    topics: ["ai-agents", "llm-tools", "typescript", "automation"],
    updatedAt: "2026-09-25T12:00:00Z",
    htmlUrl: "https://github.com/arcrek/ai-kit",
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
