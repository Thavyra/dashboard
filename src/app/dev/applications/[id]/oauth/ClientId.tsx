import { auth, signIn } from "@/auth";
import Button from "@/components/Button";
import CopyButton from "@/components/CopyButton";
import { fetchApplicationById } from "@/data/application";
import Application from "@/models/Application";
import { notFound } from "next/navigation";

export async function ClientId({ applicationId }: { applicationId: string }) {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchApplicationById(session, applicationId)

    switch (result.status) {
        case "success":
            return <Loaded application={result.application} />
        case "notfound":
            notFound()
        default:
            throw new Error()
    }
}

function Loaded({ application }: { application: Application }) {
    return (
        <>
            <h4 className="text-lg">Client ID</h4>
            <div className="font-mono">{application.client_id}</div>
            <CopyButton className="text-sm mt-1" text={application.client_id} />
        </>
    )
}

export function ClientIdSkeleton() {
    return (
        <>
            <h4 className="text-lg">Client ID</h4>
            <div className="inline-block w-52 h-6 py-0.5 px-1"></div>
            <Button disabled className="text-sm mt-1">Copy</Button>
        </>
    )
}