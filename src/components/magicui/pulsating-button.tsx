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
          "relative flex items-center justify-center px-6 py-2 text-center text-white bg-orange rounded-xl transition-all duration-200",
          disabled 
            ? "cursor-not-allowed opacity-50 bg-gray-400" 
            : "cursor-pointer hover:bg-[#e53415]",
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
        <div className={cn(
          "relative z-10 font-[600]",
          disabled ? "bg-gray-400 text-gray-600" : "bg-orange text-white"
        )}>
          {children}
        </div>
        {!disabled && (
          <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-xl text-white bg-orange" />
        )}
      </button>
    );
  }
);

PulsatingButton.displayName = "PulsatingButton";
