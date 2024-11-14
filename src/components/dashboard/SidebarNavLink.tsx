import { ReactNode } from "react";
import NavLink, { NavLinkMatch } from "../nav/NavLink";

export interface SidebarNavLinkProps {
    href: string
    match: NavLinkMatch
    children: ReactNode
}

export default function SidebarNavLink({ href, match, children }: SidebarNavLinkProps) {
    return (
        <NavLink href={href} match={match} 
        className="block p-3 rounded border border-dark-700 transition hover:bg-dark-700 hover:shadow-lg active:bg-dark-750 text-center text-xl text-bright font-light" 
        activeClassName="bg-dark-700">
            {children}
        </NavLink>
    )
}