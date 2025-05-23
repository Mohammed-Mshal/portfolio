'use client'
import Link from 'next/link'
import React from 'react'
import { motion } from 'motion/react'
import type { SocialMedia } from '@prisma/client'
import Image from 'next/image'


export default function SocialMedia({ listSocial }: { listSocial: SocialMedia[] | undefined }) {
    return (
        <ul className='m-0 p-0 flex items-center lg:gap-4 gap-2 lg:text-2xl md:text-xl text-lg'>
            {listSocial &&
                listSocial.map((item, index) => {
                    return <motion.li key={index}
                        initial={{
                            translateY: -80
                        }}
                        animate={{
                            translateY: 0
                        }}
                        transition={{
                            duration: .3,
                            delay: index / 10 + .2,
                            ease: 'easeInOut'
                        }}>
                        <Link href={item.type === 'CALL' ? `tel:${item.link}` : item.type === 'EMAIL' ? `mailto:${item.link}` : item.type === 'WHATSAPP' ? `https://wa.me/${item.link}` : item.link} className='text-white text-opacity-60 hover:text-opacity-100 hover:text-indigo-700 transition-all'>
                            <Image src={item.icon} alt='Icon' height={40} width={40} />
                        </Link>
                    </motion.li>
                })
            }
        </ul>
    )
}
