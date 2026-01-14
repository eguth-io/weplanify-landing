import { cn } from "@/lib/utils";
import React from "react";

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export const PulsatingButton = React.forwardRef<
  HTMLButtonElement,
  PulsatingButtonProps
>(
  (
    {
      className,
      children,
      pulseColor = "#F6391A26",
      duration = "1.5s",
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative flex cursor-pointer items-center justify-center px-6 py-2 text-center text-[#FFFBF5] bg-orange rounded-full",
          className
        )}
        style={
          {
            "--pulse-color": disabled ? "#transparent" : pulseColor,
            "--duration": duration,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="relative z-10 bg-orange text-[#FFFBF5] font-[600]">
          {children}
        </div>
        <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full text-[#FFFBF5] bg-orange" />
      </button>
    );
  }
);

PulsatingButton.displayName = "PulsatingButton";
