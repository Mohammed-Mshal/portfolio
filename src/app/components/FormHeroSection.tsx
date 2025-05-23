'use client'
import Form from 'next/form'
import Image from 'next/image'
import React, { useActionState } from 'react'
import heroAction from '@/actions/heroAction'
const initialState: {
    statusText: string,
    status: null | number,
    message: string
} = {
    statusText: '',
    status: null,
    message: ''
}
export default function FormHeroSection({ title, subtitle, buttonText, buttonLink, image, description }: { title: string | undefined, subtitle: string | undefined, buttonText: string | undefined, buttonLink: string | undefined, image: string | undefined | null, description: string | undefined }) {
    const [state, action, isPending] = useActionState(heroAction, initialState)
    return (
        <Form action={action} className='bg-white/5 p-8 rounded-xl flex justify-between flex-wrap lg:gap-8 gap-4'>
            <div className="form-group flex flex-col gap-2 xl:max-w-[calc(100%/2-16px)] max-h-full w-full">
                <label htmlFor="title" className='lg:text-xl md:text-lg text-md'>
                    Title
                </label>
                <input type='text' defaultValue={title || ''} className='border-2 border-white/60 rounded-lg lg:text-lg text-base py-2 px-4 outline-none ' id='title' name='title' />
            </div>
            <div className="form-group flex flex-col gap-2 xl:max-w-[calc(100%/2-16px)] max-h-full w-full">
                <label htmlFor="buttonText" className='lg:text-xl md:text-lg text-md'>
                    Text Of Button
                </label>
                <input type='text' defaultValue={buttonText || ''} className='border-2 border-white/60 rounded-lg lg:text-lg text-base py-2 px-4 outline-none' id='buttonText' name='buttonText' />
            </div>
            <div className="form-group flex flex-col gap-2 w-full">
                <label htmlFor="subtitle" className='lg:text-xl md:text-lg text-md'>
                    Subtitle
                </label>
                <input type='text' defaultValue={subtitle || ''} className='border-2 border-white/60 rounded-lg lg:text-lg text-base py-2 px-4 outline-none ' id='subtitle' name='subtitle' />
            </div>
            <div className="form-group flex flex-col gap-2 xl:max-w-[calc(100%/2-16px)] max-h-full w-full">
                <label htmlFor="buttonLink" className='lg:text-xl md:text-lg text-md'>
                    Number Whatsapp For Button Contact Us
                </label>
                <input type='text' defaultValue={buttonLink || ''} className='border-2 border-white/60 rounded-lg lg:text-lg text-base py-2 px-4 outline-none' id='buttonLink' name='buttonLink' />
            </div>
            <div className="form-group flex flex-col gap-2 xl:max-w-[calc(100%/2-16px)] max-h-full w-full">
                <label htmlFor="bgImage" className='lg:text-xl md:text-lg text-md'>
                    Background Image
                </label>
                <input type='file' className='border-2 border-white/60 rounded-lg lg:text-lg text-base py-2 px-4 outline-none cursor-pointer' id='bgImage' name='bgImage' />
            </div>
            <div className="form-group flex flex-col gap-2 xl:max-w-[calc(100%/2-16px)] max-h-full w-full">
                <div className='lg:text-xl md:text-lg text-md'>
                    Image Viewer
                </div>
                <div className="image-viewer w-full h-auto max-h-[400px] flex-auto">
                    {image && image.length > 0 ?
                        <Image src={image} alt="HeroImage" className='w-full h-full object-cover rounded-2xl' width={500} height={600} />
                        :
                        <h4 className='h-full flex items-center'>
                            There Is No Image
                        </h4>
                    }
                </div>
            </div>
            <div className="form-group flex flex-col gap-2 xl:max-w-[calc(100%/2-16px)] max-h-full w-full">
                <label htmlFor="description" className='lg:text-xl md:text-lg text-md'>
                    Description
                </label>
                <textarea defaultValue={description} className='border-2 border-white/60 rounded-lg lg:text-lg text-base py-2 px-4 outline-none resize-none h-full min-h-40' id='description' name='description'></textarea>
            </div>
            {
                state.statusText !== 'SUCCESSFUL' &&
                <div className='text-center font-bold text-red-600 text-2xl'>
                    {
                        state.message
                    }
                </div>
            }
            <div className="form-group flex flex-col gap-2 w-full">
                <button
                    disabled={isPending}
                    className='bg-indigo-700 py-2 px-4 text-lg font-bold rounded-lg cursor-pointer hover:bg-indigo-800 hover:shadow-lg transition-all duration-500 max-w-sm w-full'>
                    Save
                </button>
            </div>
        </Form>
    )
}
