import { Session } from "next-auth";
import { getBackend } from "./fetch";
import Application from "@/models/Application";
import Redirect from "@/models/Redirect";

export async function fetchApplicationsByUser(session: Session): Promise<{
    status: "success"
    applications: Application[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Application[]>(session, `/users/${session.user?.id}/applications`)

    switch (response.status) {
        case 200:
            return { status: "success", applications: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchApplicationById(session: Session, id: string): Promise<{
    status: "success"
    application: Application
} | {
    status: "notfound"
} | {
    status: "failed"
}> {
    const response = await getBackend<Application>(session, `/applications/${id}`)

    switch (response.status) {
        case 200:
            return { status: "success", application: response.data }
        case 404:
            return { status: "notfound" }
        default:
            return { status: "failed" }
    }
}

export async function fetchRedirectsByApplication(session: Session, applicationId: string): Promise<{
    status: "success"
    redirects: Redirect[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Redirect[]>(session, `/applications/${applicationId}/redirects`, {
        next: {
            tags: [`application:${applicationId}:redirects`]
        }
    })

    switch (response.status) {
        case 200:
            return { status: "success", redirects: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchPermissionsByApplication(session: Session, applicationId: string): Promise<{
    status: "success"
    permissions: string[]
} | {
    status: "failed"
}> {
    const response = await getBackend<string[]>(session, `/applications/${applicationId}/permissions`, {
        next: {
            tags: [`application:${applicationId}:permissions`]
        }
    })

    switch (response.status) {
        case 200:
            return { status: "success", permissions: response.data }
        default:
            return { status: "failed" }
    }
}