import { auth } from "@/auth";
import { fetchUserById } from "@/data/account";
import Link from "next/link";
import { Suspense } from "react";

export interface ViewProfileLinkProps {
    className?: string
}

export default function ViewProfileLink(props: ViewProfileLinkProps) {
    return <Suspense>
        <ViewProfileLink_ {...props} />
    </Suspense>
}

async function ViewProfileLink_({ className }: ViewProfileLinkProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchUserById(session)

    if (result.status !== "success") {
        return null
    }

    return (
        <Link href={`/@${result.user.username}`} className={`${className} transition text-link hover:text-link-hover text-xl`}>
            View Profile
        </Link>
    )
}