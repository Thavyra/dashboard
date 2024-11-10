import Footer from "@/components/dashboard/layout/Footer";
import LoginStatus from "@/components/dashboard/layout/LoginStatus";
import { ReactNode } from "react";

export default function SidebarLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex-grow">
                <h1 className="text-center text-3xl font-semibold">Thavyra</h1>
                <hr className="border-dark-700 my-3 sm:my-5" />
                {children}
            </div>

            <Footer>
                <LoginStatus />
            </Footer>
        </>

    )
}