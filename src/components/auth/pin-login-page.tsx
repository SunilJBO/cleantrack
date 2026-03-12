import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Delete } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { GlassCard } from "../ui/glass-card";
import { cn } from "../../lib/utils";

export function PinLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDigit = (digit: string) => {
    if (pin.length >= 4) return;
    setError(false);
    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === 4) {
      const ok = login(newPin);
      if (ok) {
        setSuccess("Welcome!");
        setTimeout(() => navigate("/"), 500);
      } else {
        setError(true);
        setTimeout(() => {
          setPin("");
          setError(false);
        }, 800);
      }
    }
  };

  const handleDelete = () => {
    setPin((p) => p.slice(0, -1));
    setError(false);
  };

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-sm text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-500/20 mb-4">
            <Sparkles size={32} className="text-primary-400" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-white">
            CleanTrack
          </h1>
          <p className="text-sm text-slate-400 mt-1">Enter your PIN to sign in</p>
        </div>

        {/* PIN dots */}
        <div className="flex justify-center gap-3 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "h-4 w-4 rounded-full border-2 transition-all duration-200",
                i < pin.length
                  ? error
                    ? "bg-red-400 border-red-400"
                    : success
                      ? "bg-emerald-400 border-emerald-400"
                      : "bg-primary-400 border-primary-400"
                  : "border-white/20"
              )}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 animate-pulse">
            Invalid PIN
          </p>
        )}

        {success && (
          <p className="text-emerald-400 text-sm mb-4">{success}</p>
        )}

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-3">
          {digits.map((d, i) => {
            if (d === "") return <div key={i} />;
            if (d === "del") {
              return (
                <button
                  key={i}
                  onClick={handleDelete}
                  className="flex items-center justify-center h-14 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Delete size={22} />
                </button>
              );
            }
            return (
              <button
                key={i}
                onClick={() => handleDigit(d)}
                className="flex items-center justify-center h-14 rounded-xl text-lg font-medium text-white hover:bg-white/10 active:bg-white/20 transition-all"
              >
                {d}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 mt-6">
          Demo PINs: 1234 (Store) · 1111 (Driver) · 3333 (Plant)
        </p>
      </GlassCard>
    </div>
  );
}
