"use client"

import { changeDescription } from "@/actions/account/changeDescription"
import InputTextArea from "@/components/forms/InputTextArea"
import SubmitButton from "@/components/forms/SubmitButton"
import { useFormState } from "react-dom"

export default function DescriptionForm({ description }: { description: string | null }) {
    const [state, formAction] = useFormState(changeDescription, { description })

    return (
        <form action={formAction}>
            <div className="mb-3">
                <label htmlFor="description" className="block mb-1.5">Description</label>

                <InputTextArea rows={10} id="description" name="description" maxLength={400}
                    valid={state.errors?.description ? false : undefined} defaultValue={description ?? ""} />

                <span className="text-sm text-negative">{state.errors?.description}</span>
            </div>

            <SubmitButton className="w-full sm:w-auto">Save</SubmitButton>
        </form>
    )
}
