import PopupDescriptionProvider from "../providers/PopupProvider";


export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <PopupDescriptionProvider>

                {children}
            </PopupDescriptionProvider>
        </div>
    );
}
