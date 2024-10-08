import { Suspense } from "react"
import { Details, DetailsSkeleton } from "./Details"

export default async function Account() {
    return (
        <>
            <Suspense fallback={<DetailsSkeleton />}>
                <Details />
            </Suspense>
        </>
    )
}