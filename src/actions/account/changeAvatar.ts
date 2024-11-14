"use server"

import { auth } from "@/auth"
import { putBackend } from "@/data/fetch"
import { revalidatePath, revalidateTag } from "next/cache"
import { z } from "zod"

export interface ChangeAvatarState {
    userId: string
    cacheVersion?: string
    result?: { status: "success" } | { status: "failed" }
    errors?: string[]
    message?: string
}

export async function changeAvatar(state: ChangeAvatarState, formData: FormData): Promise<ChangeAvatarState> {
    const session = await auth()

    if (!session) {
        return {
            userId: state.userId,
            cacheVersion: state.cacheVersion,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validator = z.object({
        avatar: z.instanceof(File)
            .refine(file => file.size < 10 * 1024 * 1024)
    })

    const validationResult = validator.safeParse({
        avatar: formData.get("avatar")
    })

    if (!validationResult.success) {
        return {
            userId: state.userId,
            cacheVersion: state.cacheVersion,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors.avatar
        }
    }

    const data = new FormData()
    data.set("avatar", validationResult.data.avatar)

    try {

        const response = await putBackend(session, `/users/${state.userId}/avatar`, data)

        switch (response.status) {
            case 201:
                revalidateTag(`avatars:${state.userId}`)
                revalidatePath(`/avatars/${state.userId}`)

                return {
                    userId: state.userId,
                    cacheVersion: Math.random().toString(5).substring(2, 9),
                    result: { status: "success" }
                }
            case 400:
                return {
                    userId: state.userId,
                    cacheVersion: state.cacheVersion,
                    result: { status: "failed" },
                    errors: response.errors.map(x => x.reason)
                }
            default:
                return {
                    userId: state.userId,
                    cacheVersion: state.cacheVersion,
                    result: { status: "failed" },
                    message: "Uh oh! Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            userId: state.userId,
            cacheVersion: state.cacheVersion,
            result: { status: "failed" },
            message: "Failed to upload avatar."
        }

    }
}
