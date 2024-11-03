"use server"

import { auth } from "@/auth"
import { getBackend, patchBackend } from "@/data/fetch"
import User from "@/models/User"
import { z } from "zod"

export interface ChangeUsernameState {
    username: string
    result?: { status: "success" } | { status: "failed" }
    message?: string
    errors?: {
        username?: string[]
    }
}

const UsernameValidator = z.object({
    username: z.string()
        .min(1)
        .max(40)
        .regex(/^[a-zA-Z0-9_\-\'\.]+$/)
})

export async function validateUsername(username: string, currentUsername: string): Promise<{valid?: boolean, errors?: string[]}> {
    if (currentUsername === username) {
        return { }
    }

    const validationResult = UsernameValidator.safeParse({ username })

    if (!validationResult.success) {
        return {
            valid: false,
            errors: validationResult.error.flatten().fieldErrors.username
        }
    }

    const session = await auth()

    if (!session) {
        return {
            valid: false,
            errors: ["Not authenticated."]
        }
    }

    const response = await getBackend(session, `/users/@${validationResult.data.username}`)

    switch (response.status) {
        case 404:
            return { valid: true }
        case 200:
            return { valid: false, errors: [`${validationResult.data.username} is not available!`] }
        default:
            return { }
    }


}

export async function changeUsername(state: ChangeUsernameState, formData: FormData): Promise<ChangeUsernameState> {
    const session = await auth()

    if (!session) {
        return {
            username: state.username,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = UsernameValidator.safeParse({
        username: formData.get("username")
    })

    if (!validationResult.success) {
        return {
            username: state.username,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    if (request.username === state.username) {
        return {
            username: state.username
        }
    }

    try {

        const response = await patchBackend<User>(session, `/users/${session.user?.id}`, request)

        switch (response.status) {
            case 200:
                return {
                    username: response.data.username!,
                    result: { status: "success" }
                }
            case 400:
                return {
                    username: state.username,
                    result: { status: "failed" },
                    errors: {
                        username: response.errors.map(x => x.reason)
                    }
                }
            default:
                return {
                    username: state.username,
                    result: { status: "failed" },
                    message: "Oh blast! Failed to update username..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            username: state.username,
            result: { status: "failed" },
            message: "Failed to update username."
        }

    }
}