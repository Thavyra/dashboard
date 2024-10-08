"use client"

import { deleteRedirect } from "@/actions/application/removeRedirect"
import InputText from "@/components/forms/InputText"
import SubmitButton from "@/components/forms/SubmitButton"
import Redirect from "@/models/Redirect"
import { useFormState } from "react-dom"

export default function RedirectForm({ redirect }: { redirect: Redirect }) {
    const [state, formAction] = useFormState(deleteRedirect, {redirect: redirect})

    return (
        <div className="mb-3">
            <div className="flex flex-row">
            <InputText id={redirect.id} name={redirect.id} value={redirect.uri} readOnly valid={state.result?.status === "failed" ? false : undefined} />
            <form action={formAction}>
                <SubmitButton design="negative" className="ml-3">Delete</SubmitButton>
            </form>
            </div>
            <span className="text-sm text-negative">{state.message}</span>
        </div>
    )
}