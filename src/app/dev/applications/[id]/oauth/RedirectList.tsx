"use client"

import { createRedirect, deleteRedirect } from "@/actions/redirects";
import Button from "@/components/Button";
import InputText from "@/components/forms/InputText";
import SubmitButton from "@/components/forms/SubmitButton";
import Redirect from "@/models/Redirect";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

interface EditRedirectProps {
    redirect: Redirect
    onDelete: (redirect: Redirect) => void
}

export default function RedirectList({ applicationId, redirects }: { applicationId: string, redirects: Redirect[] }) {
    const [list, setList] = useState(redirects)

    return (
        <>
            {list.map(redirect => {
                return (
                    <EditRedirect key={redirect.id} redirect={redirect} 
                    onDelete={() => setList(list.filter(x => x.id !== redirect.id))} />
                )
            })}

            <AddRedirect applicationId={applicationId} onAdd={(redirect) => {
                setList([
                    ...list,
                    redirect
                ])
            }} />
        </>
    )
}

function EditRedirect({ redirect, onDelete }: EditRedirectProps) {
    return (
        <div className="flex flex-row mb-3">
            <InputText id={redirect.id} name={redirect.id} value={redirect.uri} readOnly />
            <Button onClick={async () => {
                await deleteRedirect(redirect)
                onDelete(redirect)
            }}
                design="negative" className="ml-3">
                Delete
            </Button>
        </div>
    )
}

function AddRedirect({ applicationId, onAdd }: { applicationId: string, onAdd: (redirect: Redirect) => void }) {
    const [state, formAction] = useFormState(createRedirect, {
        applicationId: applicationId
    })

    const form = useRef<HTMLFormElement>(null)

    if (state.result === "success") {
        onAdd({
            id: state.id!,
            application_id: state.applicationId,
            uri: state.uri!
        })

        form.current?.reset()

        // Prevents a loop of onAdd()s
        state.result = undefined
    }

    return (
        <form action={formAction} ref={form}>
            <div className="flex flex-row">
                <InputText id="create" name="create" placeholder="https://example.com/callback" valid={state.errors ? false : undefined} />
                <SubmitButton className="ml-3">Add</SubmitButton>
            </div>
            <span className="text-sm text-negative">{state.errors}</span>
        </form>
    )
}