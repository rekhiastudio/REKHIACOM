import React from 'react'
import Image from 'next/image';

export const ServiceCard = ({
    url, 
    title, 
    description}: {
    url: string; 
    title: string; 
    description: string
}) => {

  return (
    <div 
        style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        className='flex h-[40rem] rounded-3xl md:mx-16'
    >
        <div className='flex h-full w-full bg-black/50 rounded-3xl items-end pb-16'>
            <div className='px-10'>
                <h3 className='text-3xl font-bold text-white mb-4'>{title}</h3>
                <p className='text-white text-[16px]'>{description}</p>
            </div>
        </div> 
    </div>
  )
}
