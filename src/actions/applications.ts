"use server"

import { z } from "zod";
import { fetchWithAuth } from "./fetch";
import Application from "@/models/Application";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function getApplications() {
    const response = await fetchWithAuth("/users/@me/applications")

    const data = await response.json()

    return data as {
        id: string
        name: string
        description: string | null
    }[]
}

export async function getApplicationById(id: string) {
    const response = await fetchWithAuth(`/applications/${id}`, {
        next: {
            tags: [`applications/${id}`]
        }
    })

    const data = await response.json()

    return data as Application
}

export interface CreateApplicationState {
    id?: string
    name: string
    type: string

    result?: "success" | "failed"
    errors?: string[]
}

export async function createApplication(state: CreateApplicationState, formData: FormData): Promise<CreateApplicationState> {
    const schema = z.object({
        name: z.string()
            .min(1)
            .max(40),
        type: z.enum(["native", "web"])
    })

    const validationResult = schema.safeParse({
        name: formData.get("name"),
        type: formData.get("type")
    })

    if (!validationResult.success) {
        return {
            ...state,
            result: "failed",
            errors: validationResult.error.flatten().fieldErrors.name
        }
    }

    const data = validationResult.data

    const response = await fetchWithAuth("/applications", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        next: {
            tags: [`applications/${state.id}`]
        }
    })

    if (!response.ok) {
        const errors = await response.json() as ErrorResponse

        return {
            ...state,
            result: "failed",
            errors: errors.errors.filter(x => x.name === "name").map(x => x.reason)
        }
    }

    const application = await response.json() as Application

    return {
        id: application.id,
        name: application.name,
        type: state.type,
        result: "success"
    }
}

export interface UpdateApplicationState {
    id: string
    name: string
    description: string | null

    result?: "success" | "failed"
    errors?: {
        name?: string[],
        description?: string[]
    }
}

export async function updateApplication(state: UpdateApplicationState, formData: FormData): Promise<UpdateApplicationState> {
    const schema = z.object({
        name: z.string()
            .min(1)
            .max(40),
        description: z.string()
            .max(400)
            .optional()
    })

    const validationResult = schema.safeParse({
        name: formData.get("name"),
        description: formData.get("description")
    })

    if (!validationResult.success) {
        return {
            ...state,
            result: "failed",
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const data = validationResult.data

    if (data.description === "") {
        data.description = undefined
    }

    const response = await fetchWithAuth(`/applications/${state.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        next: {
            tags: [`applications/${state.id}`]
        }
    })

    if (!response.ok) {
        const errors = await response.json() as ErrorResponse

        return {
            ...state,
            result: "failed",
            errors: {
                name: errors.errors.filter(x => x.name === "name").map(x => x.reason),
                description: errors.errors.filter(x => x.name === "description").map(x => x.reason)
            }
        }
    }

    const application = await response.json() as Application

    revalidateTag(`applications/${application.id}`)

    return {
        id: state.id,
        name: application.name,
        description: application.description,
        result: "success"
    }
}

export interface DeleteApplicationState {
    id: string
    name: string
    result?: "success" | "failed"
    errors?: string[]
}

export async function deleteApplication(state: DeleteApplicationState, formData: FormData): Promise<DeleteApplicationState> {
    const schema = z.object({
        name: z.literal(state.name)
    })

    const validationResult = schema.safeParse({
        name: formData.get("name")
    })

    if (!validationResult.success) {
        return {
            ...state,
            result: "failed",
            errors: validationResult.error.flatten().fieldErrors.name
        }
    }

    const response = await fetchWithAuth(`/applications/${state.id}`, {
        method: "DELETE"
    })

    if (!response.ok) {
        const errors = await response.json() as ErrorResponse

        return {
            ...state,
            result: "failed",
            errors: errors.errors.map(x => x.reason)
        }
    }

    revalidateTag(`applications/${state.id}`)

    redirect("/dev/applications")
}