import Redirect from "@/models/Redirect";
import { auth, signIn } from "@/auth";
import { fetchRedirectsByApplication } from "@/data/application";
import RedirectForm from "./RedirectForm";

export default async function Redirects({ applicationId }: { applicationId: string }) {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchRedirectsByApplication(session, applicationId)

    switch (result.status) {
        case "success":
            return <Loaded redirects={result.redirects} />
        default:
            throw new Error()
    }
}

export function Loaded({ redirects }: { redirects: Redirect[] }) {
    return (
        <>
            {redirects.map(redirect => {
                return (
                    <RedirectForm key={redirect.id} redirect={redirect} />
                )
            })}
        </>
    )
}


