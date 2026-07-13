const statusStyles: Record<string, string> = {
  planning: "bg-gray-100 text-gray-600",
  "in-progress": "bg-amber-100 text-amber-700",
  ready: "bg-blue-100 text-blue-700",
  deployed: "bg-emerald-100 text-emerald-700",
  archived: "bg-slate-100 text-slate-600",
};

const deployStyles: Record<string, string> = {
  "not-deployed": "bg-gray-100 text-gray-600",
  deploying: "bg-amber-100 text-amber-700",
  live: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-600",
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
