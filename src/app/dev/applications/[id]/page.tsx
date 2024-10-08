import { Suspense } from "react";
import { Details, DetailsSkeleton } from "./Details";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <div className="mb-3">
                <Suspense fallback={<DetailsSkeleton />}>
                    <Details applicationId={params.id} />
                </Suspense>
            </div>
        </>
    )
}

