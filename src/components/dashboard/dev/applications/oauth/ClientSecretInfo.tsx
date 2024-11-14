"use client"

import { resetClientSecret } from "@/actions/application/resetSecret";
import CopyButton from "@/components/CopyButton";
import SubmitButton from "@/components/forms/SubmitButton";
import Application from "@/models/Application";
import { useFormState } from "react-dom";

export default function ClientSecretInfo({ application }: { application: Application }) {
    const [state, formAction] = useFormState(resetClientSecret, { id: application.id })

    return (
        <div className="basis-full md:basis-1/2 xl:basis-1/3">
            <h4 className="text-lg">Client Secret</h4>

            {state.result?.status === "success"
                ? <div key={"success"} className="font-mono">{state.result.secret}</div>
                : state.result?.status === "failed"
                    ? <div key={"failed"} className="text-negative">{state.message ?? "Something went wrong..."}</div>
                    : <div key={"default"} className="text-dark-600">
                        {application.is_confidential
                            ? <span>Hidden for security!</span>
                            : <span>No secret set.</span>
                        }
                    </div>
            }

            <div className="flex flex-row mt-1">
                {state.result?.status === "success" &&
                    <CopyButton key={"copy"} text={state.result.secret} className="text-sm mr-3" />
                }
                <form action={formAction}>
                    <SubmitButton key={"submit"} className="text-sm">Reset</SubmitButton>
                </form>
            </div>
        </div>
    )
}