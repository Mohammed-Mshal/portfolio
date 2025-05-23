import React from 'react'
import SocialMedia from '../SocialMedia/SocialMedia'
import ButtonResume from '../ButtonLink/ButtonLink'
import GetSocialMedia from '@/data/SocialMedia/GetSocialMedia'
import type { SocialMedia as socialType } from '@prisma/client'

export default async function MainNav() {
    const socialMedia = await GetSocialMedia()
    const listSocial: socialType[] | undefined = socialMedia.data?.socialMedia

    return (
        <div className='main-nav sticky flex justify-between top-0 w-full start-0 py-4 xl:px-20 md:px-10 px-6 backdrop-blur-md z-20'>
            <SocialMedia listSocial={listSocial} />
            <ButtonResume textContent='My Resume' link='#' downloadLink='#' />
        </div>
    )
}
