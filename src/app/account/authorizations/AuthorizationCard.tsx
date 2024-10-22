import { auth, signIn } from "@/auth";
import Button from "@/components/Button";
import { fetchApplicationById } from "@/data/application";
import Application from "@/models/Application";
import { Authorization } from "@/models/Authorization";
import DeleteButton from "./DeleteButton";

export async function AuthorizationCard({ authorization }: { authorization: Authorization }) {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchApplicationById(session, authorization.application_id)

    switch (result.status) {
        case "success":
            return <Loaded authorization={authorization} application={result.application} />
    }
}

function Loaded({ authorization, application }: { authorization: Authorization, application: Application }) {
    return (
        <div className="rounded border border-dark-700 p-3 mb-3">
            <div className="flex justify-between">
                <div>
                    {application.name}
                </div>

                <DeleteButton authorization={authorization} />
            </div>
            <div className="text-sm">{application.description}</div>
        </div>
    )
}

export function AuthorizationSkeleton({ authorization }: { authorization: Authorization }) {
    return (
        <div className="rounded border border-dark-700 p-3 mb-3">
            <div className="flex justify-between">
                <div className="h-6 w-40 rounded bg-dark-900 animate-pulse"></div>

                <Button design="negative">Revoke</Button>
            </div>

        </div>
    )
}