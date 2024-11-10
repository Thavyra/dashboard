import { Transfer } from "@/models/Transaction";
import TransactionLayout from "./TransactionLayout";
import UserTitle from "./UserTitle";
import { DateTime } from "luxon";

export interface TransferInfoProps {
    transfer: Transfer
    currentUser?: string
}

export default function TransferInfo({ transfer, currentUser }: TransferInfoProps) {
    const isDeduction = transfer.amount > 0 && transfer.subject_id === currentUser

    return (
        <TransactionLayout timestamp={DateTime.fromISO(transfer.created_at)} amount={transfer.amount} isDeduction={isDeduction}>
            <UserTitle transfer={transfer} />
            <div className="ml-3">
                {transfer.description}
            </div>
        </TransactionLayout>
    )
}