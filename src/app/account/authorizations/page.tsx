import { Suspense } from "react";
import { Authorizations } from "./Authorizations";

export default function Page() {
    return (
        <>
            <Suspense fallback={<div>Loading authorizations...</div>}>
                <Authorizations />
            </Suspense>
        </>
    )
}