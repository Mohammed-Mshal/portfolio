import React from 'react'
import ButtonPopup from './ButtonPopup'
import GetDescription from '@/data/Description/getDescription'
import PopupDeleteDescription from './Popup/Popup'
import DeleteDescription from '@/data/Description/DeleteDescription'
import EditDescription from '@/data/Description/EditDescription'
export default async function DescriptionsAbout() {
    const resDescriptions = await GetDescription()
    return (
        <div className='descriptions flex flex-col gap-8'>
            <div className="header-description flex items-center justify-between">
                <h3 className="title lg:text-2xl md:text-xl text-lg font-bold">
                    List Descriptions
                </h3>
                <ButtonPopup type='Open' />
            </div>
            <div className="body-descriptions flex flex-col gap-4">
                <table className='border-collapse border border-white/10'>
                    <thead className='bg-indigo-600/70 text-white/80'>
                        <tr>
                            <th className='text-start px-4 py-2 border border-white/10 align-text-top'>
                                ID
                            </th>
                            <th className='text-start px-4 py-2 border border-white/10 align-text-top'>
                                Description
                            </th>
                            <th className='text-center px-4 py-2  border border-white/10'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            resDescriptions.data?.descriptions.length === 0 ?
                                <tr>
                                    <td colSpan={3} className='align-text-top'>
                                        <p className='text-center text-white/80 py-4Za'>
                                            No descriptions found
                                        </p>
                                    </td>
                                </tr>
                                :
                                resDescriptions.data?.descriptions.map((item) => {
                                    return <tr key={item.id} className='md:text-lg text-base'>
                                        <td className='px-4 py-2 border border-white/10 align-text-top'>
                                            {item.id}
                                        </td>
                                        <td className='px-4 py-2 border border-white/10 align-text-top'>
                                            {item.description}
                                        </td>
                                        <td className='px-4 py-2 border border-white/10 text-center justify-center'>
                                            <div className="actions flex gap-4">
                                                <PopupDeleteDescription action={DeleteDescription} descriptionId={item.id} buttonText='Delete' headerText='Are you Sure From Deleting Description?' styleButton='bg-red-500 text-white hover:bg-red-700' />
                                                <PopupDeleteDescription action={EditDescription} descriptionId={item.id} buttonText='Edit' headerText='Are you Sure From Edit Description?' styleButton='bg-green-600 text-white hover:bg-green-700' typePopup={'EditPopup'} prevDescription={item.description} />
                                            </div>
                                        </td>
                                    </tr>
                                })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
