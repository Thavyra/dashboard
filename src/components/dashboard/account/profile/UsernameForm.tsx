"use client"

import InputText from "@/components/forms/InputText"
import { useFormState } from "react-dom"
import SubmitButton from "@/components/forms/SubmitButton"
import { changeUsername, validateUsername } from "@/actions/account/changeUsername"
import { useState } from "react"

export default function UsernameForm({ username }: { username: string }) {
    const [state, formAction] = useFormState(changeUsername, { username })
    const [validationState, setValidationState] = useState<{ valid?: boolean, errors?: string[] }>({ valid: undefined, errors: undefined })

    const isValid = (state.errors?.username ? false : undefined) || validationState.valid

    return (
        <form action={formAction}>
            <label htmlFor="username" className="block mb-1.5">Username</label>

            <div className="sm:flex sm:flex-row">
                <div className="grow mb-3 sm:mb-0">
                    <InputText id="username" name="username"
                        onChange={async event => {
                            const result = await validateUsername(event.currentTarget.value, state.username)
                            setValidationState(result)
                        }}
                        valid={isValid} defaultValue={state.username} required maxLength={40} />
                    <span className="text-sm text-negative">{state.errors?.username?.at(0) ?? validationState.errors?.at(0)}</span>
                </div>

                <SubmitButton className="w-full sm:w-auto sm:ml-3 sm:mb-auto" disabled={isValid === false}>
                    {isValid === false ? "Invalid" : "Change"}
                </SubmitButton>
            </div>


        </form>
    )
}