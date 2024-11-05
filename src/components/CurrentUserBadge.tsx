import { auth } from "@/auth";
import { fetchCurrentUser } from "@/data/account";
import Image from "next/image";

export default async function CurrentUserBadge() {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchCurrentUser(session)

    if (result.status !== "success") {
        return null
    }

    const user = result.user

    return (
        <span className="inline-flex flex-row text-bright">
            <Image src={`/avatars/${user.id}`} alt="Avatar" height={128} width={128} className="rounded-full mr-2 h-6 w-6" />
            {user.username ?? session.user?.name}
        </span>
    )
}