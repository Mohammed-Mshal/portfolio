'use client'
import { useScroll, useSpring } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import IconLogo from 'static/iconLogo.svg'
import { motion } from "motion/react"
import { FiMenu } from 'react-icons/fi'
import { CgClose } from 'react-icons/cg'
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
    const [menu, setMenu] = useState(false)
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
            className={`sticky top-0 left-0 md:h-screen h-fit md:w-fit w-full  z-30`}>
            <div className="flex md:flex-col justify-between gap-8 md:py-4 py-2 px-4 md:px-0  border-r border-[#000] border-opacity-20 bg-black h-full relative z-30 md:max-w-16 w-full max-w-full">
                <Link href={'/'} className="logo md:w-full h-14 w-14 flex  z-10">
                    <Image src={IconLogo} alt='Logo' height={100} width={100} className='max-h-full min-h-full min-w-full h-full w-fit object-contain' />
                </Link>
                <ul className={`flex flex-col list-nav flex-1  backdrop-blur-lg ${menu &&' show '}`}>
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
                <button className='text-white text-2xl md:hidden flex items-center z-10' onClick={() => setMenu((prevState) => !prevState)}>
                    <FiMenu className={`${menu && 'hidden'}`} />
                    <CgClose className={`${!menu && 'hidden'}`} />
                </button>
            </div>
            <div className="progress-bar-wrap flex items-center absolute -bottom-3 left-0 right-0 h-5 z-20 md:hidden">
                <motion.div style={{ scaleX }} className="progress-bar"></motion.div>
            </div>
        </motion.div>
    )
}
