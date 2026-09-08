# Build Plan: Roadmap Website (Milestone 1)

## Context
This covers Milestone 1 only: a public-facing, docs-style website presenting the Claude Code workflow roadmap (currently 4 phases), deployed to Vercel. It does not cover turning the workflow into a Claude Code skill/command, that's a separate, later milestone once the roadmap content itself is finalized.

---

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Content:** MDX files via `@next/mdx`, no docs framework
- **Styling:** Tailwind CSS
- **Code blocks:** plain `<pre><code>`, Tailwind-styled, hand-built copy button
- **Deployment:** Vercel

### Why this stack
- **MDX over plain JSX:** phase content will be edited often as the roadmap evolves. Markdown is lower-friction to write and revise than JSX (no escaping curly braces or quotes), and it lets the site read the same format as any planning docs written elsewhere in this workflow.
- **Hand-built shell over Fumadocs/Nextra:** the site is small (4 pages plus landing), full control over the sidebar/toggle/layout is worth more here than the convenience a docs framework would add, and it doubles as Next.js practice.
- **Tailwind:** matches existing day-to-day stack, fast to iterate for a small page count.
- **No syntax highlighting library:** kept deliberately simple. Plain styled code blocks are enough for this content; `rehype-pretty-code`/Shiki can be added later as a non-breaking addition if plain blocks feel thin.

---

## File Structure

```
app/
  layout.tsx                 # root layout, theme provider, font setup
  page.tsx                   # landing page, summarizes all phases
  globals.css                # tailwind base + theme CSS variables
  phases/
    [slug]/
      page.tsx               # renders the MDX file matching the slug
components/
  Sidebar.tsx                 # phase list navigation
  ThemeToggle.tsx              # light/dark switch
  CodeBlock.tsx                # styled <pre><code> + copy button
  PhaseLayout.tsx               # shared shell: sidebar + content area
content/
  phases/
    01-define-and-spec.mdx
    02-specialist-roles.mdx
    03-architecture-and-planning.mdx
    04-implementation.mdx
lib/
  phases.ts                    # reads content/phases/, returns ordered phase metadata (slug, title, order) for the sidebar and landing page
mdx-components.tsx             # maps markdown elements (pre, code, etc.) to custom components
next.config.js                # @next/mdx config
```

---

## Core Data Model (`lib/phases.ts`)

```typescript
export interface PhaseMeta {
  slug: string        // e.g. "01-define-and-spec"
  order: number        // 1, 2, 3...
  title: string          // from MDX frontmatter
  summary: string         // from MDX frontmatter, used on landing page
}

export function getAllPhases(): PhaseMeta[]
export function getPhaseBySlug(slug: string): PhaseMeta | null
```

Each MDX file carries frontmatter:

```yaml
---
title: "Define the Project and Write a Spec"
order: 1
summary: "Interview, SPEC.md, and a starting prompt before any code exists."
---
```

---

## UX Details

- **Sidebar:** ordered list of phases from `getAllPhases()`, current phase highlighted, click to navigate
- **Theme toggle:** light/dark, persisted (e.g. `localStorage` + a class on `<html>`), no system-preference auto-detection required unless it falls out naturally
- **Prompt templates in content:** short prompts written inline as normal MDX code blocks; longer ones wrapped in a `<Collapsible>` component (built alongside `CodeBlock`) so they're hidden by default and expandable
- **Copy button:** on every code block via `CodeBlock.tsx`, `navigator.clipboard.writeText`, brief "Copied" confirmation state

---

## Milestones

### M1 — Scaffold
*Goal: runnable Next.js app with MDX and Tailwind wired up.*
```bash
npx create-next-app@latest roadmap-site --typescript --tailwind --app --yes
cd roadmap-site
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```
- Configure `next.config.js` for MDX
- Verify: `npm run dev` loads a blank page with Tailwind classes rendering correctly

### M2 — Content Pipeline
*Goal: an MDX file becomes a working page.*
- `lib/phases.ts`, `content/phases/01-define-and-spec.mdx` (real content from Phase 1 of the workflow)
- `app/phases/[slug]/page.tsx`
- `mdx-components.tsx`
- Verify: visiting `/phases/01-define-and-spec` renders the phase content

### M3 — Navigation Shell
*Goal: sidebar and layout working across all phases.*
- `components/Sidebar.tsx`, `components/PhaseLayout.tsx`
- Wire all 4 phase MDX files into `content/phases/`
- Verify: sidebar lists all 4 phases in order, clicking each navigates correctly, current phase is visually indicated

### M4 — Landing Page
*Goal: overview page summarizing all phases.*
- `app/page.tsx`, using `getAllPhases()` for summaries and links
- Verify: landing page shows all 4 phases with summary text and working links into each

### M5 — Theme Toggle
*Goal: light/dark switching works and persists.*
- `components/ThemeToggle.tsx`, theme CSS variables in `globals.css`
- Verify: toggling switches theme immediately, persists across a page reload

### M6 — Code Blocks & Polish
*Goal: prompt templates display correctly, collapsible where needed.*
- `components/CodeBlock.tsx` (styling + copy button)
- Collapsible wrapper for long prompts
- Verify: copy button works, short prompts show inline, long ones start collapsed and expand on click

### M7 — Deploy
*Goal: live URL on Vercel.*
- Push to GitHub, connect repo to Vercel
- Verify: live URL works, matches local behavior, both themes render correctly in production

---

## End-to-End Verification
- Landing page lists all 4 phases with accurate summaries
- Every sidebar link navigates to the correct phase content
- Theme toggle works and survives a reload
- A short prompt block renders inline; a long one starts collapsed and expands on click
- Copy button on a code block actually copies the text (paste somewhere to confirm)
- Site works on both a desktop viewport and a mobile viewport

---

## Engineering Judgment (stub vs. production)

| Concern | This milestone | Later, if it matters |
|---|---|---|
| Search | None | Add if phase count grows past what a sidebar can hold |
| Syntax highlighting | Plain styled blocks | `rehype-pretty-code` + Shiki, additive, not a rework |
| Content source | Local MDX files in repo | Unchanged, no CMS needed for a personal roadmap |
| Theme persistence | `localStorage` | Fine as-is, no need for cookie-based SSR theme detection at this scale |
