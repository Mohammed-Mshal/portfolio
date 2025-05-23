'use client'
import Image from 'next/image'
import React, { useActionState } from 'react'
import { register } from '@/actions/register'
import Form from 'next/form'
const initialState = {
    message: ''
}
export default function Page() {
    const [state, action, isPending] = useActionState(register, initialState)
    return (
        <div className='login flex items-center justify-center min-h-dvh w-full px-8'>
            <div className="container max-w-md w-full flex flex-col h-fit bg-white/20 rounded-xl px-4 py-8 shadow-indigo-800/70 shadow-2xl">
                <div className="logo flex justify-center">
                    <Image className='' src={'/Logo.svg'} height={60} width={160} alt='Logo' />
                </div>
                <Form action={action} className='flex flex-col gap-4 px-4'>
                    <div className="form-group text-xl flex flex-col gap-2 ">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name='name' className='py-1 px-4 border border-white/50 outline-none rounded-lg' />
                    </div>
                    <div className="form-group text-xl flex flex-col gap-2 ">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name='email' className='py-1 px-4 border border-white/50 outline-none rounded-lg' />
                    </div>
                    <div className="form-group text-xl flex flex-col gap-2 ">
                        <label htmlFor="email">
                            Password
                        </label>
                        <input type="password" name='password' className='py-1 px-4 border border-white/50 outline-none rounded-lg' />
                    </div>
                    <div className="form-group text-xl flex flex-col gap-2 ">
                        <label htmlFor="email">
                            Confirm Password
                        </label>
                        <input type="password" name='confirmPassword' className='py-1 px-4 border border-white/50 outline-none rounded-lg' />
                    </div>
                    <div className="error text-red-500 text-center font-bold">
                        {
                            state?.message as string
                        }
                    </div>
                    <button
                        disabled={isPending}
                        type='submit'
                        className={`w-full ${isPending ? 'cursor-not-allowed bg-white/20' : ' bg-indigo-500 hover:bg-indigo-800  cursor-pointer'} py-2 text-lg rounded-xl transition-all duration-500`}>
                        {isPending?"PROCESSING...":'Register'}
                    </button>
                </Form>
            </div>
        </div>
    )
}
