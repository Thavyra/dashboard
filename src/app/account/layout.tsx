import { signOut } from "@/auth";
import Nav from "@/components/nav/Nav";
import NavLink from "@/components/nav/NavLink";
import NavLinkUnderline from "@/components/nav/NavLinkUnderline";
import { ReactNode } from "react";

export default function AccountLayout({children}: {children: ReactNode}) {
    return (
        <>
            <Nav className="mb-3 mt-8">
                <NavLinkUnderline href="/account">Profile</NavLinkUnderline>
                <NavLinkUnderline href="/account/transactions">Transactions</NavLinkUnderline>
                <NavLinkUnderline href="/account/authorizations">Connected Apps</NavLinkUnderline>
                <form action={async () => {
                    "use server"
                    await signOut()
                }}>
                    <button type="submit">Sign Out</button>
                </form>
            </Nav>

            {children}
        </>
        
    )
}