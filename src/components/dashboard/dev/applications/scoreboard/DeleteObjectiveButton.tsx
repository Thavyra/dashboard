"use client"

import { deleteObjective } from "@/actions/scoreboard/deleteObjective"
import SubmitButton from "@/components/forms/SubmitButton"
import Objective from "@/models/Objective"
import { useFormState } from "react-dom"

export interface DeleteObjectiveButtonProps {
    objective: Objective
}

export default function DeleteObjectiveButton({objective}: DeleteObjectiveButtonProps) {
    const [state, formAction] = useFormState(deleteObjective, {objective})

    return (
        <form action={formAction}>
            <SubmitButton appearance="negative">Delete</SubmitButton>
            <span className="text-sm text-negative">{state.message}</span>
        </form>
    )
}
