import { ReactNode, useContext } from "react"
import LinkButton from "../LinkButton"
import { ModalContext } from "./Modal"

export interface ModalFooterProps {
    children: ReactNode
}

export default function ModalFooter({ children }: ModalFooterProps) {
    const modal = useContext(ModalContext)

    return (
        <footer className="px-5 py-3 border-t border-dark-700 mt-3 bg-dark-900">
            <div className="flex flex-row">
                {children}
                <LinkButton className="ml-3 text-lg" onClick={modal.close}>Cancel</LinkButton>
            </div>
        </footer>
    )
}