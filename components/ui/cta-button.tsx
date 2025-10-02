import React from 'react'
import { Link } from '@/i18n/navigation';

const CtaButton = ({ classes, text, href }: { classes: string | null; text: string | null, href: string}) => {
  return (
    <button className={`text-center border-2 border-transparent max-w-40 px-6 py-3 rounded-xl cursor-pointer ${classes}`}>
        <Link href={href}>
            {text || 'Get Started'}
        </Link>   
    </button>
  )
}

export default CtaButton