'use client'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface PopupContextType {
    popupDescriptionRef: boolean | null;
    setPopupDescriptionRef: Dispatch<SetStateAction<boolean | null>>;
}

export const PopupCreateDescriptionContext = createContext<PopupContextType>({
    popupDescriptionRef: null,
    setPopupDescriptionRef: () => null
});

export default function PopupDescriptionProvider({ children }: { children: ReactNode }) {
    const [popupDescriptionRef, setPopupDescriptionRef] = useState<boolean | null>(false)
    return (
        <PopupCreateDescriptionContext.Provider value={{ popupDescriptionRef, setPopupDescriptionRef }}>
            {children}
        </PopupCreateDescriptionContext.Provider>
    )
}