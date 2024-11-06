import { auth } from "@/auth";
import { fetchApplicationById } from "@/data/application";
import { Transaction } from "@/models/Transaction";
import Image from "next/image";
import { Suspense } from "react";

export default function ApplicationTitle({ transaction }: { transaction: Transaction }) {
    return (
        <Suspense fallback={<Skeleton />}>
            <ApplicationTitle_ transaction={transaction} />
        </Suspense>
    )
}

function Skeleton() {
    return (
        <div className="py-2 w-40 rounded bg-dark-700 animate-pulse"></div>
    )
}

async function ApplicationTitle_({ transaction }: { transaction: Transaction }) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchApplicationById(session, transaction.application_id)

    switch (result.status) {
        case "success":
            return (
                <>
                    <Image src={`/application_icons/${result.application.id}`} alt="Icon" height={500} width={500} 
                    className="h-8 w-8 mr-2 rounded-full" />

                    <div className="text-lg text-bright font-semibold">{result.application.name}</div>
                </>
            )
        case "notfound":
            return (
                <h4 className="text-lg">Unknown Application</h4>
            )
        default:
            return <h4 className="text-negative text-lg">Load Failed</h4>
    }
}