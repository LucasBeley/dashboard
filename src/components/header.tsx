interface HeaderProps {
  totalApps: number;
  deployedCount: number;
  inProgressCount: number;
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="font-semibold text-gray-200">{value}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

export function Header({
  totalApps,
  deployedCount,
  inProgressCount,
}: HeaderProps) {
  return (
    <header className="border-b border-white/[0.06] bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-100">
              Workspace
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Apps built with Claude
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatPill label="apps" value={totalApps} />
            <span className="text-gray-700">|</span>
            <StatPill label="deployed" value={deployedCount} />
            <span className="text-gray-700">|</span>
            <StatPill label="in progress" value={inProgressCount} />
          </div>
        </div>
      </div>
    </header>
  );
}
