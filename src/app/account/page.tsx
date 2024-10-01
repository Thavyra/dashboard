import { getCurrentUser } from "@/actions/account"
import UsernameForm from "./UsernameForm"
import DescriptionForm from "./DescriptionForm"

export default async function Account() {
    "use server"

    const user = await getCurrentUser()

    return (
        <>
            <div className="lg:w-3/4 xl:w-1/2">
                <UsernameForm username={user.username} />
                <DescriptionForm description={user.description} />
            </div>
        </>
    )
}