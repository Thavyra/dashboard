import { Suspense } from "react";
import CreateButton from "./CreateButton";
import { Applications, ApplicationsSkeleton } from "./Applications";

export default function Page() {
    return (
        <>
            <div className="mt-8 mb-8 sm:flex sm:justify-between">
                <h2 className="text-center mt-8 text-xl font-light mb-3 sm:m-0">My Applications</h2>
                <CreateButton />
            </div>

            <Suspense fallback={<ApplicationsSkeleton />}>
                <Applications />
            </Suspense>
        </>
    )
}