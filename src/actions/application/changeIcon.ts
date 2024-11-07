"use server"

import { auth } from "@/auth"
import { putBackend } from "@/data/fetch"
import { revalidatePath, revalidateTag } from "next/cache"
import { z } from "zod"

export interface ChangeIconState {
    applicationId: string
    cacheVersion?: string
    result?: { status: "success" } | { status: "failed" }
    errors?: string[]
    message?: string
}

export async function changeIcon(state: ChangeIconState, formData: FormData): Promise<ChangeIconState> {
    const session = await auth()

    if (!session) {
        return {
            applicationId: state.applicationId,
            cacheVersion: state.cacheVersion,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validator = z.object({
        icon: z.instanceof(File)
            .refine(file => file.size < 10 * 1024 * 1024)
    })

    const validationResult = validator.safeParse({
        icon: formData.get("icon")
    })

    if (!validationResult.success) {
        return {
            applicationId: state.applicationId,
            cacheVersion: state.cacheVersion,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors.icon
        }
    }

    const data = new FormData()
    data.set("icon", validationResult.data.icon)

    try {

        const response = await putBackend(session, `/applications/${state.applicationId}/icon`, data)

        switch (response.status) {
            case 200:
                return {
                    applicationId: state.applicationId,
                    cacheVersion: Math.random().toString(5).substring(2, 9),
                    result: { status: "success" }
                }
            case 400:
                return {
                    applicationId: state.applicationId,
                    cacheVersion: state.cacheVersion,
                    result: {status: "failed"},
                    errors: response.errors.map(x => x.reason)
                }
            default:
                return {
                    applicationId: state.applicationId,
                    cacheVersion: state.cacheVersion,
                    result: {status: "failed"},
                    message: "Uh oh! Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            applicationId: state.applicationId,
            cacheVersion: state.cacheVersion,
            result: {status: "failed"},
            message: "Failed to upload icon."
        }

    }
}
