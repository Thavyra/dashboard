"use server"

import { auth } from "@/auth"
import { putBackend } from "@/data/fetch"

export interface ResetClientSecretState {
    id: string,
    result?: { status: "success", secret: string } | { status: "failed" }
    message?: string
}

export async function resetClientSecret(state: ResetClientSecretState, formData: FormData): Promise<ResetClientSecretState> {
    const session = await auth()

    if (!session) {
        return {
            id: state.id,
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    try {
        const response = await putBackend<{ client_secret: string }>(session, `/applications/${state.id}/client_secret`, {})

        switch (response.status) {
            case 200:
                return {
                    id: state.id,
                    result: { status: "success", secret: response.data.client_secret }
                }

            default:
                return {
                    id: state.id,
                    result: { status: "failed" },
                    message: "Failed to reset client secret."
                }
        }
    } catch (error) {

        console.log(error)

        return {
            id: state.id,
            result: { status: "failed" },
            message: "Failed to reset client secret."
        }

    }




}