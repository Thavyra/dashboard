import { Suspense } from "react";
import ApplicationList from "./ApplicationList";
import CreateButton from "./CreateButton";

export default function Page() {
    return (
        <>
            <div className="mt-8 mb-3 sm:flex sm:justify-between">
                <h2 className="text-center mt-8 text-xl font-light mb-3 sm:m-0">My Applications</h2>
                <CreateButton />
            </div>

            <Suspense fallback={<p>Loading applications...</p>}>
                <ApplicationList />
            </Suspense>
        </>
    )
}