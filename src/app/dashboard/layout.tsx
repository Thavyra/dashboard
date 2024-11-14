import { signOut } from "@/auth";
import Footer from "@/components/dashboard/layout/Footer";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import NavLink from "@/components/nav/NavLink";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Thavyra · Dashboard",
    description: "Manage your account, profile and applications."
}

export default function DashboardLayout({ children, sidebar }: { children: ReactNode, sidebar: ReactNode }) {
    return (
        <div className="min-h-screen md:py-10 flex flex-col">
            <div className="grow flex flex-col sm:flex-row md:rounded-lg overflow-hidden">
                <Sidebar>
                    {sidebar}
                </Sidebar>
                <main className="grow flex flex-col px-8 pt-5 sm:pt-8 bg-dark-800">
                    <div className="grow">
                        {children}
                    </div>

                    <Footer>
                        <nav className="flex flex-row gap-3 justify-center sm:justify-start">
                            <NavLink href="/dashboard/account" match="prefix" activeClassName="font-bold">Account</NavLink>
                            <NavLink href="/dashboard/dev" match="prefix" activeClassName="font-bold">Developer</NavLink>
                            <form action={async () => {
                                "use server"
                                await signOut({ redirectTo: "/" })
                            }}>
                                <button className="inline" type="submit">Logout</button>
                            </form>
                        </nav>
                    </Footer>
                </main>
            </div>
        </div>
    )
}