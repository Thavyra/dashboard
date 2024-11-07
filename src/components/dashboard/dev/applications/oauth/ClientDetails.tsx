import { auth } from "@/auth";
import { fetchApplicationById } from "@/data/application";
import { Suspense } from "react";
import ClientSecretInfo from "./ClientSecretInfo";
import ClientIdInfo from "./ClientIdInfo";
import Button from "@/components/Button";

export default function ClientDetails({ applicationId }: { applicationId: string }) {
    return (
        <section>
            <h3 className="text-2xl font-light mb-3">Client Details</h3>

            <div className="p-5 rounded-lg bg-dark-900 shadow-md">
                <div className="flex flex-row gap-3">
                    <Suspense fallback={<Skeleton />}>
                        <ClientDetails_ applicationId={applicationId} />
                    </Suspense>
                </div>
            </div>

        </section>
    )
}

function Skeleton() {
    return (
        <>
            <div className="basis-full md:basis-1/2 xl:basis-1/3 md:border-r md:border-dark-700">
                <h4 className="text-lg">Client ID</h4>
                <div className="inline-block w-1 h-4 py-0.5 px-1"></div>
                <Button disabled className="text-sm mt-1">Copy</Button>
            </div>
            <div className="basis-full md:basis-1/2 xl:basis-1/3">
                <h4 className="text-lg">Client Secret</h4>
                <div className="inline-block w-1 h-4 py-0.5 px-1"></div>
                <Button disabled className="text-sm mt-1">Reset</Button>
            </div>
        </>
    )
}

async function ClientDetails_({ applicationId }: { applicationId: string }) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchApplicationById(session, applicationId)

    switch (result.status) {
        case "success":
            return (
                <>
                    <ClientIdInfo application={result.application} />
                    <ClientSecretInfo application={result.application} />
                </>
            )
    }
}