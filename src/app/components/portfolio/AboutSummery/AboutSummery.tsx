'use client'
import React from 'react'
import { motion } from 'motion/react'
import { CgArrowRight } from 'react-icons/cg'
import SocialMedia from '../SocialMedia/SocialMedia'
import type { Description, SocialMedia as SocialMediaType } from '@prisma/client'

export default function AboutSummery({ listAbout, listSocial }: { listAbout: Description[] | undefined, listSocial: SocialMediaType[] | undefined }) {
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
        <div className='flex-1'>
            {listAbout &&
                listAbout.map((summery, index) => {
                    return <div key={index} className='overflow-hidden sm:pb-4 pb-1 relative w-fit z-10 lg:text-xl text-base lg:mb-6 mb-4 font-extralight text-justify'>
                        <motion.p
                            variants={variants}
                            initial={'initial'}
                            whileInView={'animate'}
                            transition={transition}
                            className={`${index === 0 && 'first-letter:p-[10px] first-letter:py-4 first-letter:block first-letter:bg-[#232323] first-letter:font-bold first-letter:me-1.5 first-letter:rounded-lg first-letter:text-2xl first-letter:float-start'}`}>
                            {summery.description}
                        </motion.p>
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
                })
            }
            <div className='overflow-hidden sm:pb-4 pb-1 relative w-fit z-10 lg:text-lg text-base lg:mb-6 mb-4 font-extralight'>
                <motion.div
                    variants={variants}
                    initial={'initial'}
                    whileInView={'animate'}
                    transition={transition}
                    className='flex items-center gap-4'
                >
                    <h4
                        className={`text-indigo-700 flex items-center gap-1 lg:text-lg text-base font-bold`}>
                        <span>My Links</span>
                        <CgArrowRight className='lg:text-2xl text-xl font-bold' />
                    </h4>

                    <SocialMedia listSocial={listSocial} />
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
        </div>
    )
}
