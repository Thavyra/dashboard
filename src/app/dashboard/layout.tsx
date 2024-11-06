import { signOut } from "@/auth";
import Footer from "@/components/dashboard/layout/Footer";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import NavLink from "@/components/nav/NavLink";
import { ReactNode } from "react";

export default function DashboardLayout({ children, sidebar }: { children: ReactNode, sidebar: ReactNode }) {
    return (
        <div className="min-h-screen py-10 flex flex-col">
            <div className="grow flex flex-row rounded-lg overflow-hidden">
                <Sidebar>
                    {sidebar}
                </Sidebar>
                <main className="grow flex flex-col px-8 pt-8 bg-dark-800">
                    <div className="grow">
                        {children}
                    </div>

                    <Footer>
                        <nav className="flex flex-row gap-3">
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