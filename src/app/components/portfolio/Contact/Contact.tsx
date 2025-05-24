'use client'
import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
export default function Contact() {
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
        <div className='max-w-7xl w-full mx-auto lg:px-20 md:py-14 py-8 md:px-10 px-6 md:my-10 my-8 relative z-10 overflow-hidden' id='contact'>
            <div className="container xl:my-12 mt-8 flex flex-col items-center text-center lg:gap-8 gap-4  mx-auto">
                <div className={`overflow-hidden sm:pb-4 pb-1 relative w-fit z-10 bg-[#111]`}>
                    <motion.h1
                        variants={variants}
                        initial={'initial'}
                        whileInView={'animate'}
                        transition={transition}
                        className='title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black'>
                        Contact<span className='text-indigo-700'>.</span>
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
                <div className={`overflow-hidden sm:pb-4 pb-1 relative w-fit z-10 bg-[#111]`}>
                    <motion.p
                        variants={variants}
                        initial={'initial'}
                        whileInView={'animate'}
                        transition={transition}
                        className='title text-lg'>
                        Shoot me an email if you want to connect! You can also find me on
                        <Link href="https://www.linkedin.com/in/mohammed-mshal-7405b3234" className='text-indigo-600 hover:underline'> Linkedin </Link>
                        if that`s more your speed.
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
                <div className={`overflow-hidden sm:pb-4 pb-3 relative w-fit z-10 bg-[#111]`}>
                    <motion.div
                        variants={variants}
                        initial={'initial'}
                        whileInView={'animate'}
                        transition={transition}
                        className='title text-lg'>
                        <Link href={'mailto:mohammedmshal02@gmail.com'} className='hover:text-indigo-600 lg:text-4xl md:text-3xl sm:text-2xl text-lg font-bold transition-all duration-500'>
                            mohammedmshal02@gmail.com
                        </Link>

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
        </div>
    )
}
