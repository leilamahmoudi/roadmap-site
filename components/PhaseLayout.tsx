import { getAllPhases } from "@/lib/phases";
import { Sidebar } from "@/components/Sidebar";

export function PhaseLayout({ children }: { children: React.ReactNode }) {
  const phases = getAllPhases();
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar phases={phases} />
      <main className="flex-1 min-w-0 px-6 py-12">
        <div className="mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
          {children}
        </div>
      </main>
    </div>
  );
}
