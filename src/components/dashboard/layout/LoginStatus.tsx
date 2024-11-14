import { auth, signIn } from "@/auth"
import { fetchUserById } from "@/data/account"
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
        <div className="flex flex-row justify-center gap-2">
            <div className="rounded-full h-6 w-6 bg-dark-700 animate-pulse"></div>
            <div className="h-5 w-20 rounded bg-dark-700 animate-pulse"></div>
        </div>
    )
}

async function LoginStatus_() {
    const session = await auth()

    if (!session) {
        return <LoginButton />
    }

    const result = await fetchUserById(session)

    if (result.status !== "success") {
        return <LoginButton />
    }

    const user = result.user

    return (
        <div className="flex flex-row justify-center gap-2 text-bright">
            <Image src={`/avatars/${user.id}`} alt="Avatar" height={500} width={500} className="rounded-full h-6 w-6" />
            <div className="truncate">
                {user.username ?? session.user?.name}
            </div>

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
