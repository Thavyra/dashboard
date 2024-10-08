"use server"

import { auth } from "@/auth"
import { patchBackend } from "@/data/fetch"
import Application from "@/models/Application"
import { z } from "zod"

export interface UpdateApplicationState {
    id: string
    name: string
    description: string | null

    result?: { status: "success" } | { status: "failed" }
    message?: string
    errors?: {
        name?: string[]
        description?: string[]
    }
}

const UpdateApplicationValidator = z.object({
    name: z.string()
        .min(1)
        .max(40),
    description: z.string()
        .max(400)
        .optional()
})

export async function updateApplication(state: UpdateApplicationState, formData: FormData): Promise<UpdateApplicationState> {
    const session = await auth()

    if (!session) {
        return {
            id: state.id,
            name: state.name,
            description: state.description,
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
            name: state.name,
            description: state.description,
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
                return {
                    id: state.id,
                    name: response.data.name,
                    description: response.data.description,
                    result: { status: "success" }
                }

            case 400:
                return {
                    id: state.id,
                    name: state.name,
                    description: state.description,
                    result: { status: "failed" },
                    errors: {
                        name: response.errors.filter(x => x.name === "name").map(x => x.reason),
                        description: response.errors.filter(x => x.name === "description").map(x => x.reason)
                    }
                }

            default:
                return {
                    id: state.id,
                    name: state.name,
                    description: state.description,
                    result: { status: "failed" },
                    message: "Uh oh! Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            id: state.id,
            name: state.name,
            description: state.description,
            result: { status: "failed" },
            message: "Failed to update application."
        }

    }
}