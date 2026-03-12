import { Search, X } from "lucide-react";
import { Input } from "./input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search orders...",
  className,
}: SearchBarProps) {
  return (
    <div className={className}>
      <div className="relative">
        <Input
          icon={<Search size={18} />}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
