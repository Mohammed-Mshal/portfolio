import React from 'react'
import Sidebar from '../../components/Sidebar';
import './style.css'
import MainStoreProvider from '../../providers/MainStoreProvider';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex relative min-h-dvh'>
            <MainStoreProvider>
                <Sidebar />
                <div className="content p-8 flex-1 max-w-full" >
                    {children}
                </div>
            </MainStoreProvider>
        </div>
    );
}
