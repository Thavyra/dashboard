import Footer from "@/components/dashboard/layout/Footer";
import LoginStatus from "@/components/dashboard/layout/LoginStatus";
import { ReactNode } from "react";

import { Outfit } from "next/font/google"

const outfit = Outfit({
    subsets: ['latin']
})

export default function SidebarLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex-grow">
                <h1 className="text-center text-3xl font-semibold" style={outfit.style}>Thavyra</h1>
                <hr className="border-dark-700 my-3 sm:my-5" />
                {children}
            </div>

            <Footer>
                <LoginStatus />
            </Footer>
        </>

    )
}