import DescriptionsAbout from '@/app/components/DescriptionsAbout'
import PopupDescription from '@/app/components/PopupDescription/PopupDescription'
import { verifySession } from '@/libs/session'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function About() {
    const session = await verifySession()
    if (!session) {
        redirect('/dashboard/auth/login')
    }
    return (
        <div className='about'>
            <PopupDescription />
            <div className="container mx-auto">
                <div className="row flex flex-col gap-4">
                    <div className="col-12">
                        <h1 className="text-white font-bold text-4xl">About</h1>
                    </div>
                    <div className="col-12 py-8 bg-white/5 p-8 rounded-xl lg:gap-8 gap-4">
                        <DescriptionsAbout />
                    </div>
                </div>
            </div>
        </div>
    )
}