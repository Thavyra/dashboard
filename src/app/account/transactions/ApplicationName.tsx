import { auth, signIn } from "@/auth";
import { fetchApplicationById } from "@/data/application";
import { Transaction } from "@/models/Transaction";

export default async function ApplicationName({transaction}: {transaction: Transaction}) {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchApplicationById(session, transaction.application_id)

    switch (result.status) {
        case "success":
            return <h4 className="text-lg">{result.application.name}</h4>
        case "notfound":
            return <h4 className="text-dark-600 text-lg">Unknown</h4>
        default:
            return <h4 className="text-negative text-lg">Could not Load</h4>
    }
}