import { cn } from "../../lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "light" | "dark";
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hover = false,
  onClick,
}: GlassCardProps) {
  const variants = {
    default: "glass",
    light: "glass-light",
    dark: "glass-dark",
  };

  return (
    <div
      className={cn(
        variants[variant],
        "rounded-2xl p-6",
        hover && "glass-hover cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
