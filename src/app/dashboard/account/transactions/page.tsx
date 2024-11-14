import BalanceInfo from "@/components/dashboard/account/transactions/BalanceInfo";
import TransactionList from "@/components/dashboard/account/transactions/TransactionList";

export default function Page() {
    return (
        <>
            <span>
                <h2 className="block md:inline md:border-r border-dark-700 pr-3 mr-3 font-light text-3xl">Transactions</h2>
                <span className="text-2xl">
                    <BalanceInfo />
                </span>
            </span>
            <hr className="border-dark-700 my-5" />
            <TransactionList />
        </>

    )
}