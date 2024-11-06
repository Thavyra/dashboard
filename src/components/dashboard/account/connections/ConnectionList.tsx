import { auth } from "@/auth";
import { fetchAuthorizationsByUser } from "@/data/account";
import ConnectionInfo from "./ConnectionInfo";
import { Suspense } from "react";

export default function ConnectionList() {
    return (
        <Suspense>
            <ConnectionList_ />
        </Suspense>
    )
}

async function ConnectionList_() {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchAuthorizationsByUser(session)

    if (result.status != "success") {
        return null
    }

    return (
        <div className="flex flex-col gap-3">
            {result.authorizations.map(authorization => {
                return (
                    <ConnectionInfo key={authorization.id} authorization={authorization} />
                )
            })}
        </div>
    )
}