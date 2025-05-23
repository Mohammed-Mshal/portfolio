import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BoxLink(
  {
    title,
    description,
    href,
    icon,
  }:
    {
      title: string,
      description: string,
      href: string,
      icon: string,
    }
) {
  return (
    <div className='box relative flex-1 min-w-[250px] group overflow-hidden  rounded-2xl'>
      <Link href={href} className='absolute top-0 left-0 w-full h-full z-30'></Link>
      <div className="description  absolute opacity-0 -bottom-full group-hover:bottom-0 group-hover:opacity-100 bg-linear-to-t backdrop-blur-sm z-20 from-black/60 to-indigo-600 h-full transition-all p-4 duration-500 w-full flex items-center justify-center font-bold text-lg">
        {description}
      </div>
      <div className='box-content relative  flex flex-col items-center gap-4 p-6 h-[150px] justify-center bg-white/25 backdrop-blur-2xl'>
        <div className='box-icon '>
          <Image src={icon} alt={title} width={40} height={40} />
        </div>
        <div className='box-title'>
          <h3 className='font-bold'>{title}</h3>
        </div>
      </div>
    </div>
  )
}
