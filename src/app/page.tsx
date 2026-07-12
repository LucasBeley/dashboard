import { scanWorkspace } from "@/lib/scanner";
import { AppGrid } from "@/components/app-grid";
import { Header } from "@/components/header";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const apps = await scanWorkspace();

  const configured = apps.filter((a) => a.meta !== null);
  const deployed = configured.filter(
    (a) => a.meta?.deploy?.status === "live"
  );
  const inProgress = configured.filter(
    (a) => a.meta?.status === "in-progress"
  );

  return (
    <div className="min-h-screen">
      <Header
        totalApps={configured.length}
        deployedCount={deployed.length}
        inProgressCount={inProgress.length}
      />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <AppGrid apps={apps} />
      </main>
    </div>
  );
}
