import CreateCategorySkills from '@/actions/CreateCategorySkills'
import CreateSkill from '@/actions/CreateSkill'
import PopupSkills from '@/app/components/PopupSkills/PopupSkills'
import DeleteCategorySkill from '@/data/Skills/DeleteCategorySkills'
import DeleteSkill from '@/data/Skills/DeleteSkills'
import EditCategorySkills from '@/data/Skills/EditCategorySkill'
import EditSkill from '@/data/Skills/EditSkill'
import GetCategorySkills from '@/data/Skills/GetCategorySkills'
import GetSkills from '@/data/Skills/GetSkills'


import { verifySession } from '@/libs/session'
import { redirect } from 'next/navigation'
import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'

export default async function page() {
    const session = await verifySession()
    if (!session) {
        redirect('/dashboard/auth/login')
    }
    const resGetCategory = await GetCategorySkills()
    const resGetSkills = await GetSkills()
    return (
        <div className='social_media'>
            <div className="container mx-auto">
                <div className="row flex lg:gap-8 gap-4 flex-col">
                    <div className="col-12">
                        <h1 className="text-white font-bold text-4xl">Skills</h1>
                    </div>
                    <div className="col-12 py-8 bg-white/5 p-8 rounded-xl lg:gap-8 gap-4 flex flex-col ">
                        <div className="header-container flex justify-between items-stretch">
                            <h3 className="title lg:text-2xl md:text-xl text-lg font-bold">
                                List Category Skills
                            </h3>
                            <PopupSkills popupFor='Category' typePopup='AddPopup' headerText={'Create New Category'} buttonIcon={<FiPlusCircle className='text-4xl hover:text-indigo-600 transition-all duration-300' />} styleButton='bg-indigo-600 py-1 px-8 hover:bg-indigo-700 border-2 border-indigo-600' action={CreateCategorySkills} buttonText='Create Category' />
                        </div>
                        <div className="body-descriptions flex flex-col gap-4">
                            <table className='border-collapse border border-white/10'>
                                <thead className='bg-indigo-600/70 text-white/80'>
                                    <tr>
                                        <th className='text-start px-4 py-2 border border-white/10'>
                                            ID
                                        </th>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Title
                                        </th>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            List Items
                                        </th>
                                        <th className='text-center px-4 py-2  border border-white/10'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        resGetCategory.data?.CategorySkills.length === 0 ?
                                            <tr>
                                                <td colSpan={5}>
                                                    <p className='text-center text-white/80 py-4'>
                                                        No Categories found
                                                    </p>
                                                </td>
                                            </tr>
                                            :
                                            resGetCategory.data?.CategorySkills.map((item) => {
                                                return <tr key={item.id} className='md:text-lg text-base'>
                                                    <td className='px-4 py-2 border border-white/10'>
                                                        {item.id}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.title}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.listSkill && item.listSkill.length === 0 ? <p className='text-white/50'>Category Not Contains Any Skills</p> : item.listSkill.map(e => e.title).join(', ')}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center justify-center'>
                                                        <div className="actions flex gap-4">
                                                            <input type="hidden" value={item.id} />
                                                            <PopupSkills action={DeleteCategorySkill} itemId={item.id} buttonText='Delete' headerText='Are you Sure From Deleting Icon?' styleButton='bg-red-500 text-white hover:bg-red-700' typePopup='DeleteButton' popupFor='Category' />
                                                            <PopupSkills action={EditCategorySkills} itemId={item.id} categoryName={item.title} buttonText='Edit' headerText='Are you Sure From Edit Category?' styleButton='bg-green-600 text-white hover:bg-green-700' typePopup={'EditPopup'} popupFor='Category' />                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 py-8 bg-white/5 p-8 rounded-xl lg:gap-8 gap-4 flex flex-col ">
                        <div className="header-container flex justify-between items-stretch">
                            <h3 className="title lg:text-2xl md:text-xl text-lg font-bold">
                                List Skills
                            </h3>
                            <PopupSkills listCategory={resGetCategory.data?.CategorySkills} popupFor='Skill' typePopup='AddPopup' headerText={'Create New Skill'} buttonIcon={<FiPlusCircle className='text-4xl hover:text-indigo-600 transition-all duration-300' />} styleButton='bg-indigo-600 py-1 px-8 hover:bg-indigo-700 border-2 border-indigo-600' action={CreateSkill} buttonText='Create Skill' />
                        </div>
                        <div className="body-descriptions flex flex-col gap-4">
                            <table className='border-collapse border border-white/10'>
                                <thead className='bg-indigo-600/70 text-white/80'>
                                    <tr>
                                        <th className='text-start px-4 py-2 border border-white/10'>
                                            ID
                                        </th>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Title
                                        </th>
                                        <th className='text-center px-4 py-2 border border-white/10'>
                                            Category
                                        </th>
                                        <th className='text-center px-4 py-2  border border-white/10'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        resGetSkills.data?.skills.length === 0 ?
                                            <tr>
                                                <td colSpan={5}>
                                                    <p className='text-center text-white/80 py-4'>
                                                        No Skills found
                                                    </p>
                                                </td>
                                            </tr>
                                            :
                                            resGetSkills.data?.skills.map((item) => {
                                                return <tr key={item.id} className='md:text-lg text-base'>
                                                    <td className='px-4 py-2 border border-white/10'>
                                                        {item.id}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.title}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center'>
                                                        {item.CategorySkill?.title}
                                                    </td>
                                                    <td className='px-4 py-2 border border-white/10 text-center justify-center'>
                                                        <div className="actions flex gap-4">
                                                            <input type="hidden" value={item.id} />
                                                            <PopupSkills action={DeleteSkill} itemId={item.id} buttonText='Delete' headerText='Are you Sure From Deleting Skill?' styleButton='bg-red-500 text-white hover:bg-red-700' typePopup='DeleteButton' popupFor='Skill' />
                                                            <PopupSkills listCategory={resGetCategory.data?.CategorySkills} itemId={item.id} action={EditSkill} skillName={item.title} buttonText='Edit' headerText='Are you Sure From Edit Skill?' styleButton='bg-green-600 text-white hover:bg-green-700' typePopup={'EditPopup'} popupFor='Skill' />
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
