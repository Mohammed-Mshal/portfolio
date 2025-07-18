'use client'
import React, { useEffect, useState } from 'react'
import TitleSection from '../TitleSection/TitleSection'
import Project from '../Project/Project'
import Image from 'next/image'
import './projects.css'
import { ProjectLink, Projects as ProjectsType, Tool } from '@prisma/client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { CgClose } from 'react-icons/cg'

export default function Projects({ projects }: {
    projects: ({
        links: {
            id: string;
            title: string;
            link: string;
            createAt: Date;
            updatedAt: Date;
            icon: string;
            iconId: string;
            projectsId: string;
        }[];
        tools: {
            id: string;
            title: string;
            adminId: string | null;
            updatedAt: Date;
            createdAt: Date;
            projectsId: string | null;
        }[];
    } & ProjectsType)[]
}) {
    const [popupDetails, setPopupDetails] = useState(false)
    const [showingData, setShowingData] = useState<string | undefined>()
    const [data, setData] = useState<{
        id: string,
        image: string,
        listTech: Tool[],
        descriptions: string,
        title: string,
        projectLinks: ProjectLink[]
    }>({
        id: '',
        image: '',
        listTech: [],
        descriptions: '',
        title: '',
        projectLinks: []
    })
    useEffect(() => {
        if (popupDetails === false) {
            setShowingData(undefined)
        }
    }, [popupDetails])
    useEffect(() => {
        if (showingData) {
            const dataPopup = projects.filter((e) => e.id === showingData)[0]

            setData({
                id: dataPopup.id,
                image: dataPopup.image,
                descriptions: dataPopup.description,
                listTech: dataPopup.tools,
                title: dataPopup.title,
                projectLinks: dataPopup.links
            })
        } else {
            setData({
                id: '',
                image: '',
                listTech: [],
                descriptions: '',
                title: '',
                projectLinks: []
            })
        }
    }, [showingData])
    return (
        <div className={`max-w-7xl w-full mx-auto lg:px-20 md:py-14 py-8 md:px-10 px-6 md:my-10 my-8 relative z-10 overflow-hidden`} id='portfolio'>
            <div className="container xl:my-12 mt-8 flex flex-col items-start gap-8  mx-auto">
                <TitleSection direction='right' textContent='Projects' />
                <Swiper
                    modules={[Autoplay]}
                    className={"w-full"}
                    spaceBetween={50}
                    autoplay={{
                        delay: 2000
                    }}
                    grabCursor={true}
                    loop={true}
                    breakpoints={{
                        1024: {
                            slidesPerView: 2,
                        },
                        300: {
                            slidesPerView: 1,
                        }
                    }}
                >
                    {
                        projects.map((project) => {
                            return <SwiperSlide key={project.id} ><Project id={project.id} listLinks={project.links} setShowingData={setShowingData} setPopupDetails={setPopupDetails} descriptions={project.description} image={project.image} listTech={project.tools} />  </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
            <div className={`popup fixed top-0 right-0 left-00 pt-20 w-full bg-black/10 overflow-y-scroll backdrop-blur-xl h-screen flex  justify-center items-start z-20 transition-all duration-500 ${popupDetails ? 'opacity-100 pointer-events-auto show' : 'opacity-0 pointer-events-none'}`} onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setPopupDetails(false);
                }
            }}>
                <div
                    className={`container-details mb-10 flex flex-col gap-4 bg-[#1f1f1f] z-30 h-fit lg:w-[calc(100dvw-160px)] w-[calc(100dvw-50px)] mx-auto my-6  md:max-w-screen-sm transition-all duration-500 ${popupDetails ? 'translate-y-0 scale-100' : 'translate-y-10 scale-50'} rounded-xl overflow-hidden bg-[#313131] relative`} >
                    <button className='absolute top-0 right-0 p-2 z-20 cursor-pointer hover:bg-white/10 rounded-full transition-all duration-300' onClick={() => setPopupDetails(false)}>
                        <CgClose className='text-white text-2xl hover:text-red-500 transition-all duration-300' />
                    </button>
                    <div className="containerImage h-auto w-full  max-h-[500px] overflow-hidden">
                        {data.image.length > 0 &&
                            <Image src={data.image} alt={data.title} className='h-full w-full object-cover' width={500} height={500} />
                        }
                    </div>
                    <div className="bodyPopup p-4 flex flex-col gap-2">
                        <h2 className='lg:text-4xl md:text-3xl sm:text-2xl text-xl'>
                            {data.title}
                        </h2>
                        <div className="technologies text-indigo-600 font-semibold md:text-lg text-base">
                            {data.listTech.map((e, i) => {
                                return <span key={e.id}>{e.title}{i !== data.listTech.length - 1 && ' - '}</span>
                            })}
                        </div>
                        <div className='description flex flex-col gap-4 py-4 text-justify'>
                            {data.descriptions}
                        </div>
                        <h4 className='md:text-2xl sm:text-xl text-lg font-bold'>
                            Project Links<span className='text-4xl text-indigo-700'>.</span>
                        </h4>
                        <div className="project-links">
                            <div className='flex gap-4 items-center flex-wrap text-indigo-700 font-bold md:text-lg text-base '>
                                {
                                    data.projectLinks && data.projectLinks.map((link) => {
                                        return <a href={link.link} className='flex items-center gap-2' key={link.id}>
                                            {
                                                <Image src={link.icon} alt={link.title} height={30} width={30} />
                                            }
                                            <span>{link.title}</span>
                                        </a>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
