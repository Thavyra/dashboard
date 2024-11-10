"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"

export interface DeleteIconState {
    applicationId: string
    result?: { status: "success" } | { status: "failed" }
    message?: string
}

export async function deleteIcon(state: DeleteIconState, formData: FormData): Promise<DeleteIconState> {
    const session = await auth()

    if (!session) {
        return {
            applicationId: state.applicationId,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    try {

        const response = await deleteBackend(session, `/applications/${state.applicationId}/icon`)

        switch (response.status) {
            case 204:
                return {
                    applicationId: state.applicationId,
                    result: { status: "success" }
                }

            default:
                return {
                    applicationId: state.applicationId,
                    result: { status: "failed" },
                    message: "Something went wrong."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            applicationId: state.applicationId,
            result: { status: "failed" },
            message: "Failed to delete icon."
        }

    }
}