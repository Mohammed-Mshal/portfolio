'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useMainStore } from '../providers/MainStoreProvider'

export default function LinksSidebar() {
    const pathname = usePathname()
    const links = useMainStore((state) => state.listItemMenu)
    return (
        <div className="links flex flex-col py-8 gap-4 text-lg">
            {
                links.map((item) => {
                    return <Link href={item.link} key={item.title} className={`font-bold hover:text-indigo-500 transition-all duration-500 ${pathname === item.link ? 'text-indigo-500' : ''}`}>
                        {item.title}
                    </Link>
                })
            }
        </div>
    )
}
