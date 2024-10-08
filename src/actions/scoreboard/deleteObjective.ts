"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import Objective from "@/models/Objective"

export interface DeleteObjectiveResult {
    result: { status: "success" } | { status: "failed" }
    message?: string
}

export async function deleteObjective(objective: Objective): Promise<DeleteObjectiveResult> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "success" },
            message: "Authentication failed."
        }
    }

    try {

        const response = await deleteBackend(session, `/objectives/${objective.id}`)

        switch (response.status) {
            case 204:
                return {
                    result: { status: "success" }
                }

            default:
                return {
                    result: { status: "failed" },
                    message: "Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: { status: "failed" },
            message: "Failed to delete objective."
        }

    }
}