"use client";

import { useTranslations } from "next-intl";
import { ServiceCardSpotligh } from "@/components/ui/ServiceCardSpotlight";
import CTA from "@/components/ui/cta-prefooter";

export default function Pricing() {

  const t = useTranslations("pricing.support");

  const darkCardRedWhite = {
    color: "#1a1a1a",
    effectColors: [
      [239, 68, 68],   // red-500
      [255, 255, 255], // white
    ],
    effectOpacities: [0.8, 0.16, 0.18, 0.22, 0.24, 0.28, 0.32, 0.36, 0.4, 0.45],
    effectDotSize: 3,
    effectShowGradient: true,
    effectBlend: "screen",
    gradientFrom: "rgba(239,68,68,0.30)",
    gradientTo: "rgba(239,68,68,0)",
    gradientStop: "300%",
  };
  const featuredContrast = {   
    color: "transparent",
    effectColors: [
      [190, 18, 60],  // rose-700
      [38, 38, 38],   // zinc-800
    ],
    effectOpacities: [0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.24, 0.26, 0.28],
    effectDotSize: 2,
    effectShowGradient: true,
    effectBlend: "multiply",
    gradientFrom: "rgba(0,0,0,0.06)",
    gradientTo: "rgba(0,0,0,0)",
    gradientStop: "85%"
  };

  return (
    <main className="flex flex-col min-h-screen bg-black">
      <section className="flex flex-col items-center justify-center py-10 pt-[13rem] md:pt-[15rem] px-5 md:px-20">
        <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 text-center mb-5">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-center text-neutral-600 dark:text-neutral-300">
          {t("subtitle")}
        </p>
      </section>

      <section id="service-cards" className="flex flex-col md:flex-row items-center justify-center gap-16 py-10 pb-36">
        {/* Tier 1 - Basic */}
        <ServiceCardSpotligh
          title={t("tier1.title")}
          price={t("tier1.price")}
          features={t.raw("tier1.features")}
          cta={t("cta")}
          {...darkCardRedWhite}
        />

        {/* Tier 2 - Standard (Featured) */}
        <ServiceCardSpotligh
          title={t("tier2.title")}
          price={t("tier2.price")}
          isFeatured
          features={t.raw("tier2.features")}
          note={t("tier2.subtitle")}
          cta={t("cta")}
          {...featuredContrast}
        />

        {/* Tier 3 - Premium */}
        <ServiceCardSpotligh
          title={t("tier3.title")}
          price={t("tier3.price")}
          features={t.raw("tier3.features")}
          note={t("tier3.subtitle")}
          cta={t("cta")}
          {...darkCardRedWhite}
        />
      </section>
     <CTA/>
    </main>
  );
}
