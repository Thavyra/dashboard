import { Suspense } from "react";
import ClientDetails from "./ClientDetails";
import Redirects from "./Redirects";
import { getApplicationById } from "@/actions/applications";

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <h3 className="text-center sm:text-left text-xl font-light mb-3">Client Details</h3>

            <Suspense fallback={<p>Loading...</p>}>
                <ClientDetails id={params.id} />
            </Suspense>

            <h3 className="text-center sm:text-left text-xl font-light my-3">Redirects</h3>

            <Suspense fallback={<p>Loading redirects...</p>}>
                <Redirects id={params.id} />
            </Suspense>
        </>
    )
}