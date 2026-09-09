import path from "path";
import fs from "fs";

const metadataPath = path.join(process.cwd(), "content/phases/metadata.json");

export interface PhaseMeta {
  slug: string;
  order: number;
  title: string;
  summary: string;
}

export function getAllPhases(): PhaseMeta[] {
  const raw = fs.readFileSync(metadataPath, "utf8");
  return (JSON.parse(raw) as PhaseMeta[]).sort((a, b) => a.order - b.order);
}

export function getPhaseBySlug(slug: string): PhaseMeta | null {
  return getAllPhases().find((p) => p.slug === slug) ?? null;
}
