import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { decodeUriUsername, fetchUserByName } from "@/data/profile";
import ProfileDescription from "@/components/profile/ProfileDescription";

type Props = { params: { username: string } }

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const decodeResult = decodeUriUsername(params.username)

    if (!decodeResult.isValid) {
        const resolved = await parent
        return {
            title: resolved.title
        }
    }

    const user = await fetchUserByName(decodeResult.username)

    if (user === "NotFound") {
        return {
            title: "Profile Not Found"
        }
    }

    return {
        title: `@${user.username} · Thavyra`,
        description: user.description,
        openGraph: {
            title: `@${user.username}`,
            type: "profile",
            images: `/avatars/${user.id}`,
            url: `https://thavyra.xyz/@${user.username}`,
            siteName: "Thavyra"
        }
    }
}

export default async function Page({ params }: Props) {
    const decodeResult = decodeUriUsername(params.username)

    if (!decodeResult.isValid) {
        notFound()
    }

    const user = await fetchUserByName(decodeResult.username)

    if (user === "NotFound") {
        return (
            <p>Profile not found.</p>
        )
    }

    return (
        <ProfileDescription user={user} />
    )
}
