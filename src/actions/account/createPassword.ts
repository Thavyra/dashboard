"use server"

import { auth } from "@/auth"
import { putBackend } from "@/data/fetch"
import { PasswordLogin } from "@/models/Login"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export interface CreatePasswordState {
    result?: { status: "success" } | { status: "failed" }
    message?: string
    errors?: {
        password?: string[]
        confirmPassword?: string[]
    }
}

const CreatePasswordValidator = z
    .object({
        password: z.string()
            .min(8)
            .max(100),
        confirmPassword: z.string().min(1, "Required")
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"]
    })

export async function createPassword(state: CreatePasswordState, formData: FormData): Promise<CreatePasswordState> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = CreatePasswordValidator.safeParse({
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    })

    if (!validationResult.success) {
        return {
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    try {

        const response = await putBackend<PasswordLogin>(session, `/users/${session.user?.id}/logins/@password`, request)

        switch (response.status) {
            case 200:
                revalidatePath("/account")

                return {
                    result: { status: "success" }
                }

            case 400:
                return {
                    result: { status: "failed" },
                    errors: {
                        password: response.errors.filter(x => x.name === "password").map(x => x.reason)
                    }
                }

            default:
                return {
                    result: { status: "failed" },
                    message: "Uh oh! Something went wrong..."
                }
        }

    } catch (error) {

        console.log(error)

        return {
            result: { status: "failed" },
            message: "Failed to create password."
        }

    }
}