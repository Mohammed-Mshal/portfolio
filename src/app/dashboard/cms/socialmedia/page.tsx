
import CreateProject from '@/actions/CreateProject'
import Popup from '@/app/components/PopupSocial/PopupSocial'
import DeleteSocialMedia from '@/data/SocialMedia/DeleteSocialMedia'
import EditSocialMedia from '@/data/SocialMedia/EditSocialMedia'
import GetSocialMedia from '@/data/SocialMedia/GetSocialMedia'
import { verifySession } from '@/libs/session'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'

export default async function SocialMedia() {
    const session = await verifySession()
    if (!session) {
        redirect('/dashboard/auth/login')
    }
    const resSocialMedia = await GetSocialMedia()
    return (
        <div className='social_media'>
            <div className="container mx-auto">
                <div className="row flex lg:gap-8 gap-4 flex-col">
                    <div className="col-12">
                        <h1 className="text-white font-bold text-4xl">Social Media</h1>
                    </div>
                    <div className="col-12 py-8 bg-white/5 p-8 rounded-xl lg:gap-8 gap-4 flex flex-col ">
                        <div className="header-container flex justify-between items-stretch">
                            <h3 className="title lg:text-2xl md:text-xl text-lg font-bold">
                                List Social Links
                            </h3>
                            <Popup typePopup='AddPopup' headerText={'Create New Social Link'} buttonIcon={<FiPlusCircle className='text-4xl hover:text-indigo-600 transition-all duration-300' />} styleButton='bg-indigo-600 py-1 px-8 hover:bg-indigo-700 border-2 border-indigo-600' action={CreateProject} buttonText='Add Link' />
                        </div>
                        <div className="body-descriptions flex flex-col gap-4">
                            <table className='border-collapse border border-white/10'>
                                <thead className='bg-indigo-600/70 text-white/80'>
                                    <tr>
                                        <th className='text-start px-4 py-2 border border-white/10'>
                                            ID
                                        </th>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Link
                                        </th>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Type Link
                                        </th>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Icon Preview
                                        </th>
                                        <th className='text-center px-4 py-2  border border-white/10'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        resSocialMedia.data?.socialMedia.length === 0 ?
                                            <tr>
                                                <td colSpan={5}>
                                                    <p className='text-center text-white/80 py-4'>
                                                        No descriptions found
                                                    </p>
                                                </td>
                                            </tr>
                                            :
                                            resSocialMedia.data?.socialMedia.map((item) => {
                                                return <tr key={item.id} className='md:text-lg text-base'>
                                                    <td className='px-4 py-2 border border-white/10'>
                                                        {item.id}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.link}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.type}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        <div className='flex justify-center'>
                                                            <Image src={item.icon} alt='Icon' width={40} height={40} />
                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center justify-center'>
                                                        <div className="actions flex gap-4">
                                                            <input type="hidden" value={item.id} />
                                                            <Popup action={DeleteSocialMedia} socialId={item.id} buttonText='Delete' headerText='Are you Sure From Deleting Icon?' styleButton='bg-red-500 text-white hover:bg-red-700' typePopup='DeleteButton' />
                                                            <Popup action={EditSocialMedia} socialId={item.id} buttonText='Edit' headerText='Are you Sure From Edit Social?' styleButton='bg-green-600 text-white hover:bg-green-700' typePopup={'EditPopup'} iconLink={item.link} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
