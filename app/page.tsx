import Link from "next/link";
import { getAllPhases } from "@/lib/phases";

export const metadata = {
  title: "Claude Code Workflow Roadmap",
  description: "A phase-by-phase guide to the Claude Code development workflow.",
};

export default function Home() {
  const phases = getAllPhases();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header className="mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
          Claude Code
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
          Workflow Roadmap
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
          A phase-by-phase guide to building software with Claude Code — from
          spec to shipped.
        </p>
      </header>

      <ol className="space-y-4">
        {phases.map((phase) => (
          <li key={phase.slug}>
            <Link
              href={`/phases/${phase.slug}`}
              className="group flex items-start gap-5 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 transition-colors hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm font-semibold text-neutral-500 dark:text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors">
                {phase.order}
              </span>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  {phase.title}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {phase.summary}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
