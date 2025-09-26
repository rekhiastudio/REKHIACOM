import React from 'react'
import { inter } from '@/lib/fonts'
import { ServiceCard } from './service-card'
import { useTranslations } from 'next-intl'

const Services = () => {

    const t = useTranslations('Services');

  return (
    <section className='flex flex-col space-y-24 w-full bg-white p-10 md:p-30 '>
        <h2 className={`${inter.className} text-4xl text-center md:px-16 w-full mt-10 md:mt-0`}>
            {t('title')}
        </h2>

        <div className='grid grid-cols-1 2xl:grid-cols-3 space-y-10'>
            <ServiceCard
                url='/dev-service.png'
                title={t('web.title')}
                description={t('web.desc')}
            />
            <ServiceCard
                url='/ux-service.png'
                title={t('ux.title')}
                description={t('ux.desc')}

            />
            <ServiceCard
                url='/plan-service.png'
                title={t('support.title')}
                description={t('support.desc')}
            />
        </div>
    </section>
  )
}

export default Services