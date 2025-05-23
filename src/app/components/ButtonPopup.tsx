'use client'
import React, { useContext } from 'react'
import { PopupCreateDescriptionContext } from '../providers/PopupProvider'
import { CgCloseO } from 'react-icons/cg'
import { FiPlusCircle } from 'react-icons/fi'

type ButtonType = 'Close' | "Open"

export default function ButtonPopup({ type }: { type: ButtonType }) {
    const { popupDescriptionRef, setPopupDescriptionRef } = useContext(PopupCreateDescriptionContext)
    return (
        <button className={`${popupDescriptionRef ? 'show-popup' : 'hidden-popup'} ${type=='Close'&&'absolute top-1/2 end-0 -translate-y-1/2'} hover:scale-110 transition-all duration-300 text-3xl cursor-pointer`} onClick={() => {
            if (type === 'Close') {
                setPopupDescriptionRef(false)
            } else if (type === 'Open') {
                setPopupDescriptionRef(true)
            }

        }}>
            {
                type === 'Close' ?
                    <CgCloseO /> :
                    <FiPlusCircle />
            }
        </button>
    )
}
