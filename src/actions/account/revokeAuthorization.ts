"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import { Authorization } from "@/models/Authorization"
import { revalidatePath, revalidateTag } from "next/cache"

export interface RevokeAuthorizationState {
    authorization: Authorization,
    result?: { status: "success" } | { status: "failed" }
    message?: string
}

export async function revokeAuthorization(state: RevokeAuthorizationState, formData: FormData): Promise<RevokeAuthorizationState> {
    const session = await auth()

    if (!session) {
        return {
            authorization: state.authorization,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    try {

        const response = await deleteBackend(session, `/authorizations/${state.authorization.id}`)

        switch (response.status) {
            case 204:

                revalidateTag(`users:${state.authorization.user_id}:authorizations`)
                revalidatePath("/account/authorizations")

                return {
                    authorization: state.authorization,
                    result: { status: "success" }
                }

            default:
                return {
                    authorization: state.authorization,
                    result: { status: "failed" },
                    message: "Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            authorization: state.authorization,
            result: { status: "failed" },
            message: "Failed to revoke authorization."
        }

    }

}