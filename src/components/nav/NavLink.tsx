"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export interface NavLinkProps {
    href: string,
    match?: "all" | "prefix",
    className?: string,
    activeClassName?: string,
    inactiveClassName?: string,
    children?: ReactNode
}

export default function NavLink({ href, className, activeClassName, inactiveClassName, children, ...props }: NavLinkProps) {
    const pathname = usePathname();
    const active = props.match === "prefix" ? pathname.startsWith(href) : pathname === href

    return (
        <Link href={href} className={`${className} ${active ? `${activeClassName}` : `${inactiveClassName}`}`}>
            {children}
        </Link>
    )
}