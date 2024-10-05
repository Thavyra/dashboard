"use server"

import Redirect from "@/models/Redirect"
import { fetchWithAuth } from "./fetch"
import { z } from "zod"

export async function getRedirects(id: string) {
    const response = await fetchWithAuth(`/applications/${id}/redirects`)

    const data = await response.json()

    return data as Redirect[]
}

export async function deleteRedirect(redirect: Redirect) {
    const response = await fetchWithAuth(`/applications/${redirect.application_id}/redirects/${redirect.id}`, {
        method: "DELETE"
    })
}

export interface CreateRedirectState {
    id?: string
    applicationId: string
    uri?: string

    result?: "success" | "failed"
    errors?: string[]
}

export async function createRedirect(prevState: CreateRedirectState, formData: FormData): Promise<CreateRedirectState> {
    const schema = z.object({
        uri: z.string()
            .url()
    })

    const validationResult = schema.safeParse({
        uri: formData.get("create")
    })

    if (!validationResult.success) {
        return {
            ...prevState,
            result: "failed",
            errors: validationResult.error.flatten().fieldErrors.uri
        }
    }

    const data = validationResult.data

    const response = await fetchWithAuth(`/applications/${prevState.applicationId}/redirects`, {
        method: "POST",
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

    const redirect = await response.json() as Redirect

    return {
        id: redirect.id,
        applicationId: redirect.application_id,
        uri: redirect.uri,
        result: "success"
    }
}