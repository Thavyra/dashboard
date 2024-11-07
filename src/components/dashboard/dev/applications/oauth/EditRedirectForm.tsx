"use client"

import { deleteRedirect } from "@/actions/application/removeRedirect"
import InputText from "@/components/forms/InputText"
import Redirect from "@/models/Redirect"
import { useFormState } from "react-dom"

export interface EditRedirectFormProps {
    redirect: Redirect
}

export default function EditRedirectForm({ redirect }: EditRedirectFormProps) {
    const [deleteState, deleteAction] = useFormState(deleteRedirect, { redirect })

    return (
        <div>
            <div className="flex flex-row items-center">
                <InputText id={redirect.id} name={redirect.id} value={redirect.uri} readOnly />
                <form action={deleteAction} className="flex items-center">
                    <button type="submit" className="p-0.5 transition text-negative hover:text-negative-dark"
                    aria-label="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" className="size-9">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </form>
            </div>
            <span className="text-sm text-negative">{deleteState.message}</span>
        </div>
    )
}
