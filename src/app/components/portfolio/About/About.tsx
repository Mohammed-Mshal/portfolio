import React from 'react'
import TitleSection from '../TitleSection/TitleSection'
import AboutSummery from '../AboutSummery/AboutSummery'
import Skills from '../Skills/Skills'
import { BsCodeSlash } from 'react-icons/bs'
import GetDescription from '@/data/Description/getDescription'
import GetSocialMedia from '@/data/SocialMedia/GetSocialMedia'
import { SocialMedia } from '@prisma/client'
import GetCategorySkills from '@/data/Skills/GetCategorySkills'

export default async function About() {
    const resAbout = await GetDescription()
    const socialMedia = await GetSocialMedia()
    const categories = await GetCategorySkills()
    const listSocial: SocialMedia[] | undefined = socialMedia.data?.socialMedia
    return (
        <div className='max-w-7xl w-full mx-auto lg:px-20 md:py-14 py-8 md:px-10 px-6 md:my-10 my-8 relative z-10 overflow-hidden' id='about'>
            <div className="container xl:my-12 mt-8 flex flex-col items-start gap-8  mx-auto">
                <TitleSection direction='left' textContent='About' />
                <div className='flex w-full gap-8 lg:flex-row flex-col'>
                    <AboutSummery listAbout={resAbout.data?.descriptions || []} listSocial={listSocial} />
                    <div className='skills flex flex-col gap-6'>
                        {
                            categories.data?.CategorySkills.map((category) => {
                                return <Skills key={category.id} title={category.title} iconTitle={<BsCodeSlash className='text-indigo-700 text-3xl font-bold' />} listSkills={category.listSkill} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
