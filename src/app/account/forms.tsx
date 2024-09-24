"use client"

import Button from "@/components/Button"
import InputText from "@/components/forms/InputText"
import { changeUsername, ChangeUsernameState } from "@/actions/account"
import { useFormState, useFormStatus } from "react-dom"

const initialState: ChangeUsernameState = { }

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" aria-disabled={pending}>Change</Button>
    )
}

export function UsernameForm({ username }: { username: string }) {
    const [state, formAction] = useFormState(changeUsername, initialState)

    return (
        <form action={formAction}>
            <InputText name="username" defaultValue={username} required />

            <SubmitButton />
        </form>
    )
}