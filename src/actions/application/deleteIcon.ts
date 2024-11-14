"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import { revalidatePath, revalidateTag } from "next/cache"

export interface DeleteIconState {
    applicationId: string
    result?: { status: "success" } | { status: "failed" }
    message?: string
}

export async function deleteIcon(state: DeleteIconState, _: FormData): Promise<DeleteIconState> {
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
                revalidateTag(`application_icons:${state.applicationId}`)
                revalidatePath(`/application_icons/${state.applicationId}`)

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
