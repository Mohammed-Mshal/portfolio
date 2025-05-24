import React from 'react'
import DotsGroup from '../DotsGroup/DotsGroup'
import HeroContainer from './HeroContainer'
import getHeroData from '@/data/getHeroData'
import type { HeroSection } from '@prisma/client'
export default async function Hero() {
    const resHeroSection = await getHeroData()
    const heroDetails: HeroSection | null | undefined = resHeroSection.data?.hero

    return (
        <div className='max-w-7xl w-full mx-auto lg:px-20 md:py-14 py-8 md:px-10 px-6 md:my-10 my-8 relative z-10 overflow-hidden'>
            <HeroContainer HeroSection={heroDetails} />
            <DotsGroup />
        </div>
    )
}
