"use client";

import { useRef, useState } from "react";

export function CodeBlock(props: React.ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  function copy() {
    const text = preRef.current?.innerText ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="relative group my-6">
      <pre
        ref={preRef}
        {...props}
        className="overflow-x-auto rounded-lg bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 px-5 py-4 text-sm text-neutral-100 font-mono leading-relaxed"
      />
      <button
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-3 top-3 rounded px-2 py-1 text-xs font-medium bg-neutral-800 text-neutral-300 opacity-0 group-hover:opacity-100 hover:bg-neutral-700 hover:text-white transition-all"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
