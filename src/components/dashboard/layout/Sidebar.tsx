import { ReactNode } from "react";

export default function Sidebar({ children }: { children: ReactNode }) {
    return (
        <section className="min-w-80 max-w-80 flex flex-col px-8 pt-8 bg-dark-900 border-r border-dark-700">
            {children}
        </section>
    )
}