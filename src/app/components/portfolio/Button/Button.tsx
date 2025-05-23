import React from 'react'

export default function Button({ textContent }: { textContent: string }) {
    return (
        <button className='lg:py-2 py-1 px-4 rounded-md transition-all duration-500 text-indigo-600 border border-indigo-600 hover:text-white bg-[#111] hover:bg-indigo-600 font-semibold lg:text-lg text-base cursor-pointer'>
            {textContent}
        </button>
    )
}
