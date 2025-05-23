'use client'
import React from 'react'
import { motion } from 'motion/react'
export default function TitleSection({ textContent, direction }: { textContent: string, direction: 'left' | 'right' }) {
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
    <div className={`relative w-full before:h-px before:w-full before:top-1/2 before:bg-white before:bg-opacity-35 before:absolute before:-z-10 z-0 flex ${direction === 'right' ? 'justify-end' : 'justify-start'}`}>

      <div className={`overflow-hidden sm:pb-4 pb-1 relative w-fit z-10 bg-[#111] ${direction === 'right' ?'ps-6':'pe-6'}`}>
        <motion.h1
          variants={variants}
          initial={'initial'}
          whileInView={'animate'}
          transition={transition}
          className='title text-3xl sm:text-4xl md:text-6xl font-black'>
          {textContent}<span className='text-indigo-700'>.</span>
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
    </div >
  )
}
