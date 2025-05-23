'use client'
import Image from 'next/image'
import React from 'react'
import TitleProject from '../TitleProject/TitleProject'
import { CgArrowRight } from 'react-icons/cg'
import { motion } from 'motion/react'
import { ProjectLink, Tool } from '@prisma/client'
export default function Project({ id, setShowingData, setPopupDetails, descriptions, listTech, listLinks, image }: {
    setShowingData: React.Dispatch<React.SetStateAction<string | undefined>>, setPopupDetails: React.Dispatch<React.SetStateAction<boolean>>, descriptions: string, image: string, listTech: Tool[], id: string, listLinks: ProjectLink[]
}) {
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
        <div className='flex flex-col gap-4 max-h-dvh'>
            <motion.div
                initial={{
                    opacity: 0,
                    scale: .2,
                    y: 60
                }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0
                }}
                transition={{
                    duration: .5
                }}
                className='image-project w-full bg-[#232323] rounded-xl aspect-video cursor-pointer overflow-hidden relative h-auto group' onClick={() => {
                    setPopupDetails(true)
                    setShowingData(id)
                }}>
                <Image src={image} width={300} height={400} alt='Project' className={`w-5/6 absolute top-[20%] left-1/2 -translate-x-1/2 transition-all rounded-lg group-hover:scale-110 group-hover:rotate-12`} />
            </motion.div>
            <div className="body-project flex flex-col gap-2">
                <TitleProject textContent='Golden Bank' listLinks={listLinks} />
                <div className='overflow-hidden sm:pb-3 pb-1 relative w-fit'>
                    <motion.div
                        variants={variants}
                        initial={'initial'}
                        whileInView={'animate'}
                        transition={transition}
                        className="technologies text-indigo-600 font-semibold text-lg">
                        {listTech.map((tool, i) => {
                            return <span key={tool.id}>{tool.title}{i !== listTech.length - 1 && ' - '}</span>
                        })}
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
                <div className='overflow-hidden sm:pb-3 pb-1 relative w-fit'>
                    <motion.div
                        variants={variants}
                        initial={'initial'}
                        whileInView={'animate'}
                        transition={transition}
                        className="summery">
                        {descriptions}
                        <button className='inline-flex items-center gap-3 mx-2 text-indigo-600' onClick={() => {
                            setPopupDetails(true)
                            setShowingData(id)
                        }}>
                            Learn More
                            <CgArrowRight className='text-xl' />
                        </button>
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
        </div >
    )
}
