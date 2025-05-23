'use client'
import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'

export default function ButtonSidebar() {
    const [stateSidebar, SetStateSidebar] = useState(false)
    return (
        <div
            onClick={() => {
                SetStateSidebar(!stateSidebar)
            }}
            className={`block 2xl:hidden cursor-pointer arrow-sidebar text-2xl absolute top-20 right-0 translate-x-full bg-[#3f3f3f] p-2 rounded-tr-2xl rounded-br-2xl z-10 ${stateSidebar && 'showSidebar'}`}>
            <FiArrowRight className={`${stateSidebar && 'rotate-180'} transition-all duration-300`} />
        </div>
    )
}
