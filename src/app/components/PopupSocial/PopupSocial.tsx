'use client'
import React, { ReactElement, useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PopupSocialType } from '@/types/popup'
import { IconType } from 'react-icons/lib'
import { Social } from '@prisma/client'
const initialState = {
    statusText: '',
    status: null,
    message: '',
}
const listTypeSocial = [
    "WHATSAPP",
    "FACEBOOK",
    "YOUTUBE",
    "INSTAGRAM",
    "CALL",
    "EMAIL",

]
export default function Popup(
    { socialId,
        iconLink,
        typePopup,
        buttonText,
        buttonIcon,
        typeLink,
        headerText,
        styleButton,
        action }: {
            typePopup?: PopupSocialType,
            iconLink?: string,
            socialId?: string,
            buttonText?: string,
            typeLink?: Social
            buttonIcon?: ReactElement<IconType>,
            headerText: string,
            styleButton: string,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            action: (prevState: any, formData: FormData) => Promise<{
                status: number | null;
                statusText: string;
                message: string;
            }>
        }) {
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
            <button className={`outline-none font-bold py-1 px-4 rounded-md cursor-pointer transition-all duration-500 w-full ${typePopup === 'AddPopup' ? '' : styleButton}`} onClick={() => { setPopupState(true) }}>
                {typePopup === 'AddPopup' ? buttonIcon : buttonText}
            </button>
            <div className={`popup transition-all duration-300 backdrop-blur-xl bg-black/20 fixed top-0 left-0 w-dvw h-dvh z-40 flex items-center justify-center ${popupState ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`container-popup p-8 w-full max-w-lg rounded-xl bg-black/40 flex flex-col gap-8 transition-all duration-500 ${popupState ? 'scale-100' : ' scale-50'}`}>
                    <div className="header-popup text-center">
                        <h2 className={` text-2xl text-white`}>
                            {headerText}
                        </h2>
                    </div>
                    <div className="body-popup">
                        <form action={actionFrom} className='flex flex-col gap-8'>
                            {typePopup === 'AddPopup' || typePopup === 'EditPopup' ?
                                <>
                                    <div className="form-group flex flex-col gap-4">
                                        <label htmlFor="link" className='lg:text-2xl text-lg text-start'>
                                            Link Social
                                        </label>
                                        <input type="text" defaultValue={iconLink} placeholder='Enter Social Media Link' id='link' name='link' className='rounded-lg border border-white/40 resize-none p-2 px-4 outline-none' />
                                    </div>
                                    <div className="form-group flex flex-col gap-4">
                                        <label htmlFor="typeSocial" className='lg:text-2xl text-lg text-start'>
                                            Type Social
                                        </label>
                                        <select name="typeSocial" id="typeSocial" defaultValue={typeLink} className='rounded-lg border border-white/40 resize-none p-2 px-4 outline-none bg-black/60'>
                                            <option value="">Select Type Option</option>
                                            {
                                                listTypeSocial.map((item) => {
                                                    return <option value={item} key={item}>
                                                        {item}
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group flex flex-col gap-4">
                                        <label htmlFor="icon" className='lg:text-2xl text-lg text-start'>
                                            Icon Social
                                        </label>
                                        <input type="file" id='icon' name='icon' className='rounded-lg border cursor-pointer border-white/40 resize-none p-2 px-4 outline-none' />
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
                                    <input type="hidden" name="socialId" id="socialId" value={socialId} />
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
