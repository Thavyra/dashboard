import { auth } from "@/auth";
import { fetchApplicationById } from "@/data/application";
import { notFound, redirect } from "next/navigation";
import DetailsForm from "./DetailsForm";
import { Suspense } from "react";
import DeleteApplicationButton from "./DeleteApplicationButton";

export default function ApplicationInfo({ applicationId }: { applicationId: string }) {
    return (
        <Suspense>
            <ApplicationInfo_ applicationId={applicationId} />
        </Suspense>
    )
}

async function ApplicationInfo_({ applicationId }: { applicationId: string }) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchApplicationById(session, applicationId)

    switch (result.status) {
        case "success":
            return (
                <div className="grow">
                    <DetailsForm application={result.application} />
                    <div className="flex flex-row md:justify-end mt-3">
                        <DeleteApplicationButton application={result.application} className="w-full sm:w-auto" />
                    </div>
                </div>

            )
        case "notfound":
            return notFound()
        default:
            return redirect("/dashboard/dev/applications")
    }
}
