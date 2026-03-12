import { ScanBarcode, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { STAFF_ROLE_LABELS } from "../../lib/constants";
import { Button } from "../ui/button";

export function Header() {
  const { currentStaff, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="glass-dark sticky top-0 z-40 flex items-center justify-between px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-lg font-semibold text-white hidden md:block">
          CleanTrack
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/orders/new")}
          className="hidden md:flex"
        >
          <ScanBarcode size={18} />
          Quick Scan
        </Button>

        {currentStaff && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">
                {currentStaff.name}
              </p>
              <p className="text-xs text-slate-400">
                {STAFF_ROLE_LABELS[currentStaff.role]}
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
