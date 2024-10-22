"use server"

import { auth } from "@/auth"
import { patchBackend } from "@/data/fetch"
import Application from "@/models/Application"
import Permission from "@/models/Permission"
import { revalidateTag } from "next/cache"
import { z } from "zod"

export interface UpdateApplicationState {
    id: string
    name: string
    description: string | null
    permissions: Permission[]

    result?: { status: "success" } | { status: "failed" }
    message?: string
    errors?: {
        name?: string[]
        description?: string[]
        permissions?: string[]
    }
}

const zodCheckbox = () => z.literal("on").or(z.literal(false)).default(false)

const UpdateApplicationValidator = z.object({
    name: z.string()
        .min(1)
        .max(40),
    description: z.string()
        .max(400)
        .optional(),
    permissions: z.object({
        "scp:account.profile": zodCheckbox(),
        "scp:account.profile.read": zodCheckbox(),
        "scp:account.transactions": zodCheckbox(),
        "scp:applications": zodCheckbox(),
        "scp:applications.read": zodCheckbox(),
        "scp:transactions": zodCheckbox()
    })
})

export async function updateApplication(state: UpdateApplicationState, formData: FormData): Promise<UpdateApplicationState> {
    const session = await auth()

    if (!session) {
        return {
            id: state.id,
            name: state.name,
            description: state.description,
            permissions: state.permissions,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = UpdateApplicationValidator.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        permissions: Object.fromEntries(Array.from(formData.entries())
            .filter(x => x[0].startsWith("permission:"))
            .map(x => [x[0].slice("permission:".length), x[1]]))
    })

    if (!validationResult.success) {
        return {
            id: state.id,
            name: state.name,
            description: state.description,
            permissions: state.permissions,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const permissions = Object.entries(validationResult.data.permissions)

    const request = {
        name: validationResult.data.name,
        description: validationResult.data.description === "" ? null : validationResult.data.description,
        permissions: {
            grant: permissions.filter(x => x[1] === "on").map(x => x[0]),
            deny: permissions.filter(x => !x[1]).map(x => x[0])
        }
    }

    try {

        const response = await patchBackend<Application>(session, `/applications/${state.id}`, request)

        switch (response.status) {
            case 200:
                revalidateTag(`application:${state.id}:permissions`)

                return {
                    id: state.id,
                    name: response.data.name,
                    description: response.data.description,
                    permissions: response.data.permissions ?? [],
                    result: { status: "success" }
                }

            case 400:
                return {
                    id: state.id,
                    name: state.name,
                    description: state.description,
                    permissions: state.permissions,
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
                    permissions: state.permissions,
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
            permissions: state.permissions,
            result: { status: "failed" },
            message: "Failed to update application."
        }

    }
}