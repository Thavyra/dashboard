"use server"

import { auth } from "@/auth";
import { deleteBackend } from "@/data/fetch";
import Redirect from "@/models/Redirect";
import { revalidatePath, revalidateTag } from "next/cache";

export interface DeleteRedirectState {
    redirect: Redirect
    result?: { status: "success" } | { status: "failed" }
    message?: string
}

export async function deleteRedirect(state: DeleteRedirectState, formData: FormData): Promise<DeleteRedirectState> {
    const session = await auth()

    if (!session) {
        return {
            redirect: state.redirect,
            result: { status: "success" },
            message: "Authentication failed."
        }
    }

    try {
        const response = await deleteBackend(session, `/applications/${state.redirect.application_id}/redirects/${state.redirect.id}`)

        switch (response.status) {
            case 204:

                revalidateTag(`applications:${state.redirect.application_id}:redirects`)
                revalidatePath(`/dev/applications/${state.redirect.application_id}/oauth`)

                return {
                    redirect: state.redirect,
                    result: { status: "success" }
                }
                
            default:
                return {
                    redirect: state.redirect,
                    result: { status: "failed" },
                    message: "Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            redirect: state.redirect,
            result: { status: "failed" },
            message: "Failed to delete redirect."
        }

    }

}