import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./style.css";

const poppinsSans = Poppins({
    weight: ['100', '200', '300', '400', '500', '700', '800', '900'],
    fallback: [''],
    style: 'normal',
    subsets: ['latin', 'latin-ext'],
});


export const metadata: Metadata = {
    title: "Portfolio | Mohammed Al-Mshal",
    description: "Web Developer",
};

export default function PortfolioLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div
            className={`${poppinsSans.className} selection:text-black  selection:bg-indigo-600 bg-[#111]`}
        >
            {children}
        </div>
    );
}
