const statusStyles: Record<string, string> = {
  planning: "bg-gray-500/15 text-gray-400",
  "in-progress": "bg-amber-500/15 text-amber-400",
  ready: "bg-blue-500/15 text-blue-400",
  deployed: "bg-emerald-500/15 text-emerald-400",
  archived: "bg-slate-500/15 text-slate-500",
};

const deployStyles: Record<string, string> = {
  "not-deployed": "bg-gray-500/15 text-gray-400",
  deploying: "bg-amber-500/15 text-amber-400",
  live: "bg-emerald-500/15 text-emerald-400",
  failed: "bg-red-500/15 text-red-400",
};

export function StatusBadge({
  status,
  type = "status",
}: {
  status: string;
  type?: "status" | "deploy";
}) {
  const styles = type === "deploy" ? deployStyles : statusStyles;
  const className = styles[status] ?? "bg-gray-500/15 text-gray-400";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {status}
    </span>
  );
}
