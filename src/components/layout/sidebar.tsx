import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Truck,
  Factory,
  Sparkles,
} from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/orders/new", icon: PlusCircle, label: "New Order" },
  { to: "/logistics", icon: Truck, label: "Logistics" },
  { to: "/plant", icon: Factory, label: "Plant" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 glass-dark min-h-screen">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/6">
        <Sparkles size={24} className="text-primary-400" />
        <span className="font-heading text-lg font-semibold text-white">
          CleanTrack
        </span>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary-500/20 text-primary-300"
                  : "text-slate-400 hover:text-white hover:bg-white/8"
              )
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
