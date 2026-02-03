import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type GlassSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void | Promise<void>;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

export function GlassSwitch({
  checked,
  onCheckedChange,
  className,
  disabled,
  ...aria
}: GlassSwitchProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={async () => {
        if (disabled) return;
        await onCheckedChange(!checked);
      }}
      className={cn(
        "relative w-14 h-8 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
        checked
          ? "bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30"
          : "bg-muted/80 dark:bg-muted/50",
        className,
      )}
      {...aria}
    >
      <motion.div
        // Prevents the knob from animating on mount/remount (fixes the "flicker" / "moving by itself" effect)
        initial={false}
        animate={{ x: checked ? 24 : 2 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 30 }
        }
        className="absolute top-1 w-6 h-6 rounded-full bg-background shadow-md"
      />
    </button>
  );
}
