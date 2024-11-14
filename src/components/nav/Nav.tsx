import { ReactNode } from "react"

interface NavProps {
    className?: string
    children?: ReactNode
}

export default function Nav({className, children}: NavProps) {
    return (
        <nav className={`flex flex-row gap-4 ${className}`}>
            {children}
        </nav>
    )
}