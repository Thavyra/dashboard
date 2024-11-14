import { auth } from "@/auth";
import User from "@/models/User";
import Link from "next/link";
import { Suspense } from "react";

export interface EditProfileLinkProps {
    user: User
}

export default function EditProfileLink({ user }: EditProfileLinkProps) {
    return (
        <Suspense>
            <EditProfileLink_ user={user} />
        </Suspense>
    )
}

async function EditProfileLink_({ user }: EditProfileLinkProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    if (session.user?.id !== user.id) {
        return null
    }

    return (
        <Link href="/dashboard/account" className="transition text-link hover:text-link-hover hover:underline">Edit Profile</Link>
    )
}
