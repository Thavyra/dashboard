import { auth } from "@/auth"
import { fetchApplicationById, fetchApplicationsByUser } from "@/data/application"
import { Suspense } from "react"
import ApplicationSelectorDropdown from "./ApplicationSelectorDropdown"

export interface ApplicationSelectorProps {
    currentApplication: string
}

export default function ApplicationSelector({ currentApplication }: ApplicationSelectorProps) {
    return (
        <Suspense>
            <ApplicationSelector_ currentApplication={currentApplication} />
        </Suspense>
    )
}

async function ApplicationSelector_({ currentApplication }: ApplicationSelectorProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    const applicationResult = await fetchApplicationById(session, currentApplication)

    if (applicationResult.status !== "success") {
        return null
    }

    const listResult = await fetchApplicationsByUser(session)

    if (listResult.status !== "success") {
        return null
    }

    return (
        <ApplicationSelectorDropdown
            application={applicationResult.application}
            userApplications={listResult.applications} />
    )
}
