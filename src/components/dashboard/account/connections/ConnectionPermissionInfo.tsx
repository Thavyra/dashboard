import { auth } from "@/auth";
import { fetchScopesByAuthorization } from "@/data/account";
import { Authorization } from "@/models/Authorization";
import { Suspense } from "react";

export interface ConnectionPermissionInfoProps {
    authorization: Authorization
}

export default function ConnectionPermissionInfo({ authorization }: ConnectionPermissionInfoProps) {
    return (
        <div className="my-3">
            <h4 className="text-lg font-semibold">Permissions:</h4>
            <div className="p-4 rounded-lg bg-dark-900 shadow-lg">
                <Suspense>
                    <ConnectionPermissionInfo_ authorization={authorization} />
                </Suspense>
            </div>
        </div>

    )
}

async function ConnectionPermissionInfo_({ authorization }: ConnectionPermissionInfoProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchScopesByAuthorization(session, authorization)

    if (result.status !== "success") {
        return null
    }

    return (
        <ul className="ml-4 list-disc list-outside">
            {result.scopes.map(scope => {
                return (
                    <li>{scope.description}</li>
                )
            })}
        </ul>
    )
}
