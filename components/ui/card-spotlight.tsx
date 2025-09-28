"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  effectColors,
  effectOpacities,
  effectDotSize,
  effectShowGradient = true,
  effectBlend = "normal",          // "normal" | "screen" | "multiply"
  gradientFrom,                    // ej: "rgba(239,68,68,0.35)"
  gradientTo,                      // ej: "rgba(239,68,68,0)"
  gradientStop = "84%",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
  effectColors?: number[][];
  effectOpacities?: number[];
  effectDotSize?: number;
  effectShowGradient?: boolean;
  effectBlend?: "normal" | "screen" | "multiply";
  gradientFrom?: string;
  gradientTo?: string;
  gradientStop?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        "group/spotlight relative isolate overflow-hidden rounded-md border border-neutral-800 bg-black",
        "p-10",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* EFECTO AL FONDO */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName={cn(
              "absolute inset-0 bg-transparent pointer-events-none",
              effectBlend === "screen"
                ? "mix-blend-screen"
                : effectBlend === "multiply"
                ? "mix-blend-multiply"
                : "mix-blend-normal"
            )}
            colors={effectColors ?? [[59, 130, 246], [139, 92, 246]]}
            opacities={
              effectOpacities ?? [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]
            }
            dotSize={effectDotSize ?? 3}
            showGradient={effectShowGradient}
            gradientFrom={gradientFrom}
            gradientTo={gradientTo}
            gradientStop={gradientStop}
          />
        )}
      </motion.div>

      {/* CONTENIDO POR ENCIMA */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
