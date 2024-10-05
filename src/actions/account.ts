"use server"

import { fetchWithAuth } from "@/actions/fetch"
import { auth } from "@/auth"
import User from "@/models/User"
import { signIn } from "next-auth/react"
import { revalidateTag } from "next/cache"
import { z } from "zod"

export async function getCurrentUser() {
    const session = await auth()

    if (!session) {
        await signIn()
    }

    const response = await fetchWithAuth(`/users/${session?.user.accountId}`, {
        next: {
            tags: [`users/${session?.user.accountId}`]
        }
    })

    const data = await response.json()

    return data as User
}

export interface ChangeUsernameState {
    currentUsername: string
    result?: "success" | "failed"
    errors?: string[]
}

export async function changeUsername(prevState: ChangeUsernameState, formData: FormData): Promise<ChangeUsernameState> {

    const schema = z.object({
        username: z.string()
            .min(1)
            .max(40)
            .regex(/^[a-zA-Z0-9_\-\'\.]+$/)
    })

    const validationResult = schema.safeParse({
        username: formData.get("username")
    })

    if (!validationResult.success) {
        return {
            ...prevState,
            result: "failed",
            errors: validationResult.error.flatten().fieldErrors.username
        }
    }

    const data = validationResult.data

    if (data.username === prevState.currentUsername) {
        return {
            ...prevState,
            errors: undefined,
            result: undefined
        }
    }

    const response = await fetchWithAuth("/users/@me", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errors = await response.json() as ErrorResponse

        return {
            ...prevState,
            result: "failed",
            errors: errors.errors.map(x => x.reason)
        }
    }

    const user = await response.json() as User

    revalidateTag(`users/${user.id}`)

    return {
        currentUsername: user.username,
        result: "success"
    }
}

export interface ChangeDescriptionState {
    currentDescription: string | null
    result?: "success" | "failed"
    errors?: string[]
}

export async function changeDescription(prevState:ChangeDescriptionState, formData: FormData): Promise<ChangeDescriptionState> {
    const schema = z.object({
        description: z.string()
            .max(400)
            .optional()
    })

    const validationResult = schema.safeParse({
        description: formData.get("description")
    })

    if (!validationResult.success){
        return {
            ...prevState,
            result: "failed",
            errors: validationResult.error.flatten().fieldErrors.description
        }
    }

    const data = {
        description: validationResult.data.description === "" ? null : validationResult.data.description
    }

    const response = await fetchWithAuth("/users/@me", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errors = await response.json() as ErrorResponse

        return {
            ...prevState,
            result: "failed",
            errors: errors.errors.map(x => x.reason)
        }
    }

    const user = await response.json() as User

    revalidateTag(`users/${user.id}`)

    return {
        currentDescription: user.description,
        result: "success"
    }
}