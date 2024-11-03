"use server"

import { auth } from "@/auth"
import { putBackend } from "@/data/fetch"
import { PasswordLogin } from "@/models/Login"
import { z } from "zod"

export interface ChangePasswordState {
    changedAt: string
    result?: { status: "success" } | { status: "failed" }
    message?: string
    errors?: {
        password?: string[]
        confirmPassword?: string[]
        currentPassword?: string[]
    }
}

const ChangePasswordValidator = z
    .object({
        currentPassword: z.string().min(1, "Required"),
        password: z.string()
            .min(8)
            .max(100),
        confirmPassword: z.string().min(1, "Required")
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword", "password"]
    })

export async function changePassword(state: ChangePasswordState, formData: FormData): Promise<ChangePasswordState> {
    const session = await auth()

    if (!session) {
        return {
            changedAt: state.changedAt,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = ChangePasswordValidator.safeParse({
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        currentPassword: formData.get("currentPassword")
    })

    if (!validationResult.success) {
        return {
            changedAt: state.changedAt,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = {
        current_password: validationResult.data.currentPassword,
        password: validationResult.data.password
    }

    try {

        const response = await putBackend<PasswordLogin>(session, `/users/${session.user.accountId}/logins/@password`, request)

        switch (response.status) {
            case 200:
                return {
                    changedAt: response.data.changed_at,
                    result: { status: "success" }
                }

            case 400:
                return {
                    changedAt: state.changedAt,
                    result: { status: "failed" },
                    errors: {
                        password: response.errors.filter(x => x.name === "password").map(x => x.reason),
                        currentPassword: response.errors.filter(x => x.name === "current_password").map(x => x.reason)
                    }
                }

            default:
                return {
                    changedAt: state.changedAt,
                    result: { status: "failed" },
                    message: "Uh oh! Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            changedAt: state.changedAt,
            result: { status: "failed" },
            message: "Failed to change password."
        }

    }
}
