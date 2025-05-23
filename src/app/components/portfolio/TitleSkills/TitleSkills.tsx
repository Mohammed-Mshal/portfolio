'use client'
import React, { ReactNode } from 'react'
import { motion } from 'motion/react'
export default function TitleSkills({ title, iconTitle }: { title: string, iconTitle: ReactNode }) {
    const transition = {
        duration: .5,
        ease: 'easeIn',
    }
    const variants = {
        initial: {
            opacity: 0,
            translateY: 40,
        },
        animate: {
            opacity: 1,
            translateY: 0
        }
    }
    return (
        <div className={`overflow-hidden sm:pb-4 pb-1 relative w-fit z-10 bg-[#111]`}>
            <motion.h1
                variants={variants}
                initial={'initial'}
                whileInView={'animate'}
                transition={transition}
                className='title text-lg md:text-xl font-black flex items-center gap-2 mb-4'>
                {iconTitle}
                {title}

            </motion.h1>
            <motion.div className='absolute top-0 right-0 h-full bg-indigo-700 z-10'
                initial={{
                    width: '100%'
                }}
                whileInView={{
                    width: '0'
                }}
                transition={{
                    duration: .5
                }}
            >
            </motion.div>
        </div>
    )
}
