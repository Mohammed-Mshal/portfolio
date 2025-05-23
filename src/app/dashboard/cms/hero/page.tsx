
import FormHeroSection from '@/app/components/FormHeroSection'
import getHeroData from '@/data/getHeroData'
import { verifySession } from '@/libs/session'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Hero() {
    const session = await verifySession()
    if (!session) {
        redirect('/dashboard/auth/login')
    }
    const resHeroData = await getHeroData()
    const heroData = resHeroData.data?.hero

    return (
        <div className='hero'>
            <div className="container mx-auto">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-white font-bold text-4xl">Hero Section</h1>
                    </div>
                    <div className="col-12 py-8">
                        <FormHeroSection title={heroData?.title} subtitle={heroData?.subtitle} buttonLink={heroData?.buttonLink} buttonText={heroData?.buttonText} image={heroData?.image} description={heroData?.description} />
                    </div>
                </div>
            </div>
        </div>
    )
}
