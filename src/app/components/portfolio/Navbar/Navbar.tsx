'use client'
import { useScroll, useSpring } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import IconLogo from 'static/iconLogo.svg'
import { motion } from "motion/react"
const listMenu: { link: string, text: string }[] = [
    {
        link: '#about',
        text: 'About'
    }, {
        link: '#portfolio',
        text: 'Portfolio'
    }, {
        link: '#experience',
        text: 'Experience'
    }, {
        link: '#contact',
        text: 'Contact'
    }, {
        link: '/dashboard',
        text: 'Settings'
    }
]
export default function Navbar() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress)
    return (
        <motion.div
            initial={{
                translateX: -100
            }}
            animate={{
                translateX: 0
            }}
            transition={{
                duration: .3,
                ease: 'easeInOut'
            }}
            className={`sticky top-0 left-0 h-screen w-fit z-30`}>
            <div className="flex flex-col gap-8 py-4  border-r border-[#000] border-opacity-20 bg-black h-full relative z-30 md:max-w-16 max-w-10">
                <Link href={'/'} className="logo w-full h-16">
                    <Image src={IconLogo} alt='Logo' height={100} width={100} className='max-h-full object-contain' />
                </Link>
                <ul className='flex flex-col items-center '>
                    {
                        listMenu.map((item, index) => {
                            return <motion.li
                                initial={{
                                    translateX: -50
                                }}
                                animate={{
                                    translateX: 0
                                }}
                                transition={{
                                    duration: .3,
                                    delay: index / 10 + .2,
                                    ease: 'easeInOut'
                                }}
                                key={item.link} className=''>
                                <Link href={item.link} className={`itemNav lg:px-4 px-2 py-4 md:text-lg text-base border-r-transparent border-r-4 hover:text-opacity-100 hover:text-indigo-500 hover:bg-opacity-10 hover:border-r-4 hover:border-r-indigo-800 transition-all duration-300`}>
                                    {item.text}
                                </Link>
                            </motion.li>
                        })
                    }
                </ul>
            </div>
            <div className="progress-bar-wrap flex items-center absolute -bottom-3 left-0 right-0 h-5 z-20 lg:hidden">
                <motion.div style={{ scaleX }} className="progress-bar"></motion.div>
            </div>
        </motion.div>
    )
}
