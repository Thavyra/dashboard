"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"
import Application from "@/models/Application"
import { z } from "zod"

export interface CreateApplicationState {
    result?: { status: "success", id: string } | { status: "failed" }
    message?: string
    errors?: {
        name?: string[]
    }
}

const CreateApplicationValidator = z.object({
    name: z.string()
        .min(1)
        .max(40),
    type: z.enum(["native", "web"])
})

export async function createApplication(state: CreateApplicationState, formData: FormData): Promise<CreateApplicationState> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = CreateApplicationValidator.safeParse({
        name: formData.get("name"),
        type: formData.get("type")
    })

    if (!validationResult.success) {
        return {
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    try {

        const response = await postBackend<Application>(session, "/applications", request)

        switch (response.status) {
            case 201:
                return {
                    result: {
                        status: "success",
                        id: response.data.id
                    }
                }

            case 400:
                return {
                    result: { status: "failed" },
                    errors: {
                        name: response.errors.filter(x => x.name === "name").map(x => x.reason)
                    }
                }
                
            default:
                return {
                    result: { status: "failed" },
                    message: "Whoops, something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: { status: "failed" },
            message: "Failed to create application."
        }

    }
}