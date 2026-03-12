import { forwardRef } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-xl bg-white/8 border border-white/12 px-4 py-2.5 text-sm text-white placeholder:text-slate-500",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50",
              "transition-all duration-200",
              icon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
