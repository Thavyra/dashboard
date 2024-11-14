import EditProfileLink from "@/components/profile/EditProfileLink"
import { decodeUriUsername, fetchUserByName } from "@/data/profile"
import { DateTime } from "luxon"
import Image from "next/image"
import Link from "next/link"

export default async function ProfileTitle({ params }: { params: { username: string } }) {
    const decodeResult = decodeUriUsername(params.username)

    if (!decodeResult.isValid) {
        return null
    }

    const user = await fetchUserByName(decodeResult.username)

    if (user === "NotFound") {
        return (
            <h1 className="text-xl sm:text-3xl text-bright font-semibold">Not Found</h1>
        )
    }

    return (
        <div className="flex items-center">
            <Image src={`/avatars/${user.id}`} alt="Avatar" width={500} height={500}
                className="size-12 sm:size-16 mr-2 sm:mr-3 rounded-full" />
            <div className="min-w-0">
                <Link href={`/@${user.username}`} title={user.username!}>
                    <h1 className="text-xl sm:text-3xl text-bright font-semibold truncate">
                        {user.username}
                    </h1>
                </Link>

                <div className="text-sm sm:text-base">
                    Joined {DateTime.fromISO(user.created_at).toRelative()}
                    {" "}
                    <EditProfileLink user={user} />
                </div>
            </div>
        </div>
    )
}