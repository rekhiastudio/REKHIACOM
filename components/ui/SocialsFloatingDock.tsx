'use client'

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import Image from "next/image";

export function SocialsFloatingDockDemo() {
  const links = [
    {
      title: "X",
      icon: (
        <Image
            src="/x-black.svg"
            alt="X (Twitter)"
            width={80}
            height={80}
            // className="h-12 w-16 md:h-10  "
        />
      ),
      href: "https://x.com/RekhiaStudio",
    },
    {
      title: "Whatsapp Bussiness",
      icon: (
        <Image
            src="/whatsapp.svg"
            alt="WhatsApp"
            width={80}
            height={80}
            // className="h-12 w-12 md:h-10  "
        />
      ),
      href: "#",
    },

    {
      title: "Discord",
      icon: (
            <Image
                src="/discord.svg"
                alt="Discord"
                width={80}
                height={80}
                // className="w-20"
            />
      ),
      href: "https://discord.gg/kAUrreApUN",
    },
    {
      title: "Email",
      icon: (
            <Image
                src="/email-black.svg"
                alt="Email"
                width={80}
                height={80}
                // className="h-12 w-16 md:h-10 "
            />
      ),
      href: "mailto:rekhiastudio@gmail.com",
    },
  ];
  return (
    <div className="flex items-center justify-center md:justify-start space-x-4">
      <FloatingDock
        items={links}
      />
     </div>
  );
}
