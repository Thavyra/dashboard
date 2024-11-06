import { Transaction } from "@/models/Transaction";
import ApplicationTitle from "./ApplicationTitle";

export default function TransactionInfo({ transaction }: { transaction: Transaction }) {
    const isDeduction = transaction.amount < 0

    return (
        <div className="rounded border border-dark-700 p-3">
            <div className="flex flex-row items-center">
                <ApplicationTitle transaction={transaction} />
                <div className="ml-3">{transaction.description}</div>
                <div className={`${isDeduction ? "text-negative" : "text-positive"} text-lg font-bold ml-auto`}>
                    {isDeduction ? "-" : "+"}&#8366;{Math.abs(transaction.amount)}
                </div>
            </div>
        </div>
    )
}