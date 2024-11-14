"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"
import Redirect from "@/models/Redirect"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export interface AddRedirectState {
    applicationId: string
    result?: { status: "success", redirect: Redirect } | { status: "failed" }
    message?: string
    errors?: {
        uri?: string[]
    }
}

const RedirectValidator = z.object({
    uri: z.string()
        .min(1, "Required")
        .url("Not a valid URI")
})

export async function addRedirect(state: AddRedirectState, formData: FormData): Promise<AddRedirectState> {
    const session = await auth()

    if (!session) {
        return {
            applicationId: state.applicationId,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = RedirectValidator.safeParse({
        uri: formData.get("uri")
    })

    if (!validationResult.success) {
        return {
            applicationId: state.applicationId,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    try {

        const response = await postBackend<Redirect>(session, `/applications/${state.applicationId}/redirects`, request)

        switch (response.status) {
            case 201:

                revalidatePath(`/dev/applications/${state.applicationId}/oauth`)

                return {
                    applicationId: state.applicationId,
                    result: {
                        status: "success",
                        redirect: response.data
                    }
                }

            case 400:
                return {
                    applicationId: state.applicationId,
                    result: { status: "failed" },
                    errors: {
                        uri: response.errors.map(x => x.reason)
                    }
                }

            default:
                return {
                    applicationId: state.applicationId,
                    result: { status: "failed" },
                    message: "Something went wrong!"
                }
        }

    } catch (error) {

        console.error(error)

        return {
            applicationId: state.applicationId,
            result: { status: "failed" },
            message: "Failed to add redirect."
        }

    }
}