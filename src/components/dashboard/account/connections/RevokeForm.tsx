"use client"

import { revokeAuthorization } from "@/actions/account/revokeAuthorization";
import SubmitButton from "@/components/forms/SubmitButton";
import { Authorization } from "@/models/Authorization";
import { useFormState } from "react-dom";

export default function RevokeForm({authorization} : {authorization: Authorization}) {
    const [state, formAction] = useFormState(revokeAuthorization, {authorization})

    return (
        <form action={formAction} className="ml-auto">
            <SubmitButton appearance="negative">Revoke</SubmitButton>
            <span className="text-sm text-negative">{state.message}</span>
        </form>
    )
}
