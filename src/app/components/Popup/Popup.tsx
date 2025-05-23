'use client'
import React, { useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PopupType } from '@/types/popup'
const initialState = {
    statusText: '',
    status: null,
    message: '',
}
export default function Popup({ descriptionId, prevDescription, typePopup, buttonText, headerText, styleButton, action }: {
    typePopup?: PopupType,
    prevDescription?: string,
    descriptionId: string,
    buttonText: string,
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
        <div className='popup-wrapper flex-1'>
            <button className={`${styleButton} outline-none font-bold py-1 px-4 rounded-md cursor-pointer transition-all duration-500 w-full`} onClick={() => { setPopupState(true) }}>
                {buttonText}
            </button>
            <div className={`popup transition-all duration-300 backdrop-blur-xl bg-black/20 fixed top-0 left-0 w-dvw h-dvh z-40 flex items-center justify-center ${popupState ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`container-popup p-8 w-full max-w-lg rounded-xl bg-black/40 flex flex-col gap-8 transition-all duration-500 ${popupState ? 'scale-100' : ' scale-50'}`}>
                    <div className="header-popup">
                        <h2 className={` text-2xl text-white`}>
                            {headerText}
                        </h2>
                    </div>
                    <div className="body-popup">
                        <form action={actionFrom} className='flex flex-col gap-8'>
                            {typePopup === 'EditPopup' ?
                                <div className="form-group flex flex-col gap-2">
                                    <label htmlFor="newDescription">
                                        New Description:
                                    </label>
                                    <textarea name="newDescription" id="newDescription" defaultValue={prevDescription} placeholder='Enter Your New Description' className='rounded-lg border border-white/40 resize-none min-h-[300px] p-4 outline-none'></textarea>
                                </div>
                                :
                                ''
                            }
                            <div className='flex justify-center gap-8'>
                                <div className="form-group">
                                    <button type='button' className=' bg-white/10 border-white border-2 py-1 px-8 rounded-lg cursor-pointer hover:bg-white/50 transition-all duration-300'
                                        onClick={() => {
                                            setPopupState(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="form-group">
                                    <input type="hidden" name="descriptionId" id="descriptionId" value={descriptionId} />
                                    <button
                                        type='submit'
                                        disabled={isPending}
                                        className={`${isPending ? 'cursor-not-allowed bg-white/40 text-black/60' : `${styleButton}  cursor-pointer`} font-bold py-2 px-8 rounded-md transition-all duration-500 outline-none w-full`}>                                {isPending ? 'Processing...' : buttonText}
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
