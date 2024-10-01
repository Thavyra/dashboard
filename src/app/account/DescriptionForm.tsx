"use client"

import { changeDescription } from "@/actions/account"
import InputTextArea from "@/components/forms/InputTextArea"
import SubmitButton from "@/components/forms/SubmitButton"
import { useFormState } from "react-dom"

export default function DescriptionForm({ description }: { description: string | null }) {
    const [state, formAction] = useFormState(changeDescription, { currentDescription: description })

    return (
        <form action={formAction}>
            <label htmlFor="description" className="block mb-1.5">Description</label>

            <InputTextArea className="mb-3" rows={4} id="description" name="description" valid={state.result === "failed" ? false : undefined} defaultValue={description ?? ""} />

            <span className="text-sm text-negative">{state.errors}</span>

            <SubmitButton className="w-full sm:w-auto" />
        </form>
    )
}