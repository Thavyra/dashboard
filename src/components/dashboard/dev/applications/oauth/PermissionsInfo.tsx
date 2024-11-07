import { auth } from "@/auth"
import PermissionsForm from "./PermissionsForm"
import { fetchPermissionsByApplication } from "@/data/application"
import { Suspense } from "react"

export default function PermissionsInfo({ applicationId }: { applicationId: string }) {
    return (
        <section>
            <h3 className="text-2xl font-light mb-2">Permissions</h3>
            <p className="mb-4 font-light">For extra security it's best to only enable the permissions your application will need! 
                Make sure to include them in the scope parameter of your authorisation request.</p>
            <Suspense fallback={<Skeleton applicationId={applicationId} />}>
                <PermissionsInfo_ applicationId={applicationId} />
            </Suspense>
        </section>
    )
}

function Skeleton({ applicationId }: { applicationId: string }) {
    return (
        <PermissionsForm disabled applicationId={applicationId} currentPermissions={[]} />
    )
}

async function PermissionsInfo_({ applicationId }: { applicationId: string }) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchPermissionsByApplication(session, applicationId)

    if (result.status !== "success") {
        return null
    }

    const permissions = result.permissions.map(x => x.name)

    return (
        <PermissionsForm applicationId={applicationId} currentPermissions={permissions} />
    )
}
