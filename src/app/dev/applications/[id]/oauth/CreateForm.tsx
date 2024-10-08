"use client"

import { addRedirect } from "@/actions/application/addRedirect";
import InputText from "@/components/forms/InputText";
import SubmitButton from "@/components/forms/SubmitButton";
import { useRef } from "react";
import { useFormState } from "react-dom";

export default function CreateForm({applicationId}: {applicationId: string}) {
    const [state, formAction] = useFormState(addRedirect, {applicationId: applicationId})

    const form = useRef<HTMLFormElement>(null)

    if (state.result?.status === "success") {
        form.current?.reset()
    }

    return (
        <form action={formAction} ref={form}>
            <div className="flex flex-row">
                <InputText id="uri" name="uri" placeholder="https://example.com/callback" valid={state.errors?.uri ? false : undefined} />
                <SubmitButton className="ml-3">Add</SubmitButton>
            </div>
            <span className="text-sm text-negative">{state.errors?.uri}</span>
        </form>
    )
}