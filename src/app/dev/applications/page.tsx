import { Suspense } from "react";
import CreateButton from "./CreateButton";
import { Applications, ApplicationsSkeleton } from "./Applications";

export default function Page() {
    return (
        <>
            <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                <h2 className="mb-3 sm:mb-0 text-center text-2xl font-light">My Applications</h2>
                <CreateButton />
            </div>

            <hr className="border-dark-700 my-4" />

            <Suspense fallback={<ApplicationsSkeleton />}>
                <Applications />
            </Suspense>
        </>
    )
}