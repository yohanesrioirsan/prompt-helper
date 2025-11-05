import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "cancel";
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variantClasses = {
      primary:
        "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      secondary:
        "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      cancel: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "px-6 py-2 font-semibold text-white rounded-lg transition-all duration-200 backdrop-blur-md border border-white/20 shadow-lg bg-gradient-to-r",
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
GlassButton.displayName = "GlassButton";

export { GlassButton };
