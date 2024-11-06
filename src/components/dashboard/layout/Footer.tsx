import { ReactNode } from "react";

export default function Footer({ children }: { children: ReactNode }) {
    return (
        <footer className="py-5 mt-3 border-t border-dark-700">
            {children}
        </footer>
    )
}