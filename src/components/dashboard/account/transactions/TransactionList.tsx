import { auth } from "@/auth";
import { fetchTransactionsByUser } from "@/data/account";
import TransactionInfo from "./TransactionInfo";
import { Suspense } from "react";
import TransferInfo from "./TransferInfo";

export default function TransactionList() {
    return (
        <Suspense>
            <TransactionList_ />
        </Suspense>
    )
}

async function TransactionList_() {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchTransactionsByUser(session)

    if (result.status !== "success") {
        return null
    }

    return (
        <div className="flex flex-col gap-3">
            {result.transactions.map(transaction => {
                return transaction.is_transfer
                    ? <TransferInfo key={transaction.id} transfer={transaction} currentUser={session.user?.id} />
                    : <TransactionInfo key={transaction.id} transaction={transaction} />
            })}
        </div>
    )
}