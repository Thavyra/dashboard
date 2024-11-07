import { auth } from "@/auth"
import { fetchRedirectsByApplication } from "@/data/application"
import EditRedirectForm from "./EditRedirectForm"
import { Suspense } from "react"
import CreateRedirectForm from "./CreateRedirectForm"

export default function RedirectList({ applicationId }: { applicationId: string }) {
    return (
        <section>
            <h3 className="text-2xl font-light mb-3">Redirects</h3>
            <div className="flex flex-col gap-3">
                <Suspense>
                    <RedirectList_ applicationId={applicationId} />
                </Suspense>
                <CreateRedirectForm applicationId={applicationId} />
            </div >
        </section>
    )
}

async function RedirectList_({ applicationId }: { applicationId: string }) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchRedirectsByApplication(session, applicationId)

    if (result.status !== "success") {
        return null
    }

    return result.redirects.map(redirect => {
        return (
            <EditRedirectForm key={redirect.id} redirect={redirect} />
        )
    })
}
