"use client"

import { createApplication } from "@/actions/application/create"
import InputText from "@/components/forms/InputText"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { useFormState } from "react-dom"

export interface CreateApplicationFormProps {
    submit: ReactNode
}

export default function CreateApplicationForm({submit}: CreateApplicationFormProps) {
    const [state, formAction] = useFormState(createApplication, {})

    if (state.result?.status === "success") {
        redirect(`/dashboard/dev/applications/${state.result.id}`)
    }

    return (
        <form action={formAction}>
            {state.message}

            <section className="px-5">
                <label htmlFor="name" className="block mb-1.5">Name</label>
                <InputText id="name" name="name" autoFocus required maxLength={40}
                    valid={state.result?.status === "failed" ? false : undefined} />
                <span className="text-sm text-negative">
                    {state.errors?.name?.at(0)}
                </span>
            </section>

            {submit}            
        </form>
    )
}