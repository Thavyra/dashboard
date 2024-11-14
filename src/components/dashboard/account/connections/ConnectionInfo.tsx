import { auth } from "@/auth";
import Button from "@/components/Button";
import { fetchApplicationById } from "@/data/application";
import { Authorization } from "@/models/Authorization";
import Image from "next/image";
import RevokeForm from "./RevokeForm";
import { Suspense } from "react";
import { DateTime } from "luxon";
import ConnectionPermissionInfo from "./ConnectionPermissionInfo";

export default function ConnectionInfo({ authorization }: { authorization: Authorization }) {
    return (
        <div className="rounded border border-dark-700 p-3">
            <Suspense fallback={<Skeleton />}>
                <ConnectionInfo_ authorization={authorization} />
            </Suspense>
        </div>
    )
}

function Skeleton() {
    return (
        <div className="flex flex-row items-center gap-3">
            <div className="grow h-8 rounded bg-dark-700 animate-pulse"></div>
            <Button appearance="negative" disabled>Revoke</Button>
        </div>
    )
}

async function ConnectionInfo_({ authorization }: { authorization: Authorization }) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchApplicationById(session, authorization.application_id)

    switch (result.status) {
        case "success":
            return (
                <>
                    <div className="flex flex-row items-center">
                        <Image src={`/application_icons/${result.application.id}`} alt={`${result.application.name} Icon`} 
                        width={500} height={500} className="rounded-full w-8 h-8 mr-2" />
                        <div className="font-semibold text-bright text-lg">
                            {result.application.name}
                        </div>
                        <RevokeForm authorization={authorization} />
                    </div>

                    <hr className="border-dark-700 my-3" />

                    {result.application.description}

                    <ConnectionPermissionInfo authorization={authorization} />

                    <div className="font-semibold">Authorised {DateTime.fromISO(authorization.created_at).toRelative()}</div>

                    
                </>
            )
        default:
            return (
                <>
                    <div className="flex flex-row items-center">
                        <div className="font-semibold text-lg">
                            Unknown Application
                        </div>
                        <RevokeForm authorization={authorization} />
                    </div>
                </>
            )
    }
}
