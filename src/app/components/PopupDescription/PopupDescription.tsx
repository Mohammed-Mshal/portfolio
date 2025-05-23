'use client'
import React, { useActionState, useContext, useEffect } from 'react'
import ButtonPopup from '../ButtonPopup'
import './PopupDescription.css'
import addDescription from '@/actions/addDescription'
import toast from 'react-hot-toast';
import { PopupCreateDescriptionContext } from '@/app/providers/PopupProvider'
const initialState: {
    statusText: string,
    status: null | number,
    message: string
} = {
    statusText: '',
    status: null,
    message: ''
}
export default function PopupDescription() {
    const [state, action, isPending] = useActionState(addDescription, initialState)
    const { setPopupDescriptionRef } = useContext(PopupCreateDescriptionContext)

    useEffect(() => {
        if (state.status === 200 && isPending === false) {
            toast.success(state.message, {
                position: 'top-center'
            })
            setPopupDescriptionRef(false)
        }
    }, [isPending])
    return (
        <div className="popup-description fixed top-0 left-0 h-dvh w-dvw bg-black/20 backdrop-blur-2xl z-50 px-4 py-8 flex items-center justify-center transition-all duration-500">
            <div className="container-popup p-6 w-full max-w-lg bg-black/40 rounded-2xl transition-all duration-500 flex flex-col gap-4">
                <div className="header text-center lg:text-xl text-lg relative">
                    <h2>
                        Add New Description
                    </h2>
                    <ButtonPopup type='Close' />
                </div>
                <div className="body-popup">
                    <form action={action} className='flex flex-col gap-4'>
                        <div className="group-form flex flex-col gap-4">
                            <label htmlFor="description" className='lg:text-2xl text-lg'>
                                Description
                            </label>
                            <textarea name="description" id="description" placeholder='Enter Your Description' className='rounded-lg border border-white/40 resize-none min-h-[300px] p-4 outline-none'></textarea>
                        </div>
                        {
                            state.status !== 200 && state.message &&
                            <div className='text-red-500 font-bold text-center'>
                                {state.message}
                            </div>
                        }
                        <div className="group-form flex flex-col gap-4">
                            <button type='submit'
                                disabled={isPending}
                                className={`py-2 px-4 ${isPending ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-500  hover:bg-indigo-600 cursor-pointer '} transition-all duration-300 rounded-lg`}>
                                {isPending ? 'Processing...' : 'Add Description'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
