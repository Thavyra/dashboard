"use client"

import { resetClientSecret } from "@/actions/applications";
import CopyButton from "@/components/CopyButton";
import SubmitButton from "@/components/forms/SubmitButton";
import Application from "@/models/Application";
import { useFormState } from "react-dom";

export default function ClientSecret({ application }: { application: Application }) {
    const [state, formAction] = useFormState(resetClientSecret, {
        id: application.id
    })

    return (
        <div>
            <h4 className="text-lg">Client Secret</h4>
            {
                state.secret ? <code className="py-0.5 px-1 rounded bg-dark-900">{state.secret}</code>
                : <p className="my-0.5 text-dark-600">Hidden for security!</p>
            }
            <div className="flex flex-row mt-1">
                {state.secret && <CopyButton text={state.secret} className="text-sm mr-3" />}
                <form action={formAction}>
                    <SubmitButton className="text-sm">Reset</SubmitButton>
                </form>
            </div>

        </div>
    )
}