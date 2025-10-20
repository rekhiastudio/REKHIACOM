"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { inter } from "@/lib/fonts";
import CtaButton from "./cta-button";
import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import { notable } from "@/lib/fonts";

type Product = { title: string; link: string; thumbnail: string };

export const HeroParallax = ({ products }: { products: Product[] }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const locale = useLocale();
  const isRTL = locale === "he";

  // Distancia horizontal: usa un valor menor en móviles para no “sacar” las filas de pantalla.
  // (Puedes tunear este número si quieres aún más suavidad).
  const DIST = 900;

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };


  // const translateX = useSpring(
  //   useTransform(
  //     scrollYProgress,
  //     [0, 1],
  //     [0, isRTL ? -DIST : DIST] // invierte el signo en RTL
  //   ),
  //   springConfig
  // );

  // const translateXReverse = useSpring(
  //   useTransform(
  //     scrollYProgress,
  //     [0, 1],
  //     [0, isRTL ? DIST : -DIST] // invierte al revés en RTL
  //   ),
  //   springConfig
  // );

  // ⬅️➡️ Dirección consciente de RTL
  const translateX = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, DIST] // invierte el signo en RTL
    ),
    springConfig
  );

  const translateXReverse = useSpring(
    useTransform(
      scrollYProgress,
      [0, 1],
      [0,  -DIST] // invierte al revés en RTL
    ),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[250vh] pt-40 p-12 md:p-16 md:pt-[15rem] antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className={`${isRTL && 'mt-40 md:mt-0'}`}
      >
        {/* Fila 1 */}
        <motion.div
          className={`flex ${isRTL ? "flex-row" : "flex-row-reverse"} gap-20 mb-20`}
        >
          {firstRow.map((p) => (
            <ProductCard key={p.title} product={p} translate={translateX} />
          ))}
        </motion.div>

        {/* Fila 2 (invertida respecto a la 1) */}
        <motion.div
          className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"} gap-20 mb-20`}
        >
          {secondRow.map((p) => (
            <ProductCard key={p.title} product={p} translate={translateXReverse} />
          ))}
        </motion.div>

        {/* Fila 3 igual que la 1 */}
        <motion.div
          className={`flex ${isRTL ? "flex-row" : "flex-row-reverse"} gap-20`}
        >
          {thirdRow.map((p) => (
            <ProductCard key={p.title} product={p} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {

  const locale = useLocale();
  const isRTL = locale === "he";

  const t = useTranslations("Hero");
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 md:pl-20 w-full left-0 top-0 ">
      <h1 className="text-[1.7rem] md:text-6xl font-bold text-white">
        {t.rich("title", {
          tl: (chunks) => <span className={`${!isRTL && notable.className} text-red-500`}>{chunks}</span>,
          cl: (chunks) => <span className="text-red-500">{chunks}</span>,
          break: (chunks) => (
            <>
              <br className="hidden md:block" />
              {chunks}
            </>
          ),
          ltr: (chunks) => (
            <span className="text-red-500" dir="ltr">
              {chunks}
            </span>
          ),
        })}
      </h1>

      <p className={`${inter.className} max-w-xl text-base md:text-xl mt-4 md:mt-8 text-neutral-200 `}>
        {t("subtitle")}
      </p>

      <CtaButton
        href="/contact"
        text={t("cta")}
        classes="hover:border-red-500 transition-all duration-500 bg-white text-black mt-10 font-bold"
      />
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
