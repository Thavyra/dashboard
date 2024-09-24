"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
    href: string,
    className?: string,
    activeClassName?: string,
    children?: ReactNode
}

export default function NavLink({ href, className, activeClassName, children }: NavLinkProps) {
    const pathname = usePathname();
    const active = pathname == href

    return (
        <Link href={href} className={`block transition pb-1 ${active 
        ? "border-b-2 border-b-light text-light" 
        : "text-link border-b-link-hover hover:text-link-hover hover:border-b-2"}`}>
            {children}
        </Link>
    )
}