"use client"

import { deleteObjective } from "@/actions/scoreboard/deleteObjective"
import SubmitButton from "@/components/forms/SubmitButton"
import Objective from "@/models/Objective"
import { useFormState } from "react-dom"

export default function DeleteButton({ objective }: { objective: Objective }) {
    const [state, formAction] = useFormState(deleteObjective, { objective })

    return (
        <form action={formAction}>
            <SubmitButton design="negative" className="text-sm">Delete</SubmitButton>
            <span className="text-sm text-negative">{state.message}</span>
        </form>
    )
}