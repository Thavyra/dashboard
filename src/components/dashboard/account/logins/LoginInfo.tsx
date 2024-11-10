import { ReactNode } from "react"

export interface LoginInfoProps {
    className: string
    header: ReactNode
    children: ReactNode
}

export default function LoginInfo({ className, header, children }: LoginInfoProps) {
    return (
        <div className={`rounded border ${className}`}>

            <div className="p-3 border-b border-dark-700">
                {header}
            </div>

            <div className="p-3">
                {children}
            </div>

        </div>
    )
}