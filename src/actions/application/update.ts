"use server"

import { auth } from "@/auth"
import { patchBackend } from "@/data/fetch"
import Application from "@/models/Application"
import { revalidateTag } from "next/cache"
import { z } from "zod"

export interface UpdateApplicationState {
    id: string

    result?: { status: "success" } | { status: "failed" }
    message?: string
    errors?: {
        name?: string[]
        description?: string[]
    }
}

const UpdateApplicationValidator = z.object({
    name: z.string()
        .min(1, "Required")
        .max(40, "Too long!"),
    description: z.string()
        .max(400, "Too much text!")
        .optional()
})

export async function updateApplication(state: UpdateApplicationState, formData: FormData): Promise<UpdateApplicationState> {
    const session = await auth()

    if (!session) {
        return {
            id: state.id,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = UpdateApplicationValidator.safeParse({
        name: formData.get("name"),
        description: formData.get("description")
    })

    if (!validationResult.success) {
        return {
            id: state.id,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = {
        name: validationResult.data.name,
        description: validationResult.data.description === "" ? null : validationResult.data.description
    }

    try {

        const response = await patchBackend<Application>(session, `/applications/${state.id}`, request)

        switch (response.status) {
            case 200:
                revalidateTag(`application:${state.id}:permissions`)

                return {
                    id: state.id,
                    result: { status: "success" }
                }

            case 400:
                return {
                    id: state.id,
                    result: { status: "failed" },
                    errors: {
                        name: response.errors.filter(x => x.name === "name").map(x => x.reason),
                        description: response.errors.filter(x => x.name === "description").map(x => x.reason)
                    }
                }

            default:
                return {
                    id: state.id,
                    result: { status: "failed" },
                    message: "Uh oh! Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            id: state.id,
            result: { status: "failed" },
            message: "Failed to update application."
        }

    }
}