"use server"

import { auth } from "@/auth"
import { patchBackend, putBackend } from "@/data/fetch"
import Application from "@/models/Application"
import { revalidateTag } from "next/cache"
import { z } from "zod"

export interface UpdatePermissionsState {
    applicationId: string
    currentPermissions: string[]
    result?: { status: "success" } | { status: "failed" }
    message?: string
    errors?: {
        "scp:account.profile"?: string[]
        "scp:account.profile.read"?: string[]
        "scp:account.transactions"?: string[]
        "scp:applications"?: string[]
        "scp:applications.read"?: string[]
        "scp:transactions"?: string[]
    }
}

const zodCheckbox = () => z.literal("on").or(z.literal(false)).default(false)

const PermissionValidator = z.object({
    "scp:account.profile": zodCheckbox(),
    "scp:account.profile.read": zodCheckbox(),
    "scp:account.transactions": zodCheckbox(),
    "scp:applications": zodCheckbox(),
    "scp:applications.read": zodCheckbox(),
    "scp:transactions": zodCheckbox()
})

export async function updatePermissions(state: UpdatePermissionsState, formData: FormData): Promise<UpdatePermissionsState> {
    const session = await auth()

    if (!session) {
        return {
            applicationId: state.applicationId,
            currentPermissions: state.currentPermissions,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    const validationResult = PermissionValidator.safeParse(Object.fromEntries(formData))

    if (!validationResult.success) {
        return {
            applicationId: state.applicationId,
            currentPermissions: state.currentPermissions,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const permissions = Object.entries(validationResult.data)

    const request = {
        permissions: {
            grant: permissions.filter(x => x[1] === "on").map(x => x[0]),
            deny: permissions.filter(x => !x[1]).map(X => X[0])
        }
    }

    console.log(request)

    try {

        const response = await patchBackend<Application>(session, `/applications/${state.applicationId}`, request)

        switch (response.status) {
            case 200:
                revalidateTag(`application:${state.applicationId}:permissions`)

                return {
                    applicationId: state.applicationId,
                    currentPermissions: response.data.permissions?.map(x => x.name) ?? [],
                    result: { status: "success" }
                }

            default:
                return {
                    applicationId: state.applicationId,
                    currentPermissions: state.currentPermissions,
                    result: { status: "failed" },
                    message: "Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            applicationId: state.applicationId,
            currentPermissions: state.currentPermissions,
            result: { status: "failed" },
            message: "Failed to update permissions."
        }

    }
}
