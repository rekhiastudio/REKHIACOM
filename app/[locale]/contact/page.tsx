import React from 'react'
import ContactForm from '@/components/ContactForm';
import { inter } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Contact() {

    const t = useTranslations("Contact");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  min-h-screen  bg-black">
        <section className="flex fle-col pt-[12rem] pb-10 md:pt-10 items-center justify-center bg-black">
            <ContactForm />
        </section>

        <section className="flex flex-col  items-center justify-center bg-gradient-to-b from-[#737373] to-[#D9D9D9]">
            <div className="md:pt-7 flex flex-col py-20 md:py-0 md:h-[35rem] space-y-5 ">
                <div className=''>
                    <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 text-center md:text-start">
                        {t("social.title")}
                    </h2>
                      <p className="mt-2 max-w-sm text-md text-neutral-600 dark:text-neutral-300 text-center md:text-start">
                        {t("social.desc")}
                      </p>                    
                </div>

                <div className='flex items-center justify-center md:justify-start space-x-4'>
                        <a
                        href="https://x.com/RekhiaStudio"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                            src="/x-black.svg"
                            alt="X (Twitter)"
                            width={80}
                            height={80}
                            className="h-12 w-16 md:h-10  "
                        />
                        </a>

                        <Image
                            src="/whatsapp.svg"
                            alt="WhatsApp"
                            width={80}
                            height={80}
                            className="h-12 w-12 md:h-10  "
                        />

                        <a  
                        href="https://discord.gg/kAUrreApUN"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                            src="/discord.svg"
                            alt="Discord"
                            width={80}
                            height={80}
                            className="h-16 w-16 md:h-14 "
                        />
                        </a>

                        <a
                        href="mailto:rekhiastudio@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                            src="/email-black.svg"
                            alt="Gmail"
                            width={80}
                            height={80}
                            className="h-12 w-16 md:h-10 "
                        />
                        </a>
                </div>
            </div>
        </section>
    </div>
  );
};