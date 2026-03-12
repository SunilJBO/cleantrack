import { ScanBarcode, Keyboard } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface ScannerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ScannerInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Scan or enter invoice number",
  className,
}: ScannerInputProps) {
  const [mode, setMode] = useState<"scan" | "manual">("manual");

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex gap-2">
        <button
          onClick={() => setMode("scan")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
            mode === "scan"
              ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
              : "bg-white/5 text-slate-400 border border-white/10 hover:text-white"
          )}
        >
          <ScanBarcode size={16} />
          Scan
        </button>
        <button
          onClick={() => setMode("manual")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
            mode === "manual"
              ? "bg-primary-500/20 text-primary-300 border border-primary-500/30"
              : "bg-white/5 text-slate-400 border border-white/10 hover:text-white"
          )}
        >
          <Keyboard size={16} />
          Manual
        </button>
      </div>

      {mode === "scan" ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white/5 border border-dashed border-white/10 p-12 text-slate-400">
          <ScanBarcode size={48} className="text-slate-500" />
          <p className="text-sm">Camera scanner — coming soon</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMode("manual")}
          >
            Use manual entry
          </Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) onSubmit(value.trim());
          }}
          className="flex gap-2"
        >
          <div className="flex-1">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              icon={<ScanBarcode size={18} />}
            />
          </div>
          <Button type="submit" disabled={!value.trim()}>
            Go
          </Button>
        </form>
      )}
    </div>
  );
}
