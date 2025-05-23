'use client'
import React, { ReactNode } from 'react'
import { motion } from 'motion/react'
import TitleSkills from '../TitleSkills/TitleSkills'
import type { Skills } from '@prisma/client'
export default function Skills({ title, iconTitle, listSkills }: { title: string, iconTitle: ReactNode, listSkills: Skills[] | [] }) {
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
        <div className='lg:max-w-xs'>
            <TitleSkills title={title} iconTitle={iconTitle} />
            <div className='flex flex-wrap gap-4'>
                {
                    listSkills.map((skill) => {
                        return <div key={skill.id} className='overflow-hidden relative pb-2'>
                            <motion.div variants={variants}
                                initial={'initial'}
                                whileInView={'animate'}
                                transition={transition} className='bg-[#232323] text-white py-1 px-3 rounded-full'>
                                {skill.title}
                            </motion.div>
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
                            ></motion.div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
