"use client"

import { resetClientSecret } from "@/actions/application/resetSecret";
import CopyButton from "@/components/CopyButton";
import SubmitButton from "@/components/forms/SubmitButton";
import { useFormState } from "react-dom";

export default function ClientSecret({ applicationId }: { applicationId: string }) {
    const [state, formAction] = useFormState(resetClientSecret, {
        id: applicationId
    })

    return (
        <div>
            <h4 className="text-lg">Client Secret</h4>
            {
                state.result?.status === "success" 
                    ? <div className="font-mono">{state.result.secret}</div>

                : state.result?.status === "failed"
                    ? <div className="text-negative">{state.message ?? "Something went wrong..."}</div>

                : <div className="text-dark-600">Hidden for security!</div>
            }
            <div className="flex flex-row mt-1">
                {state.result?.status === "success" && <CopyButton text={state.result.secret} className="text-sm mr-3" />}
                <form action={formAction}>
                    <SubmitButton className="text-sm">Reset</SubmitButton>
                </form>
            </div>

        </div>
    )
}