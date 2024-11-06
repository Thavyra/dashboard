import { ReactNode } from "react";

export default function SidebarNav({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-3">
            {children}
        </div>
    )
}