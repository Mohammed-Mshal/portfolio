'use client'
import React from 'react'
import TitleSection from '../TitleSection/TitleSection'
import { motion } from 'motion/react'
import { Experience, Technologies } from '@prisma/client'

export default function ExperienceSection({
    listExperience
}: {
    listExperience: ({ technologies: Technologies[] } & Experience)[] | []
}
) {
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
        <div className={`max-w-7xl w-full mx-auto lg:px-20 md:py-14 py-8 md:px-10 px-6 md:my-10 my-8 relative overflow-hidden`} id='experience'>
            <div className="container xl:my-12 mt-8 flex flex-col items-start gap-8  mx-auto">
                <TitleSection direction='left' textContent='Experience' />
                <div className='w-full gap-2'>
                    {
                        listExperience.length === 0 ?
                            <div className='overflow-hidden sm:pb-2 pb-3 relative mx-auto w-fit' >
                                <motion.h3 variants={variants}
                                    initial={'initial'}
                                    whileInView={'animate'}
                                    transition={transition}
                                    className='md:text-2xl sm:text-xl text-lg font-black'>
                                    There Is No Content To Show It
                                </motion.h3>
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
                            :
                            listExperience.map((experience) => {
                                return <div key={experience.id} className='flex flex-col md:gap-4 gap-1'>
                                    <div className='flex justify-between gap-2 items-baseline flex-wrap-reverse'>
                                        <div className='overflow-hidden sm:pb-2 pb-3 relative' >
                                            <motion.h3 variants={variants}
                                                initial={'initial'}
                                                whileInView={'animate'}
                                                transition={transition}
                                                className='md:text-2xl sm:text-xl text-lg font-black'>
                                                {experience.companyName}
                                            </motion.h3>
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
                                        <div className='overflow-hidden sm:pb-3 pb-1 relative' >
                                            <motion.h4
                                                variants={variants}
                                                initial={'initial'}
                                                whileInView={'animate'}
                                                transition={transition}
                                                className='md:text-xl text-base'>
                                                {experience.dateFrom.getMonth() + 1}/{experience.dateFrom.getFullYear()} until {experience.untilNow ? "Now" : `${experience.dateTo.getMonth() + 1}/${experience.dateTo.getFullYear()}`}
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
                                            >
                                            </motion.div>
                                        </div>

                                    </div>
                                    <div className='flex justify-between gap-2 items-baseline flex-wrap-reverse'>

                                        <div className='overflow-hidden sm:pb-2 pb-3 relative' >
                                            <motion.h3
                                                variants={variants}
                                                initial={'initial'}
                                                whileInView={'animate'}
                                                transition={transition}
                                                className='md:text-2xl sm:text-xl text-lg font-black text-indigo-700'>
                                                {experience.position}
                                            </motion.h3>
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
                                        <div className='overflow-hidden sm:pb-3 pb-1 relative' >
                                            <motion.h4
                                                variants={variants}
                                                initial={'initial'}
                                                whileInView={'animate'}
                                                transition={transition}
                                                className='md:text-xl text-base'>
                                                {experience.position}
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
                                            >
                                            </motion.div>
                                        </div>

                                    </div>
                                    <div className='overflow-hidden sm:pb-3 pb-1 relative' >
                                        <motion.div
                                            variants={variants}
                                            initial={'initial'}
                                            whileInView={'animate'}
                                            transition={transition}
                                            className='text-white text-opacity-80 md:text-lg text-base text-justify'>
                                            {experience.description}
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
                                    <div className='overflow-hidden sm:pb-3 pb-1 relative w-fit'  >
                                        <motion.div
                                            variants={variants}
                                            initial={'initial'}
                                            whileInView={'animate'}
                                            transition={transition}
                                            className='flex items-center flex-wrap gap-2'>
                                            {
                                                experience.technologies.length > 0 &&
                                                experience.technologies.map((tool) => {
                                                    return <span key={tool.id} className='rounded-full bg-[#313131] py-1 px-4'>
                                                        {tool.title}
                                                    </span>
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

                                </div>
                            })
                    }
                </div>
            </div>
        </div>
    )
}
