'use client'
import { PopupTechnologyType } from '@/types/popup';
import React, { ReactElement, useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IconType } from 'react-icons/lib';
const initialState = {
    statusText: '',
    status: null,
    message: '',
}
export default function PopupTechnology(
    {
        typePopup,
        listCompany,
        experienceId,
        title,
        itemId,
        buttonText,
        buttonIcon,
        headerText,
        styleButton,
        action }: {
            typePopup?: PopupTechnologyType,
            listCompany?: { idExperience: string, companyName: string }[],
            title?: string,
            experienceId?: string,
            itemId?: string,
            buttonText?: string,
            buttonIcon?: ReactElement<IconType>,
            headerText: string,
            styleButton: string,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            action: (prevState: any, formData: FormData) => Promise<{
                status: number | null;
                statusText: string;
                message: string;
            }>
        }
) {

    const [popupState, setPopupState] = useState(false)
    const [state, actionFrom, isPending] = useActionState(action, initialState)
    useEffect(() => {
        if (isPending === false && state.status === 200) {
            toast.success(state.message)
            setPopupState(false)
        }
        else if (isPending === false && state.status !== 200 && state.message.length > 0) {
            toast.error(state.message)
        }
    }, [isPending])
    return (

        <div className={`popup-wrapper ${typePopup !== 'AddPopup' && 'flex-1'}`}>
            <button className={`outline-none font-bold py-1 rounded-md cursor-pointer transition-all duration-500 w-full ${typePopup === 'AddPopup' ? '' : styleButton + ' px-4'}`} onClick={() => { setPopupState(true) }}>
                {typePopup === 'AddPopup' ? buttonIcon : buttonText}
            </button>
            <div className={`popup transition-all duration-300 backdrop-blur-xl bg-black/20 fixed top-0 left-0 w-dvw h-dvh z-40 flex items-center justify-center p-10 overflow-y-auto ${popupState ? 'opacity-100' : 'opacity-0 pointer-events-none '}`}>
                <div className={`container-popup p-8 w-full max-w-lg rounded-xl bg-black/40 flex flex-col gap-8 transition-all duration-500 ${popupState ? 'scale-100' : ' scale-50'}`}>
                    <div className="header-popup text-center">
                        <h2 className={` text-2xl text-white`}>
                            {headerText}
                        </h2>
                    </div>
                    <div className="body-popup">
                        <form action={actionFrom} className='flex flex-col gap-4'>
                            {typePopup === 'AddPopup' || typePopup === 'EditPopup' ?
                                <>
                                    <div className="form-group flex flex-col gap-4">
                                        <label htmlFor="idExperience" className='lg:text-2xl text-lg text-start'>
                                            Company Name
                                        </label>
                                        <select name="idExperience" id="idExperience" className='rounded-lg border border-white/40 resize-none p-2 px-4 outline-none bg-black/50' >
                                            {
                                                listCompany &&
                                                listCompany.map((company) => {
                                                    return <option value={company.idExperience} key={company.idExperience} defaultChecked={experienceId === company.idExperience ? true : false}>
                                                        {company.companyName}
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group flex flex-col gap-4">
                                        <label htmlFor="title" className='lg:text-2xl text-lg text-start'>
                                            Technology Name
                                        </label>
                                        <input type="text" defaultValue={title} name="title" id="title" className='rounded-lg border border-white/40 resize-none p-2 px-4 outline-none' />
                                    </div>
                                </>
                                :
                                ''
                            }
                            <div className='flex justify-center gap-8'>
                                <div className="form-group">
                                    <button type='button' className='bg-white/10 border-white border-2 py-1 px-8 rounded-lg cursor-pointer hover:bg-white/50 transition-all duration-300'
                                        onClick={() => {
                                            setPopupState(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="form-group">
                                    <input type="hidden" name="itemId" id="itemId" defaultValue={itemId} />
                                    <button
                                        type='submit'
                                        disabled={isPending}
                                        className={`${isPending ? 'cursor-not-allowed bg-white/40 text-black/60' : `${styleButton}  cursor-pointer`} font-bold py-1 px-8 rounded-lg transition-all duration-500 outline-none w-full`}>
                                        {isPending ? 'Processing...' : buttonText}
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
