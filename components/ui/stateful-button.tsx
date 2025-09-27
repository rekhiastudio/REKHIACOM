"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, AnimatePresence, useAnimate } from "motion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  className,
  children,
  disabled = false,
  loading = false,
  success = false,
  bTitle = true,
  error = false,
  ...props
}: ButtonProps & { loading?: boolean; success?: boolean; bTitle?: boolean; error?: boolean }) => {
  const [scope, animate] = useAnimate();

  const showLoader = async () => {
    await animate(".check", { width: 0, scale: 0, display: "none" }, { duration: 0.1 });
    await animate(".loader", { width: 20, scale: 1, display: "block" }, { duration: 0.2 });
  };

  const showSuccess = async () => {
    await animate(".loader", { width: 0, scale: 0, display: "none" }, { duration: 0.2 });
    await animate(".check", { width: 20, scale: 1, display: "block" }, { duration: 0.2 });
    // opcional: ocultar check después de unos segundos
    await animate(".check", { width: 0, scale: 0, display: "none" }, { delay: 2, duration: 0.2 });
  };

  const showIdle = async () => {
    // estado “reposo” (sin loader ni check)
    await animate(".loader", { width: 0, scale: 0, display: "none" }, { duration: 0.1 });
    await animate(".check", { width: 0, scale: 0, display: "none" }, { duration: 0.1 });
  };

  const showError = async () => {
    await animate(".loader", { width: 0, scale: 0, display: "none" }, { duration: 0.2 });
    await animate(".fail", { width: 20, scale: 1, display: "block" }, { duration: 0.2 });
    await animate(".fail", { width: 0, scale: 0, display: "none" }, { delay: 2, duration: 0.2 });
  };


    const stateClasses = error
    ? "bg-neutral-700/70 ring-1 ring-red-500"
    : "bg-gradient-to-br from-black to-neutral-600 hover:ring-2 hover:ring-green-500";

  const disabledClasses =
    disabled || loading
      ? "opacity-60 cursor-not-allowed hover:ring-0 pointer-events-none"
      : "cursor-pointer";


  React.useEffect(() => {
    if (loading) {
      showLoader();
    } else if (success) {
      showSuccess();
    } else if (error) {
      // aquí podrías mostrar una animación de error si agregas un ícono ❌
      showError();
    } else {
      showIdle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, success, error]);

  return (
    <motion.button
      layout
      layoutId="button"
      ref={scope}
      className={cn(
        "flex min-w-[120px] items-center justify-center gap-2 rounded-full px-4 py-2 font-medium text-white transition",
        stateClasses,
        disabledClasses,
        className
      )}
      {...props}
    >
      <motion.div layout className="flex items-center justify-center gap-2">
        <Loader />
        <CheckIcon />
        <FailIcon />
        <motion.span layout className={bTitle ? "block" : "hidden"}>
          {children}
        </motion.span>
      </motion.div>
    </motion.button>
  );
};


const Loader = () => {
  return (
    <motion.svg
      animate={{
        rotate: [0, 360],
      }}
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        ease: "linear",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="loader text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </motion.svg>
  );
};

const CheckIcon = () => {
  return (
    <motion.svg
      initial={{
        scale: 0,
        width: 0,
        display: "none",
      }}
      style={{
        scale: 0.5,
        display: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </motion.svg>
  );
};


const FailIcon = () => (
  <motion.svg
    initial={{ scale: 0, width: 0, display: "none" }}
    style={{ scale: 0.5, display: "none" }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="fail text-red-500"
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </motion.svg>
);



{/* <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#ff0000" d="m16.192 6.344l-4.243 4.242l-4.242-4.242l-1.414 1.414L10.535 12l-4.242 4.242l1.414 1.414l4.242-4.242l4.243 4.242l1.414-1.414L13.364 12l4.242-4.242z"/></svg> */}