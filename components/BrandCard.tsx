import { Trash2 } from "lucide-react";
import PlatformRow from "./PlatformRow";

export default function BrandCard({ name, platforms, onDelete }: {
  name: string;
  platforms: string[];
  onDelete: () => void;
}) {
  return (
    <div className="rounded-[32px] bg-[#f7f7f8] p-7">
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-semibold">{name}</h2>
        <button type="button" onClick={() => { if (window.confirm(`Delete ${name}?`)) onDelete(); }} aria-label={`Delete ${name}`} className="flex items-center gap-2 rounded-full px-3 py-2 text-xs text-gray-400 transition hover:bg-red-50 hover:text-red-600">
          <Trash2 size={15} /> Delete
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {platforms.map((platform) => <PlatformRow key={platform} name={platform} />)}
      </div>
    </div>
  );
}
