import { auth, signIn } from "@/auth";
import Button from "@/components/Button";
import { fetchAuthorizationsByUser } from "@/data/account";
import { Authorization } from "@/models/Authorization";
import { AuthorizationCard, AuthorizationSkeleton } from "./AuthorizationCard";
import { Suspense } from "react";

export async function Authorizations() {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchAuthorizationsByUser(session)

    switch (result.status) {
        case "success":
            return <Loaded authorizations={result.authorizations} />
        default:
            return null
    }
}

function Loaded({ authorizations }: { authorizations: Authorization[] }) {
    return (
        <>
            {authorizations.map(authorization => {
                return (
                    <Suspense key={authorization.id} fallback={<AuthorizationSkeleton authorization={authorization} />}>
                        <AuthorizationCard authorization={authorization} />
                    </Suspense>
                )
            })}
        </>
    )
}