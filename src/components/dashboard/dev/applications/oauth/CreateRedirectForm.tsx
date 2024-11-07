"use client"

import { addRedirect } from "@/actions/application/addRedirect"
import InputText from "@/components/forms/InputText"
import SubmitButton from "@/components/forms/SubmitButton"
import { useRef } from "react"
import { useFormState } from "react-dom"

export default function CreateRedirectForm({ applicationId }: { applicationId: string }) {
    const [state, formAction] = useFormState(addRedirect, { applicationId })

    const form = useRef<HTMLFormElement>(null)

    if (state.result?.status === "success") {
        form.current?.reset()
    }

    return (
        <form action={formAction} ref={form}>
            <div className="flex flex-row">
                <InputText id="uri" name="uri" placeholder="https://example.com/callback"
                    valid={state.errors?.uri?.length ?? 0 > 0 ? false : undefined} />
                <button type="submit" className="p-0.5 transition text-bright hover:text-light"
                aria-label="Add">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    stroke="currentColor" className="size-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </button>
            </div>
            <span className="text-sm text-negative">{state.errors?.uri?.at(0)}</span>
        </form>
    )
}