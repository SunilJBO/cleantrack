import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Truck, Factory } from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/orders/new", icon: PlusCircle, label: "New" },
  { to: "/logistics", icon: Truck, label: "Logistics" },
  { to: "/plant", icon: Factory, label: "Plant" },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-white/6">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all min-w-[60px]",
                isActive
                  ? "text-primary-400"
                  : "text-slate-500 hover:text-slate-300"
              )
            }
          >
            <item.icon size={22} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
