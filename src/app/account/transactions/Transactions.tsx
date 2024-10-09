import { auth, signIn } from "@/auth"
import { fetchTransactionsByUser } from "@/data/account"
import { Transaction } from "@/models/Transaction"
import { Suspense } from "react"
import ApplicationName from "./ApplicationName"

export async function Transactions() {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchTransactionsByUser(session)

    switch (result.status) {
        case "success":
            return <Loaded transactions={result.transactions} />
        default:
            throw new Error()
    }
}

function Loaded({ transactions }: { transactions: Transaction[] }) {
    return (
        <div className="flex flex-col gap-3">
            {
                transactions.map(transaction => {
                    const isDeduction = transaction.amount < 0

                    return (
                        <div key={transaction.id} className="rounded border border-dark-700 p-3">
                            <div className="flex flex-row">
                                <Suspense fallback={<div className="py-2 w-40 rounded bg-dark-900 animate-pulse"></div>}>
                                    <ApplicationName transaction={transaction} />
                                </Suspense>
                                <div className="ml-3 my-auto">{transaction.description}</div>
                                <div className={`${isDeduction ? "text-negative" : "text-positive"} text-lg font-bold ml-auto`}>
                                    {isDeduction ? "-" : "+"}&#8366;{Math.abs(transaction.amount)}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export function TransactionsSkeleton() {
    return (
        <>Loading transactions...</>
    )
}