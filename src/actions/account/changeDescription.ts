"use server"

import { auth } from "@/auth"
import { patchBackend } from "@/data/fetch"
import User from "@/models/User"
import { z } from "zod"

export interface ChangeDescriptionState {
    description: string | null
    result?: { status: "success" } | { status: "failed" }
    message?: string
    errors?: {
        description?: string[]
    }
}

const DescriptionValidator = z.object({
    description: z.string()
        .max(400)
        .optional()
})

export async function changeDescription(state: ChangeDescriptionState, formData: FormData): Promise<ChangeDescriptionState> {
    const session = await auth()

    if (!session) {
        return {
            description: state.description,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = DescriptionValidator.safeParse({
        description: formData.get("description")
    })

    if (!validationResult.success) {
        return {
            description: state.description,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = {
        description: validationResult.data.description === "" ? null : validationResult.data.description
    }

    try {

        const response = await patchBackend<User>(session, `/users/${session.user.accountId}`, request)

        switch (response.status) {
            case 200:
                return {
                    description: response.data.description,
                    result: { status: "success" }
                }

            case 400:
                return {
                    description: state.description,
                    result: { status: "failed" },
                    errors: {
                        description: response.errors.map(x => x.reason)
                    }
                }

            default:
                return {
                    description: state.description,
                    result: { status: "failed" },
                    message: "Something went wrong!"
                }
        }

    } catch (error) {

        console.error(error)

        return {
            description: state.description,
            result: { status: "failed" },
            message: "Failed to change description."
        }

    }
}