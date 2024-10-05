import Nav from "@/components/nav/Nav"
import NavLinkUnderline from "@/components/nav/NavLinkUnderline"
import { ReactNode } from "react"

export default function Layout({ children, params }: { children: ReactNode, params: {id: string} }) {
    return (
        <>
            <Nav className="mb-3 mt-8">
                <NavLinkUnderline href={`/dev/applications/${params.id}`}>Details</NavLinkUnderline>
                <NavLinkUnderline href={`/dev/applications/${params.id}/oauth`}>OAuth2</NavLinkUnderline>
                <NavLinkUnderline href={`/dev/applications/${params.id}/scoreboard`}>Scoreboard</NavLinkUnderline>
            </Nav>

            {children}
        </>
    )
}