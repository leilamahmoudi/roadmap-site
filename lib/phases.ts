import fs from "fs";
import path from "path";
import matter from "gray-matter";

const phasesDir = path.join(process.cwd(), "content/phases");

export interface PhaseMeta {
  slug: string;
  order: number;
  title: string;
  summary: string;
}

export function getAllPhases(): PhaseMeta[] {
  const files = fs
    .readdirSync(phasesDir)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(phasesDir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        order: data.order as number,
        title: data.title as string,
        summary: data.summary as string,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getPhaseBySlug(slug: string): PhaseMeta | null {
  return getAllPhases().find((p) => p.slug === slug) ?? null;
}
