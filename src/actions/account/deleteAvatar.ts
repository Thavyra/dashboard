"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import { revalidatePath, revalidateTag } from "next/cache"

export interface DeleteAvatarState {
    userId: string
    result?: { status: "success" } | { status: "failed" }
    message?: string
}

export async function deleteAvatar(state: DeleteAvatarState, _: FormData): Promise<DeleteAvatarState> {
    const session = await auth()

    if (!session) {
        return {
            userId: state.userId,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    try {

        const response = await deleteBackend(session, `/users/${state.userId}/avatar`)

        switch (response.status) {
            case 204:

                revalidateTag(`avatars:${state.userId}`)
                revalidatePath(`/avatars/${state.userId}`)

                return {
                    userId: state.userId,
                    result: { status: "success" }
                }

            default:
                return {
                    userId: state.userId,
                    result: { status: "failed" },
                    message: "Something went wrong."
                }

        }

    } catch (error) {

        console.error(error)

        return {
            userId: state.userId,
            result: { status: "failed" },
            message: "Failed to delete avatar."
        }

    }
}
