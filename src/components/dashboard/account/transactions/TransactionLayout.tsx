import { DateTime } from "luxon";
import { ReactNode } from "react";

export interface TransactionLayoutProps {
    children: ReactNode
    timestamp: DateTime
    amount: number
    isDeduction: boolean
}

export default function TransactionLayout({ children, timestamp, amount, isDeduction }: TransactionLayoutProps) {
    return (
        <div className="rounded border border-dark-700 p-3">
            <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center">
                {children}


                <div className="flex items-center lg:ml-auto">
                    <div className={`${isDeduction ? "text-negative" : "text-positive"} text-lg font-bold`}>
                        {isDeduction ? "-" : "+"}&#8366;{Math.abs(amount)}
                    </div>
                    <div className="ml-3 lg:w-40 text-right">
                        {timestamp.toRelative()}
                    </div>
                </div>

            </div>
        </div>
    )
}