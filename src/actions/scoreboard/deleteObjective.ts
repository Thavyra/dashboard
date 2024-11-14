"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import Objective from "@/models/Objective"
import { revalidatePath, revalidateTag } from "next/cache"

export interface DeleteObjectiveState {
    objective: Objective
    result?: { status: "success" } | { status: "failed" }
    message?: string
}

export async function deleteObjective(state: DeleteObjectiveState, _: FormData): Promise<DeleteObjectiveState> {
    const session = await auth()

    if (!session) {
        return {
            objective: state.objective,
            result: { status: "success" },
            message: "Authentication failed."
        }
    }

    try {

        const response = await deleteBackend(session, `/objectives/${state.objective.id}`)

        switch (response.status) {
            case 204:

                revalidateTag(`applications:${state.objective.application_id}:objectives`)
                revalidatePath(`/dev/applications/${state.objective.application_id}/scoreboard`)

                return {
                    objective: state.objective,
                    result: { status: "success" }
                }

            default:
                return {
                    objective: state.objective,
                    result: { status: "failed" },
                    message: "Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            objective: state.objective,
            result: { status: "failed" },
            message: "Failed to delete objective."
        }

    }
}