import { Suspense } from "react";
import { Transactions, TransactionsSkeleton } from "./Transactions";
import { Balance, BalanceSkeleton } from "./Balance";

export default function Page() {
    return (
        <>
            <Suspense fallback={<BalanceSkeleton />}>
                <Balance />
            </Suspense>
            <hr className="border-dark-700 my-6" />
            <Suspense fallback={<TransactionsSkeleton />}>
                <Transactions />
            </Suspense>
        </>
    )
}