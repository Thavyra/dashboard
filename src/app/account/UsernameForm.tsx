"use client"

import InputText from "@/components/forms/InputText"
import { useFormState } from "react-dom"
import SubmitButton from "@/components/forms/SubmitButton"
import { changeUsername } from "@/actions/account/changeUsername"



export default function UsernameForm({ username }: { username: string }) {
    const [state, formAction] = useFormState(changeUsername, { username: username })

    return (
        <form action={formAction}>
            <label htmlFor="username" className="block mb-1.5">Username</label>

            <div className="sm:flex sm:flex-row">
                <InputText className="mb-3 sm:mb-0" id="username" name="username" valid={state.errors?.username ? false : undefined} defaultValue={state.username} required />

                <SubmitButton className="w-full sm:w-auto sm:ml-3">Change</SubmitButton>
            </div>

            <span className="text-sm text-negative">{state.errors?.username}</span>
        </form>
    )
}