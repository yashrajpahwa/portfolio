# Portfolio Website — Build Plan

## Owner

**Yashraj Singh Pahwa** — B.Eng. Electronics & Computer Engineering, Thapar Institute of Engineering & Technology Patiala (2028)  
GitHub: `yashrajpahwa` | Twitter: `@yashrajpahwa` | LinkedIn: `yashrajpahwa`

---

## Design Philosophy

**Timeless minimalism.** Not trendy, not loud. This site should look as considered in 2030 as it does today.

- Dark-first, with a light mode. Defaults to the user's OS preference (`prefers-color-scheme`) on first visit; a small sun/moon toggle in the nav lets visitors override it, persisted via `next-themes`. Dark background near-black (`#0c0c0c`), not pure black. Text off-white (`#e8e6e1`).
- One accent color: a muted, desaturated teal (`#5a9e8f` dark / `#3d6b62` light) — used sparingly (links, active states, one highlight per section). Never decoratively.
- No gradients. No glassmorphism. No parallax. No hero animations.
- Whitespace is the primary design element.
- Subtle micro-interactions only: underline reveals on hover, opacity transitions (150ms ease), nothing that demands attention.
- Mobile-first. Every layout decision starts from 375px width.

### Typography

- **Body / UI**: `Geist` (Vercel's open font) — clean, modern, highly readable at small sizes
- **Mono accents**: `Geist Mono` — for dates, labels, code snippets, skill tags
- Scale: 13px base on mobile, 14px on desktop. Let whitespace do the work, not font size.
- Line height: 1.7 for body text. Headings: 1.1.

### Color Tokens

```
Dark (default):
--bg:         #0c0c0c
--surface:    #141414
--border:     #222222
--text:       #e8e6e1
--muted:      #8a8a8a
--accent:     #5a9e8f
--accent-dim: #3d6b62

Light (prefers-color-scheme: light):
--bg:         #f7f6f3
--surface:    #ffffff
--border:     #e2e0da
--text:       #1a1a18
--muted:      #6b6b6b
--accent:     #3d6b62
--accent-dim: #cfe4df
```

---

## Tech Stack

| Layer      | Choice                  | Reason                                      |
| ---------- | ----------------------- | ------------------------------------------- |
| Framework  | Next.js 15 (App Router) | SSG for speed, MDX for blog, great defaults |
| Language   | JavaScript              | No exceptions                               |
| Styling    | Tailwind CSS v4         | Utility-first, no runtime, easy dark theme  |
| Blog       | MDX + next-mdx-remote   | Write in markdown, render as React          |
| Fonts      | `next/font` with Geist  | Zero layout shift                           |
| Icons      | `lucide-react`          | Clean, consistent, tree-shakeable           |
| Deployment | Vercel                  | Free tier, zero-config Next.js, analytics   |
| Analytics  | Vercel Analytics        | Privacy-respecting, no cookie banner needed |

No CMS. No database. No auth. Static-first.

---

## Site Structure

```
/                  → Landing (hero + brief about)
/about             → Full about page
/projects          → All projects
/blog              → Blog index (own posts + Medium links)
/blog/[slug]       → Individual MDX post
/uses              → Tools & setup (optional, add later)
```

Single-page scroll is NOT used — proper routing gives permanent URLs and better SEO.

---

## Page Specifications

### `/` — Home

A single viewport-height landing. No scroll-jacking.

```
┌─────────────────────────────────────────┐
│                                         │
│   Yashraj Singh Pahwa                   │  ← h1, large but not massive
│   Building systems. Thinking deeply.    │  ← single tagline, muted color
│                                         │
│   B.Eng. @ Thapar Institute of Engineering & Technology  ·  New Delhi           │  ← mono font, muted
│                                         │
│   GitHub  LinkedIn  Twitter  Email      │  ← icon links, subtle
│                                         │
└─────────────────────────────────────────┘
```

Below the fold: a brief 2–3 line "currently" section that updates with what you're working on, then links to /about, /projects, /blog.

No profile photo unless explicitly requested later. The name and writing should be enough.

---

### `/about`

Two columns on desktop, single column on mobile.

**Left (sticky):** Name, current role/institution, contact links.  
**Right (scroll):** Prose paragraphs — not bullet points. Write in first person. Cover:

- Who you are and what you care about technically (AI systems, infrastructure, open source)
- Where you've worked (Redington internship — Agentic RAG, AWS; Thapar Institute of Engineering & Technology Placement Portal)
- Education (Thapar Institute of Engineering & Technology, Bluebells)
- A line about writing / the blog
- A line about open source

No skills list here — that belongs on /projects or as a separate "skills" subsection lower on this page in a compact grid format (not tags, just grouped text).

---

### `/projects`

A vertical list — NOT a card grid. Each project is a row with:

```
[Year]   Project Name                        [Tag: language or type]
         One sentence description.
         → link  → GitHub
```

Projects to include (ordered by impact/relevance):

1. **easyauth** — Open-source auth microservice (JS)
2. **Conceptometry** — Open-source LMS, CI/CD pipelines (org: conceptometry)
3. **Thapar Institute of Engineering & Technology Placement Portal** — Serverless, OAuth, Google Cloud (internship project)
4. **ISRO Innovation Challenge** — Ranked 8th/760 teams, AI edge computing
5. **optimised_depth_camera** — Kernel-level video drivers in C
6. **MLSC Thapar Timetable** — Open-source contribution, DOM manipulation

Each project links to GitHub repo and/or live demo where available. The ISRO entry links to the competition post.

---

### `/blog`

Two visual treatments in the same list:

**Hosted post** (MDX, lives on this site):

```
[date]   Title of Post                          [5 min read]
         One sentence excerpt.
```

**Medium post** (link-out):

```
[date]   Title of Post                   ↗ Medium
         One sentence excerpt.
```

The `↗` icon and "Medium" label make it clear it opens externally. No iframes, no embed.

Blog posts to host on this site (major ones — user to decide which):

- "The Ultimate JWT Authentication Strategy" — deep technical, worth hosting
- "How I Built a Multi-Agent AI Workflow in 10 Minutes with n8n" — relevant to AI work

Others remain on Medium and are linked.

MDX blog features:

- Syntax highlighted code blocks (`rehype-pretty-code` with a dark theme)
- Reading time estimate
- No comments section (keep it clean)
- No share buttons (social links are in the footer)

---

### `/blog/[slug]` — Individual Post

```
┌─────────────────────────────────────────┐
│  ← Back to blog                         │
│                                         │
│  Title of Post                          │
│  July 3, 2026  ·  5 min read            │
│  ─────────────────────────────────────  │
│                                         │
│  [Article body in MDX]                  │
│                                         │
└─────────────────────────────────────────┘
```

No sidebar. No related posts widget. Just the article, well-typeset.  
Max content width: `65ch` (optimal reading line length).

---

## Navigation

Minimal top nav — no hamburger menu on mobile (use a simple drawer or just stack links).

```
yashraj.                          about  projects  blog
```

The name/logo is just text — your first name followed by a period. Links are plain text, no buttons. Active link gets a thin underline in accent color.

Footer: Copyright line + social links. Nothing else.

---

## Blog Architecture (MDX)

```
/content
  /blog
    jwt-auth-strategy.mdx
    multi-agent-n8n.mdx
    ...
```

Each MDX file has frontmatter:

```yaml
---
title: "The Ultimate JWT Authentication Strategy"
date: "2025-05-01"
excerpt: "..."
tags: ["auth", "backend", "security"]
hosted: true # false = medium link, include mediumUrl
---
```

The blog index page reads all MDX files, sorts by date, and renders the list. For Medium-linked posts, create a stub MDX with `hosted: false` and a `mediumUrl` field — the index renders it as an external link, no individual route generated.

---

## Implementation Phases

### Phase 1 — Foundation

- [ ] Init Next.js 15 project with JavaScript + Tailwind v4
- [ ] Set up design tokens (CSS variables in globals.css)
- [ ] Install and configure Geist font via `next/font`
- [ ] Build layout shell: nav + footer
- [ ] Deploy to Vercel (get the domain set up early)

### Phase 2 — Core Pages

- [ ] `/` — Hero section
- [ ] `/about` — Full about page with prose
- [ ] `/projects` — Project list with data file (`/data/projects.ts`)

### Phase 3 — Blog

- [ ] Set up MDX pipeline (next-mdx-remote + rehype-pretty-code)
- [ ] `/blog` — Index page with hosted/medium distinction
- [ ] `/blog/[slug]` — Individual post renderer
- [ ] Migrate 2 major posts from Medium to MDX

### Phase 4 — Polish

- [ ] Vercel Analytics integration
- [ ] Open Graph images (simple text-based, generated with `@vercel/og`)
- [ ] SEO metadata (next/metadata API)
- [ ] Sitemap + robots.txt
- [ ] Lighthouse audit — target 95+ on all metrics

---

## Content Notes (do not put on website)

- Yashraj is pursuing MS by research at a premier Indian institution — this is a future goal and must not appear on the site
- The site should be forward-compatible — sections can be added/updated as career evolves
- Keep the "currently" section on the homepage updated whenever a new role/project begins

---

## What to Avoid

- Skill percentage bars or any gamified skill display
- "Download CV" as a primary CTA (secondary only, in footer)
- Testimonials or recommendations section
- Hero with large background image or video
- Animations that play on scroll or page load
- Any color brighter than the accent teal
- Cookie banners (Vercel Analytics is cookieless)
- Elaborate theme-switch UI (dropdowns, animated sun/moon transitions) — keep the toggle a single small icon button, no fanfare

---

## Domain

Recommended: `yashrajpahwa.com` or `yashraj.dev`  
Check availability and register before Phase 4. Point to Vercel.

---

## File Structure (target)

```
portfolio/
├── CLAUDE.md
├── package.json
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── public/
│   └── favicon.ico
├── content/
│   └── blog/
│       ├── jwt-auth-strategy.mdx
│       └── multi-agent-n8n.mdx
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          ← home
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── blog/
│   │       ├── PostList.tsx
│   │       └── MediumPostCard.tsx
│   ├── data/
│   │   └── projects.ts
│   └── lib/
│       └── blog.ts           ← MDX utils
```
