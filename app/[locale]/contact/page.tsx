import React from 'react'
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SocialsFloatingDockDemo } from '@/components/ui/SocialsFloatingDock';

export default function Contact() {

  const t = useTranslations("Contact");

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-black">
        <section id='contact-form' className="flex fle-col pt-[12rem] pb-10 md:pt-10 md:pb-0 items-center justify-center bg-black ">
            <ContactForm />
        </section>

        <section id='socials-cta' className="flex flex-col md:pt-10 items-center justify-center bg-gradient-to-b from-[#737373] to-[#D9D9D9]">
            <div className="flex flex-col py-20 md:py-0 md:px-8 md:h-[31rem] w space-y-5">
                <div className=''>
                    <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 text-center md:text-start">
                        {t("social.title")}
                    </h2>
                      <p className="mt-2 max-w-sm text-md text-neutral-600 dark:text-neutral-300 text-center md:text-start">
                        {t("social.desc")}
                      </p>                    
                </div>

                <SocialsFloatingDockDemo/>    
            </div>
        </section>
    </main>
  );
};