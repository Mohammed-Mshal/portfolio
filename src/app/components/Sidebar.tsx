import Image from 'next/image'
import React from 'react'
import LinksSidebar from './LinksSidebar'
import { FiLogOut } from 'react-icons/fi'
import Form from 'next/form'
import { deleteCookies } from '@/libs/session'
import ButtonSidebar from './ButtonSidebar'

export default function Sidebar() {
    return (
        <div className='sidebar 2xl:sticky fixed -start-[250px] 2xl:start-0 h-dvh top-0  bg-[#3f3f3f2f] shadow-xl transition-all duration-500 z-40 backdrop-blur-3xl'>
            <div className="container py-4 px-8 h-full flex flex-col">
                <div className="logo flex justify-center">
                    <Image src={'/Logo.svg'} alt='Logo' width={80} height={50} />
                </div>
                <ButtonSidebar />
                <LinksSidebar />
                <Form
                    className='mt-auto'
                    action={async () => {
                        'use server'
                        await deleteCookies()
                    }}>
                    <button className='flex items-center justify-center gap-2 w-full  cursor-pointer hover:text-red-500 font-bold transition-all'>
                        Logout
                        <FiLogOut />
                    </button>
                </Form>
            </div>
        </div>
    )
}
