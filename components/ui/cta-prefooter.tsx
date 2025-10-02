import React from 'react'
import Image from 'next/image'
import { inter } from '@/lib/fonts'
import CtaButton from './cta-button'
import { useTranslations } from 'next-intl'

const CTA = () => {
  const t = useTranslations('CTA');

  return (
    <section id='cta' className='grid grid-cols-1 md:grid-cols-2 w-full p-10 bg-white'>
      <div className="flex justify-center md:justify-end md:items-center md:p-[5rem]">
          <Image
            src="/logo-1024.png"
            alt="Call to Action"
            width={1024}
            height={1024}
            className="hidden md:block md:h-[26rem] md:w-[26rem] rounded-lg object-cover"
          />
      </div>
      <div className="flex flex-col justify-center space-y-6">
        <div className='flex flex-col space-y-3'>
          <h3 className={`${inter.className} text-2xl md:text-3xl`}>{t('title')}</h3>
          <p className={`${inter.className} text-md md:text-xl md:max-w-xl`}>{t('subtitle')}</p>
        </div>
        <CtaButton 
          href='/contact'
          text={t('button')} 
          classes="hover:border-red-500 transition-all duration-500 bg-black text-white"
        />
      </div>
    </section>
  )
}

export default CTA