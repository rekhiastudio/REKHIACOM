"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

interface TimelineEntry {
  id: number;
  title: string;
  content: React.ReactNode;
}

type Props = {
  data: TimelineEntry[];
};


function TimelineStep({
  item,
  isRTL,
  threshold,
  setNodeRef,
  scrollYProgress
}: {
  item: { title: string; content: React.ReactNode };
  isRTL: boolean;
  threshold: number;
  setNodeRef: (el: HTMLDivElement | null) => void;
  scrollYProgress: MotionValue<number>;
}) {
  // ventana más ancha = activación suave
  const rawActive = useTransform(
    scrollYProgress,
    [threshold - 0.02, threshold + 0.02],
    [0, 1]
  );

  const active = useSpring(rawActive, {
    stiffness: 120,
    damping: 24,
    mass: 0.6
  });

  const borderColor = useTransform(active, [0, 1], ["#52525b", "#ef4444"]);
  const innerBg     = useTransform(active, [0, 1], ["#e5e7eb", "#ef4444"]);
  const glow        = useTransform(active, [0, 1], ["0 0 0 rgba(239,68,68,0)", "0 0 16px rgba(239,68,68,0.55)"]);
  const scale       = useTransform(active, [0, 1], [1, 1.08]);

  const nodeSideClass   = isRTL ? "right-3 md:right-3" : "left-3 md:left-3";
  const titleIndent     = isRTL ? "md:pr-20 text-right" : "md:pl-20";
  const contentIndent   = isRTL ? "pr-20 md:pr-4 text-right" : "pl-20 md:pl-4";

  return (
    <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
      <div className="sticky z-20 flex flex-col md:flex-row items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <motion.div
          ref={setNodeRef}
          style={{ borderColor, boxShadow: glow, scale }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className={[
            "h-10 w-10 rounded-full bg-black",
            "absolute flex items-center justify-center pointer-events-none z-0",
            "border-2",
            nodeSideClass
          ].join(" ")}
        >
          <motion.div
            style={{ backgroundColor: innerBg }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="h-4 w-4 rounded-full border border-neutral-700 p-2"
          />
        </motion.div>

        <h3 className={["hidden md:block text-xl md:text-4xl font-bold text-neutral-500 dark:text-neutral-500", titleIndent].join(" ")}>
          {item.title}
        </h3>
      </div>

      <div className={["relative w-full z-10 max-w-sm md:max-w-xl", contentIndent].join(" ")}>
        <h3 className="md:hidden block text-2xl mb-4 font-bold text-neutral-500 dark:text-neutral-500">
          {item.title}
        </h3>
        {item.content}
      </div>
    </div>
  );
}

export const TimelineUI: React.FC<Props> = ({ data }) => {
  const t = useTranslations("Process");
  const locale = useLocale();
  const isRTL = locale === "he" || locale === "ar";

  // Contenedor "scrollable" del timeline y wrapper que mide la altura total
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  // Refs por nodo para poder medir su posición vertical
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Altura total usada para la línea vertical
  const [totalHeight, setTotalHeight] = useState(0);

  // Ratios normalizados (0..1) de cada nodo respecto a la altura del contenedor medido
  const [ratios, setRatios] = useState<number[]>([]);

  // Observador para recalcular en resize/DOM changes
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      recompute();
    });

    if (measureRef.current) ro.observe(measureRef.current);
    window.addEventListener("resize", recompute);
    // Si cambian cantidad de pasos/idioma, recalculamos
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      window.removeEventListener("resize", recompute);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    // Recalcula al montar/cambiar idioma/cambiar data
    recompute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, locale]);

  const recompute = () => {
    if (!measureRef.current) return;

    const rect = measureRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const topAbs = rect.top + scrollY;
    const height = rect.height || 1;
    setTotalHeight(height);

    const r = nodeRefs.current.map((el) => {
      if (!el) return 1;
      const elRect = el.getBoundingClientRect();
      const elY = elRect.top + scrollY + elRect.height / 2; // centro del círculo
      const rel = (elY - topAbs) / height; // 0..1 dentro del contenedor
      return Math.min(Math.max(rel, 0), 1);
    });
    setRatios(r);
  };

  // Progreso del scroll relativo al contenedor grande (no el wrapper medidor)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  // Línea vertical (altura animada)
  const lineHeight: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalHeight]
  );
  const lineOpacity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.1],
    [0, 1]
  );

  // Posicionamiento LTR/RTL para línea y nodos
  const lineSideClass = isRTL ? "md:right-8 right-8" : "md:left-8 left-8";
  const nodeSideClass = isRTL ? "right-3 md:right-3" : "left-3 md:left-3";
  const titleIndentClass = isRTL ? "md:pr-20 text-right" : "md:pl-20";
  const blockIndentClass = isRTL ? "pr-20 md:pr-4 text-right" : "pl-20 md:pl-4";

  

  return (
    <div
      ref={containerRef}
      className="w-full bg-black font-sans md:px-10 "
    >
      {/* Cabecera */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-white max-w-4xl">
          {t("title")}
        </h2>
        <p className="text-neutral-300 text-sm md:text-base max-w-sm">
          {t("subtitle")}
        </p>
      </div>

      {/* Wrapper medidor (calcula alturas/ratios) */}
      <div ref={measureRef} className="relative max-w-7xl mx-auto pb-20">
        {/* Pasos */}
        {data.map((item, index) => (
          <TimelineStep
            key={index}
            item={item}
            isRTL={isRTL}
            threshold={ratios[index] ?? 1}
            setNodeRef={(el) => (nodeRefs.current[index] = el)}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Línea vertical progresiva */}
        <div
          className={[
            "absolute top-0 overflow-hidden w-[2px]",
            lineSideClass,
            "bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]",
            "from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]",
            "[mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]",
          ].join(" ")}
          style={{ height: totalHeight }}
        >
          <motion.div
            style={{ height: lineHeight, opacity: lineOpacity }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-gray-200 via-red-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineUI;
