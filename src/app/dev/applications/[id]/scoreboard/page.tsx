import { Suspense } from "react";
import { Objectives, ObjectivesSkeleton } from "./Objectives";
import CreateObjective from "./CreateObjective";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <CreateObjective applicationId={params.id} />
            <Suspense fallback={<ObjectivesSkeleton />}>
                <Objectives applicationId={params.id} />
            </Suspense>
        </>
    )
}
