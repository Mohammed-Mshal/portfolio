import Link from 'next/link'
import React from 'react'

export default function ButtonLink({ textContent, link, downloadLink }: { textContent: string, link: string, downloadLink?: string }) {
    return (
        <Link href={link} className='lg:py-2 py-1 px-4 rounded-md transition-all duration-500 text-indigo-600 border border-indigo-600 hover:text-white bg-[#111] hover:bg-indigo-600 font-semibold lg:text-lg text-base cursor-pointer' download={downloadLink}>
            {textContent}
        </Link>
    )
}
