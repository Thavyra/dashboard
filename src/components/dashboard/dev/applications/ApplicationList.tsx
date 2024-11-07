import { auth } from "@/auth";
import { fetchApplicationsByUser } from "@/data/application";
import ApplicationListItem from "./ApplicationListItem";
import { Suspense } from "react";

export default function ApplicationList() {
    return (
        <Suspense>
            <ApplicationList_ />
        </Suspense>
    )
}

async function ApplicationList_() {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchApplicationsByUser(session)

    if (result.status !== "success") {
        return null
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-3">
            {result.applications.map(application => {
                return (
                    <ApplicationListItem key={application.id} application={application} />
                )
            })}
        </div>
    )
}