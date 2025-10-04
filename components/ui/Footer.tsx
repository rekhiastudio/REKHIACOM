import React from 'react'
import { notable, inter } from '@/lib/fonts'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
// // bg-[#141414]

export const Footer = () => {
  return (
    <footer
      dir="ltr" // <- fija el footer en LTR, evita herencias raras
      className="grid grid-cols-1 md:grid-cols-2 space-y-10 w-full bg-black text-white p-10 md:p-30 font-sans"
    >
      <div className="flex flex-col space-y-6 items-center text-md">
        <div className="flex items-center justify-center md:justify-start gap-x-4 w-[24rem]">
          <Image
            src="/logo-512.png"
            alt="Rekhia Logo"
            width={120}
            height={120}
            priority
            className="h-16 w-auto"
          />
          <h5 className="font-[Notable]">REKHIA UX & <br />SOFTWARE STUDIO</h5>
        </div>

        <div className="flex flex-col space-y-3 text-center md:text-start w-[24rem]">
          <p className="text-xs">
            Simple solutions, scalable foundations, and a vision that goes<br />
            beyond the present. Rekhia blends practical execution<br />
            with bold imagination.
          </p>
          <p className="text-xs hidden md:block">
            © 2025 Busdigital LLC All rights reserved
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-5">
        <div className="flex flex-col">
          <div className="flex flex-col space-y-6">
            {/* usa gap-x-* en lugar de space-x-* */}
            <ul className="flex gap-x-8 justify-center md:justify-start">
              <li><Link className="text-sm hover:underline" href="/faq">FAQ</Link></li>
              <li><Link className="text-sm hover:underline" href="/docs/about">About</Link></li>
              <li><Link className="text-sm hover:underline" href="/contact">Contact</Link></li>
            </ul>

            <ul className="flex gap-x-8 justify-center md:justify-start">
              <li><Link className="text-sm hover:underline" href="/docs/privacy-policy">Privacy Policy</Link></li>
              <li><Link className="text-sm hover:underline" href="/docs/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-xs text-center md:hidden">
        © 2025 Busdigital LLC All rights reserved
      </p>
    </footer>
  );
};
