import type { DiscoveredApp } from "@/lib/scanner";
import { AppCard } from "./app-card";

export function AppGrid({ apps }: { apps: DiscoveredApp[] }) {
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-4xl mb-4 opacity-30">0</div>
        <h2 className="text-lg font-medium text-gray-400">No apps yet</h2>
        <p className="mt-1 text-sm text-gray-600 max-w-sm">
          Apps will appear here once sibling directories contain an{" "}
          <code className="text-gray-400 font-mono text-xs">
            app.meta.json
          </code>{" "}
          file.
        </p>
      </div>
    );
  }

  const configured = apps.filter((a) => a.meta !== null);
  const unconfigured = apps.filter((a) => a.meta === null);

  return (
    <div className="space-y-8">
      {configured.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {configured.map((app) => (
            <AppCard key={app.folderName} app={app} />
          ))}
        </div>
      )}

      {unconfigured.length > 0 && (
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-600 mb-3">
            Unconfigured directories
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {unconfigured.map((app) => (
              <AppCard key={app.folderName} app={app} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
