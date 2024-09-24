import { signOut } from "@/auth";
import Nav from "@/components/nav/Nav";
import NavLink from "@/components/nav/NavLink";
import { ReactNode } from "react";

export default function AccountLayout({children}: {children: ReactNode}) {
    return (
        <>
            <Nav className="mb-1.5">
                <NavLink href="/account">Profile</NavLink>
                <NavLink href="/account/transactions">Transactions</NavLink>
                <NavLink href="/account/authorizations">Connected Apps</NavLink>
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