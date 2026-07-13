interface HeaderProps {
  totalApps: number;
  deployedCount: number;
  inProgressCount: number;
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="font-semibold text-gray-800">{value}</span>
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
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Workspace
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <StatPill label="apps" value={totalApps} />
            <span className="text-gray-300">|</span>
            <StatPill label="deployed" value={deployedCount} />
            <span className="text-gray-300">|</span>
            <StatPill label="in progress" value={inProgressCount} />
          </div>
        </div>
      </div>
    </header>
  );
}
