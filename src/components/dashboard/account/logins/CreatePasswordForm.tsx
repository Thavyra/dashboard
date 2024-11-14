"use client"

import { createPassword } from "@/actions/account/createPassword";
import Button from "@/components/Button";
import InputText from "@/components/forms/InputText";
import SubmitButton from "@/components/forms/SubmitButton";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function CreatePasswordForm() {
    const [showForm, setShowForm] = useState(false)
    const [state, formAction] = useFormState(createPassword, {})

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div>No password set.</div>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "Create Password"}
                </Button>
            </div>

            {showForm &&
                <form action={formAction}>
                    <hr className="border-dark-700 my-3" />

                    <div className="text-negative">
                        {state.message}
                    </div>

                    <div className="mb-3">
                        <label className="block mb-1.5" htmlFor="password">Password</label>

                        <InputText type="password" id="password" name="password" autoFocus 
                        valid={state.errors?.password?.length ?? 0 > 0 ? false : undefined} />

                        <span className="text-sm text-negative">{state.errors?.password?.at(0)}</span>
                    </div>

                    <div className="mb-3">
                        <label className="block mb-1.5" htmlFor="confirmPassword">Confirm Password</label>

                        <InputText type="password" id="confirmPassword" name="confirmPassword" 
                        valid={state.errors?.confirmPassword?.length ?? 0 > 0 ? false : undefined} />
                        
                        <span className="text-sm text-negative">{state.errors?.confirmPassword?.at(0)}</span>
                    </div>

                    <SubmitButton>Create</SubmitButton>
                </form>
            }
        </div>
    )
}