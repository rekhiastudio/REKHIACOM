import React from 'react'

const CtaButton = ({ classes, text }: { classes: string | null; text: string | null}) => {
  return (
    <button className={`border-2 border-transparent max-w-40 px-6 py-3 rounded-xl cursor-pointer ${classes}`}>
        {text || 'Get Started'}
    </button>
  )
}

export default CtaButton