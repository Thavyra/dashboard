import { Suspense } from "react";
import Redirects from "./Redirects";
import { ClientId, ClientIdSkeleton } from "./ClientId";
import ClientSecret from "./ClientSecret";
import CreateForm from "./CreateForm";

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <h3 className="text-center sm:text-left text-xl font-light mb-3">Client Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-3">
                <div className="md:border-r md:border-dark-700">
                    <Suspense fallback={<ClientIdSkeleton />}>
                        <ClientId applicationId={params.id} />
                    </Suspense>
                </div>
                <div>
                    <ClientSecret applicationId={params.id} />
                </div>
            </div>

            <h3 className="text-center sm:text-left text-xl font-light mb-3">Redirects</h3>

            <Suspense fallback={<p>Loading redirects...</p>}>
                <Redirects applicationId={params.id} />
            </Suspense>

            <CreateForm applicationId={params.id} />
        </>
    )
}