import { auth, signIn } from "@/auth";
import { fetchCurrentUser } from "@/data/account";
import User from "@/models/User";

export async function Balance() {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchCurrentUser(session)

    switch (result.status) {
        case "success":
            return <Loaded user={result.user} />
    }
}

function Loaded({ user }: { user: User }) {
    return (
        <div className="flex justify-center">
            <div className="rounded border border-dark-700 p-3 text-lg font-light">
                Current Balance:
                {" "}
                <span className="font-bold">&#8366;{user.balance}</span>
            </div>
        </div>
    )
}

export function BalanceSkeleton() {
    return (
        <div className="flex justify-center">
            <div className="rounded border border-dark-700 p-3 text-lg font-light">
                <span className="mr-14">Current Balance:</span>
            </div>
        </div>
    )
}