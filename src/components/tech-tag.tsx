export function TechTag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 ring-1 ring-gray-200">
      {name}
    </span>
  );
}
