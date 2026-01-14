import { cn } from "@/lib/utils";
import React from "react";

interface PulsatingButtonWhiteProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export const PulsatingButtonWhite = React.forwardRef<
  HTMLButtonElement,
  PulsatingButtonWhiteProps
>(
  (
    {
      className,
      children,
      pulseColor = "#ffffff80",
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
          "relative flex items-center justify-center px-6 py-2 text-center text-black bg-white rounded-xl transition-all duration-200",
          disabled 
            ? "cursor-not-allowed opacity-50 bg-gray-400" 
            : "cursor-pointer hover:bg-gray-50",
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
          disabled ? "text-gray-600" : "text-black"
        )}>
          {children}
        </div>
        {!disabled && (
          <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-xl text-black bg-white" />
        )}
      </button>
    );
  }
);

PulsatingButtonWhite.displayName = "PulsatingButtonWhite";
