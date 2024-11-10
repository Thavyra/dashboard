import { ReactNode } from "react";

export default function SidebarNav({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-flow-col sm:flex sm:flex-col gap-3 overflow-scroll">
            {children}
        </div>
    )
}