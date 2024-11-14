import { Transaction } from "@/models/Transaction";
import ApplicationTitle from "./ApplicationTitle";
import TransactionLayout from "./TransactionLayout";
import { DateTime } from "luxon";

export interface TransactionInfoProps {
    transaction: Transaction
}

export default function TransactionInfo({ transaction }: TransactionInfoProps) {
    const isDeduction = transaction.amount < 0

    return (
        <TransactionLayout timestamp={DateTime.fromISO(transaction.created_at)} amount={transaction.amount} isDeduction={isDeduction}>
            <ApplicationTitle transaction={transaction} />
            <div className="ml-3">
                {transaction.description}
            </div>
        </TransactionLayout>
    )
}