"use client"

import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import { ModalContext } from "./Modal";

export interface ModalHeaderProps {
    children: ReactNode
}

export default function ModalHeader({ children }: ModalHeaderProps) {
    const modal = useContext(ModalContext)

    return (
        <div className="px-5 pt-4">
            <div className="flex flex-row items-center">
                {children}

                <button className="ml-auto text-3xl transition hover:text-bright" onClick={modal.close} aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <hr className="border-dark-700 my-3" />
        </div>

    )
}