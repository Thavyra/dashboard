import { Suspense } from "react"
import { Details, DetailsSkeleton } from "./Details"
import { Providers } from "./Providers"
import AvatarInfo from "@/components/dashboard/account/profile/AvatarInfo"

export default async function Account({ searchParams }: {
    searchParams: {
        error?: "link_discord_error" | "link_github_error" | "access_denied"
        error_description?: string
    }
}) {
    return (
        <div className="sm:flex sm:flex-row">
            <div className="me-3">
                <AvatarInfo />
            </div>
            <div className="flex-grow">
                <Suspense fallback={<DetailsSkeleton />}>
                    <Details />
                </Suspense>

                <h2 className="text-xl font-light mb-3">Logins</h2>

                <Suspense>
                    <Providers errors={searchParams} />
                </Suspense>

                <div className="mb-3"></div>
            </div>
        </div>
    )
}