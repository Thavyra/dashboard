import { getCurrentUser } from "@/actions/account"
import { UsernameForm } from "./forms"

export default async function Account() {
    "use server"

    const user = await getCurrentUser()

    return (
        <>
            <UsernameForm username={user.username} />
        </>
    )
}