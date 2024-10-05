import { Suspense } from "react";
import Details from "./Details";
import { getApplicationById } from "@/actions/applications";

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Details application={await getApplicationById(params.id)} />
            </Suspense>
        </>
    )
}