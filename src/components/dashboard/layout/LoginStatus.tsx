import { auth, signIn } from "@/auth"
import { fetchCurrentUser } from "@/data/account"
import Image from "next/image"
import { Suspense } from "react"

export default function LoginStatus() {
    return (
        <Suspense fallback={<Skeleton />}>
            <LoginStatus_ />
        </Suspense>
    )
}

function Skeleton() {
    return (
        <div className="flex flex-row gap-2 text-dark-700">
            <div className="rounded-full h-6 w-6 bg-dark-700 animate-pulse"></div>
            Username
        </div>
    )
}

async function LoginStatus_() {
    const session = await auth()

    if (!session) {
        return <LoginButton />
    }

    const result = await fetchCurrentUser(session)

    if (result.status !== "success") {
        return <LoginButton />
    }

    const user = result.user

    return (
        <div className="flex flex-row justify-center gap-2 text-bright">
            <Image src={`/avatars/${user.id}`} alt="Avatar" height={500} width={500} className="rounded-full h-6 w-6" />
            {user.username ?? session.user?.name}
        </div>
    )
}

function LoginButton() {
    return (
        <form action={async () => {
            "use server"
            await signIn("thavyra")
        }}>
            <button type="submit" className="inline">Login</button>
        </form>
    )
}
