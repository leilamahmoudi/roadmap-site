import { getAllPhases, getPhaseBySlug } from "@/lib/phases";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPhases().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const phase = getPhaseBySlug(slug);
  if (!phase) return {};
  return { title: phase.title };
}

export default async function PhasePage({ params }: Props) {
  const { slug } = await params;
  const phase = getPhaseBySlug(slug);
  if (!phase) notFound();

  const { default: Content } = await import(
    `@/content/phases/${slug}.mdx`
  );

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 prose prose-neutral dark:prose-invert">
      <Content />
    </main>
  );
}
