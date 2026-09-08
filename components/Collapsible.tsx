"use client";

import { useState } from "react";

interface Props {
  label?: string;
  children: React.ReactNode;
}

export function Collapsible({ label = "Show prompt", children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg transition-colors"
      >
        <span>{open ? label.replace(/^Show/, "Hide") : label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 [&>div]:my-0 [&_pre]:mt-0">
          {children}
        </div>
      )}
    </div>
  );
}
