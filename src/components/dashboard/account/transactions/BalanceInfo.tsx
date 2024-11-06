import { auth } from "@/auth";
import { fetchCurrentUser } from "@/data/account";
import { Suspense } from "react";

export default function BalanceInfo() {
    return (
        <span>
            Balance

            {" "}

            <Suspense>
                <BalanceInfo_ />
            </Suspense>
        </span>
    )
}

async function BalanceInfo_() {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchCurrentUser(session)

    if (result.status !== "success") {
        return null
    }

    return (
        <span className="font-semibold">&#8366;{result.user.balance}</span>
    )
}