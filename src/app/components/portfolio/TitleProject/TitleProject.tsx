'use client'
import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ProjectLink } from '@prisma/client'
import Image from 'next/image'
export default function TitleProject({ textContent, listLinks }: { textContent: string, listLinks: ProjectLink[]}) {
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
        <div className={`relative w-full before:h-px before:w-full before:top-1/2 before:bg-white before:bg-opacity-35 before:absolute before:-z-10 flex justify-between`}>

            <div className={`overflow-hidden py-1 relative w-fit z-10 bg-[#111] pe-4`}>
                <motion.h1
                    variants={variants}
                    initial={'initial'}
                    whileInView={'animate'}
                    transition={transition}
                    className='title text-xl sm:text-2xl md:text-3xl font-black'>
                    {textContent}
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
            <div className={`overflow-hidden py-1 relative w-fit z-10 bg-[#111] ps-4`}>
                <motion.div
                    variants={variants}
                    initial={'initial'}
                    whileInView={'animate'}
                    transition={transition}
                    className='title text-xl sm:text-2xl md:text-3xl font-black'>
                    {
                        listLinks && listLinks.map((itemLink) => {
                            return <Link href={itemLink.link} key={itemLink.id} className='flex items-center'>
                                {
                                    <Image src={itemLink.icon} alt={itemLink.title} height={30} width={30}/>
                                }
                            </Link>
                        })
                    }

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
                >
                </motion.div>
            </div>
        </div >
    )
}
