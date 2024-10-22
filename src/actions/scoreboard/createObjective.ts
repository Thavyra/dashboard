"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"
import Objective from "@/models/Objective"
import { revalidatePath, revalidateTag } from "next/cache"
import { z } from "zod"

export interface CreateObjectiveState {
    applicationId: string
    result?: { status: "success", objective: Objective } | { status: "failed" }
    message?: string
    errors?: {
        name?: string[]
        displayName?: string[]
    }
}

const ObjectiveValidator = z.object({
    name: z.string()
        .min(1)
        .max(40)
        .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9.]*[a-zA-Z0-9])?$/),

    displayName: z.string()
        .min(1)
        .max(40)
})

export async function createObjective(state: CreateObjectiveState, formData: FormData): Promise<CreateObjectiveState> {
    const session = await auth()

    if (!session) {
        return {
            applicationId: state.applicationId,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = ObjectiveValidator.safeParse({
        name: formData.get("name"),
        displayName: formData.get("displayName")
    })

    if (!validationResult.success) {
        return {
            applicationId: state.applicationId,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = {
        name: validationResult.data.name,
        display_name: validationResult.data.displayName
    }

    try {

        const response = await postBackend<Objective>(session, `/applications/${state.applicationId}/objectives`, request)

        switch (response.status) {
            case 201:

                revalidateTag(`applications:${state.applicationId}:objectives`)
                revalidatePath(`/dev/applications/${state.applicationId}/scoreboard`)

                return {
                    applicationId: state.applicationId,
                    result: {
                        status: "success",
                        objective: response.data
                    }
                }

            case 400:
                return {
                    applicationId: state.applicationId,
                    result: { status: "failed" },
                    errors: {
                        name: response.errors.filter(x => x.name === "name").map(x => x.reason),
                        displayName: response.errors.filter(x => x.name === "display_name").map(x => x.reason)
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
            message: "Failed to create objective."
        }

    }
}