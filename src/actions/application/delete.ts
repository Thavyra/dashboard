"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import { redirect } from "next/navigation"
import { z } from "zod"

export interface DeleteApplicationState {
    id: string,
    name: string,
    result?: { status: "success" } | { status: "failed" }
    message?: string
    errors?: {
        name?: string[]
    }
}

export async function deleteApplication(state: DeleteApplicationState, formData: FormData): Promise<DeleteApplicationState> {
    const session = await auth()

    if (!session) {
        return {
            id: state.id,
            name: state.name,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validator = z.object({
        name: z.literal(state.name)
    })

    const validationResult = validator.safeParse({
        name: formData.get("name")
    })

    if (!validationResult.success) {
        return {
            id: state.id,
            name: state.name,
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    let doRedirect = false

    try {

        const response = await deleteBackend(session, `/applications/${state.id}`)

        switch (response.status) {
            case 204:
                doRedirect = true

            default:
                return {
                    id: state.id,
                    name: state.name,
                    result: { status: "failed" },
                    message: "Something went wrong..."
                }
        }

    } catch (error) {

        console.log(error)

        return {
            id: state.id,
            name: state.name,
            result: { status: "failed" },
            message: "Failed to delete application."
        }

    } finally {
        if (doRedirect) {
            redirect("/dev/applications")
        }
    }
}