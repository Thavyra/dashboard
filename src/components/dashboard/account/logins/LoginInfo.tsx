import { ReactNode } from "react"

export interface LoginInfoProps {
    color: string
    header: ReactNode
    children: ReactNode
}

export default function LoginInfo({ color, header, children }: LoginInfoProps) {
    return (
        <div className={`rounded border border-${color}`}>

            <div className="p-3 border-b border-dark-700">
                {header}
            </div>

            <div className="p-3">
                {children}
            </div>

        </div>
    )
}