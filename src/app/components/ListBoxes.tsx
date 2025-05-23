'use client'
import React from 'react'
import { useMainStore } from '../providers/MainStoreProvider'
import BoxLink from './BoxLink'

export default function ListBoxes() {
    const links = useMainStore((state) => state.listItemMenu)
    return (
        <div className="boxes flex justify-between gap-4 py-8 flex-wrap">
            {
                links.map((item) => {
                    return <BoxLink key={item.title} description={item.description} href={item.link} icon={item.icon} title={item.title} />
                })
            }
        </div>
    )
}
