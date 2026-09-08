"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PhaseMeta } from "@/lib/phases";

export function Sidebar({ phases }: { phases: PhaseMeta[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-56 lg:w-64 shrink-0 border-b border-neutral-200 dark:border-neutral-800 md:border-b-0 md:border-r">
      <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1 p-4 md:p-6">
        <p className="hidden md:block text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
          Phases
        </p>
        {phases.map((phase) => {
          const href = `/phases/${phase.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={phase.slug}
              href={href}
              className={[
                "shrink-0 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
              ].join(" ")}
            >
              <span className="block text-xs opacity-60 mb-0.5 md:block hidden">
                Phase {phase.order}
              </span>
              <span className="block leading-snug">{phase.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
