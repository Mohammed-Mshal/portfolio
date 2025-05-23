'use client'
import React from 'react'
import ButtonLink from '../ButtonLink/ButtonLink'
import { motion } from 'motion/react'
import { HeroSection } from '@prisma/client'
export default function HeroContainer({ HeroSection }: { HeroSection: HeroSection | null | undefined }) {
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
        <div className="container xl:my-12 mt-8 flex flex-col items-start gap-2  mx-auto">
            <div className='overflow-hidden sm:pb-4 pb-1 relative'>
                <motion.h1
                    variants={variants}
                    initial={'initial'}
                    whileInView={'animate'}
                    transition={transition}
                    className='title text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black'>
                    {HeroSection?.title}<span className='text-indigo-700'>.</span>
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
                ></motion.div>
            </div>
            <div className='overflow-hidden  pb-4 relative'>
                <motion.h4
                    variants={variants}
                    initial={'initial'}
                    whileInView={'animate'}
                    transition={transition}
                    className='subtitle lg:text-5xl md:text-3xl text-xl'>
                    {HeroSection?.subtitle.split(' ').slice(0, -2).join(' ')} <span className='font-bold text-indigo-700'>{HeroSection?.subtitle.split(' ').slice(-2).join(' ')}</span>
                </motion.h4>
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

            <div className='overflow-hidden  pb-4 relative'>
                <motion.p
                    variants={variants}
                    initial={'initial'}
                    whileInView={'animate'}
                    transition={transition}
                    className="text max-w-[650px] text-pretty lg:text-lg text-base text-normalText font-extralight">
                    {
                        HeroSection?.description
                    }
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
                ></motion.div>
            </div>
            <ButtonLink textContent={HeroSection?.buttonText||''} link={HeroSection?.buttonLink||'#'} />
        </div>
    )
}
