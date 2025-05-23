import CreateExperience from '@/actions/CreateExperience'
import CreateTechnology from '@/actions/CreateTechnology'
import PopupExperience from '@/app/components/PopupExperience/PopupExperience'
import PopupTechnology from '@/app/components/PopupTechnology/PopupTechnology'
import DeleteExperience from '@/data/Experience/DeleteExperience'
import DeleteTechnology from '@/data/Experience/DeleteTechnology'
import EditExperience from '@/data/Experience/EditExperience'
import EditTechnology from '@/data/Experience/EditTechnoloy'
import GetExperience from '@/data/Experience/getExperience'
import GetTechnologies from '@/data/Experience/GetTechnologies'
import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'

export default async function ExperiencePage() {
    const experiences = await GetExperience()
    const technologies = await GetTechnologies()
    return (
        <div className='experience'>
            <div className="container mx-auto">
                <div className="row flex lg:gap-8 gap-4 flex-col">
                    <div className="col-12">
                        <h1 className="text-white font-bold text-4xl">Experience</h1>
                    </div>
                    <div className="col-12 py-8 bg-white/5 p-8 rounded-xl lg:gap-8 gap-4 flex flex-col ">
                        <div className="header-container flex justify-between items-center">
                            <h3 className="title lg:text-2xl md:text-xl text-lg font-bold">
                                List Experience
                            </h3>
                            <PopupExperience typePopup='AddPopup' headerText={'Create New Experience'} buttonIcon={<FiPlusCircle className='text-4xl hover:text-indigo-600 transition-all duration-300' />} styleButton='bg-indigo-600 py-1 px-0 hover:bg-indigo-700 border-2 border-indigo-600' action={CreateExperience} buttonText='Create Experience' />
                        </div>
                        <div className="body-descriptions flex flex-col gap-4">
                            <table className='border-collapse border border-white/10'>
                                <thead className='bg-indigo-600/70 text-white/80'>
                                    <tr>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Company Name
                                        </th>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Date
                                        </th>
                                        <th className='text-center px-4 py-2  border border-white/10'>
                                            Position
                                        </th>
                                        <th className='text-center px-4 py-2  border border-white/10'>
                                            Workplace
                                        </th>
                                        <th className='text-center px-4 py-2  border border-white/10'>
                                            Description
                                        </th>
                                        <th className='text-center px-4 py-2  border border-white/10'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        experiences.data?.experiences.length === 0 ?
                                            <tr>
                                                <td colSpan={5}>
                                                    <p className='text-center text-white/80 py-4'>
                                                        No Experiences found
                                                    </p>
                                                </td>
                                            </tr>
                                            :
                                            experiences.data?.experiences.map((item) => {
                                                return <tr key={item.id} className='md:text-lg text-base'>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.companyName}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.dateFrom.getMonth() + 1}/{item.dateFrom.getFullYear()} until {item.dateTo.getMonth() + 1}/{item.dateTo.getFullYear()}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.position}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.workplace}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.description}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center justify-center'>
                                                        <div className="actions flex gap-4">
                                                            <input type="hidden" value={item.id} />
                                                            <PopupExperience action={EditExperience}
                                                                itemId={item.id}
                                                                description={item.description}
                                                                companyName={item.companyName}
                                                                dateFrom={item.dateFrom}
                                                                buttonText='Edit' headerText='Are you Sure From Edit Experience?'
                                                                styleButton='bg-green-600 text-white hover:bg-green-700'
                                                                typePopup={'EditPopup'}
                                                                positionName={item.position}
                                                                workplace={item.workplace} />

                                                            <PopupExperience action={DeleteExperience} itemId={item.id} buttonText='Delete' headerText='Are you Sure From Deleting Experience?' styleButton='bg-red-500 text-white hover:bg-red-700' typePopup='DeleteButton' />

                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 py-8 bg-white/5 p-8 rounded-xl lg:gap-8 gap-4 flex flex-col ">
                        <div className="header-container flex justify-between items-center">
                            <h3 className="title lg:text-2xl md:text-xl text-lg font-bold">
                                List Technologies In Experience
                            </h3>
                            <PopupTechnology
                                typePopup='AddPopup'
                                headerText={'Create New Technology'}
                                listCompany={experiences.data?.experiences.map((experience) => ({ idExperience: experience.id, companyName: experience.companyName }))}
                                buttonIcon={<FiPlusCircle className='text-4xl hover:text-indigo-600 transition-all duration-300' />}
                                styleButton='bg-indigo-600 py-1 px-0 hover:bg-indigo-700 border-2 border-indigo-600'
                                action={CreateTechnology}
                                buttonText='Create Technology' />
                        </div>
                        <div className="body-descriptions flex flex-col gap-4">
                            <table className='border-collapse border border-white/10'>
                                <thead className='bg-indigo-600/70 text-white/80'>
                                    <tr>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Company Name
                                        </th>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Technology Title
                                        </th>
                                        <th className='text-center px-4 py-2  border border-white/10'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        technologies.data?.technologies.length === 0 ?
                                            <tr>
                                                <td colSpan={5}>
                                                    <p className='text-center text-white/80 py-4'>
                                                        No Technologies found
                                                    </p>
                                                </td>
                                            </tr>
                                            :
                                            technologies.data?.technologies.map((item) => {
                                                return <tr key={item.id} className='md:text-lg text-base'>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.Experience?.companyName}
                                                    </td>

                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.title}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center justify-center'>
                                                        <div className="actions flex gap-4">
                                                            <input type="hidden" value={item.id} />
                                                            <PopupTechnology
                                                                action={EditTechnology}
                                                                itemId={item.id}
                                                                experienceId={item.experienceId as string}
                                                                title={item.title}
                                                                listCompany={experiences.data?.experiences.map((experience) => ({ idExperience: experience.id, companyName: experience.companyName }))}
                                                                buttonText='Edit' headerText='Are you Sure From Edit Experience?'
                                                                styleButton='bg-green-600 text-white hover:bg-green-700'
                                                                typePopup={'EditPopup'} />
                                                            
                                                            <PopupTechnology action={DeleteTechnology} itemId={item.id} buttonText='Delete' headerText='Are you Sure From Deleting Technology?' styleButton='bg-red-500 text-white hover:bg-red-700' typePopup='DeleteButton' />

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
