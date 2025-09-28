import React from 'react'
import { TimelineUI } from './timeline-ui'
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const TimelineDemo = () => {

    const t = useTranslations('Timeline');

    const data = [
    {
      title: t('step1.title'),
      content: (
        <div>
          <p className="text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
              {t('step1.desc')}
          </p>

          <div className="grid grid-cols-2 gap-6  space-y-4 md:gap-12 mt-[8rem]">
            <Image
              src="/whatsapp.svg"
              alt="WhatsApp"
              width={80}
              height={80}
              className="h-12 w-12 md:h-20 md:w-16 mx-auto"
            />
            <Image
              src="/discord.svg"
              alt="Discord"
              width={80}
              height={80}
              className="h-16 w-16 md:h-20 md:w-20 mx-auto"
            />
            <Image
              src="/x.svg"
              alt="X (Twitter)"
              width={80}
              height={80}
              className="h-12 w-16 md:h-20 md:w-16 mx-auto "
            />
            <Image
              src="/email.svg"
              alt="Gmail"
              width={80}
              height={80}
              className="h-12 w-16 md:h-20 md:w-16 mx-auto"
            />
          </div>
        </div>
      ),
    },
      {
        title: t('step2.title'),
        content: (
          <div>
            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
                {t('step2.desc')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://assets.aceternity.com/pro/hero-sections.png"
                alt="hero template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
              <Image
                src="https://assets.aceternity.com/features-section.png"
                alt="feature template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
              <Image
                src="https://assets.aceternity.com/pro/bento-grids.png"
                alt="bento template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
              <Image
                src="https://assets.aceternity.com/cards.png"
                alt="cards template"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </div>
          </div>
        ),
      },
      {
        title: t('step3.title'),
        content: (
          <div>
            <p className="mb-4 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
              {t('step3.desc')}
            </p>
            <div className="mb-20">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ✅ Responsive
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ✅ Scalable
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <Image
              src="/nextjs.svg"
              alt="Next.js"
              width={80}
              height={80}
              className="h-12 w-12 md:h-20 md:w-16 mx-auto"
            />
            <Image
              src="/tailwind.svg"
              alt="Tailwind CSS"
              width={80}
              height={80}
              className="h-16 w-16 md:h-20 md:w-20 mx-auto"
            />
            </div>
          </div>
        ),
      },
      {
        title: t('step4.title'),
        content: (
          <div>
            <p className="mb-20 text-xs font-normal text-neutral-800 md:text-base dark:text-neutral-200">
                {t('step4.desc')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/vercel.svg"
                alt="Vercel"
                width={80}
                height={80}
                className="h-12 w-12 md:h-[8rem] md:w-[8rem] mx-auto my-auto"
                />
              <Image
                src="/image.png"
                alt="Support Plans"
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
              />
            </div>
          </div>
        ),
      },
    ];

    return ( 
      <section id="timeline" className='w-full overflow-y-hidden'>
            <TimelineUI data={data} /> 
      </section>
  )
}

export default TimelineDemo