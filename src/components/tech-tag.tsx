export function TechTag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-400 ring-1 ring-white/10">
      {name}
    </span>
  );
}
