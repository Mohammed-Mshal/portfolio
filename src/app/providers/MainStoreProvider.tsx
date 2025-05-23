'use client'

import React, { createContext, ReactNode, useContext, useRef } from 'react'
import { createMainStore, MainState } from '../store/store'
import { useStore } from 'zustand'

// - MainStoreApi is a type that represents whatever type is returned by createMainStore
export type MainStoreApi = ReturnType<typeof createMainStore>
// - MainStoreContext creates a React context that will hold our store. It's initialized as undefined and can either be of type MainStoreApi or undefined
export const MainStoreContext = createContext<MainStoreApi | undefined>(
    undefined,
)


//- This is a React component that will wrap parts of your app that need access to the store 
//- It uses useRef to maintain a reference to the store that persists between renders 
//- The store is created only once (when storeRef.current is null) to ensure we don't create multiple instances 
//- It wraps the children with the Context Provider, making the store available to all nested components 
export default function MainStoreProvider({ children }: { children: ReactNode }) {
    const storeRef = useRef<MainStoreApi>(null)
    if (!storeRef.current) {
        storeRef.current = createMainStore()
    }
    return (
        <MainStoreContext.Provider value={storeRef.current}>
            {children}
        </MainStoreContext.Provider>
    )
}


// - This is a custom hook that makes it easy to access the store from any component
// - It's generic ( <T> ) so you can specify what type of data you want to extract from the store
// - The selector parameter is a function that takes the entire store state and returns just the piece you want
// - It throws an error if used outside of the Provider
// - It uses Zustand's useStore hook to handle the subscription to store updates
// This is a common pattern for global state management in React applications using Zustand. The setup allows you to:
// 
// 1. Have a single source of truth for your application state 
// 2. Access and modify that state from any component 
// 3. Ensure the store is properly initialized only once 
// 4. Get TypeScript support for your store's shape and contents 
// Note: There seems to be a small inconsistency in the error message (it mentions "CounterStore" instead of "MainSore"), which might want to be updated for clarity. 
export const useMainStore = <T,>(
    selector: (store: MainState) => T,
): T => {
    const mainStoreContext = useContext(MainStoreContext)

    if (!mainStoreContext) {
        throw new Error(`useCounterStore must be used within CounterStoreProvider`)
    }

    return useStore(mainStoreContext, selector)
}