import LoginInfo from "./LoginInfo"

import githubMark from "./github-mark-white.png"
import githubLogo from "./GitHub_Logo_White.png"
import Image from "next/image"
import { Suspense } from "react"
import { auth } from "@/auth"
import { fetchLoginsByUser } from "@/data/account"
import { DateTime } from "luxon"
import { linkProvider } from "@/actions/account/linkProvider"
import Button from "@/components/Button"

export interface GitHubInfoProps {
    error?: {
        description?: string
    }
}

export default function GitHubInfo({ error }: GitHubInfoProps) {
    return (
        <LoginInfo className="border-bright" header={
            <h4 className="flex flex-row items-center gap-1 text-bright text-lg font-bold">
                <Image src={githubMark} alt="GitHub Logo" className="inline h-6 w-6" />
                <Image src={githubLogo} alt="GitHub" className="inline h-7 w-auto" />
            </h4>
        }>
            <Suspense>
                <GitHubInfo_ error={error} />
            </Suspense>
        </LoginInfo>
    )
}

async function GitHubInfo_({ error }: GitHubInfoProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchLoginsByUser(session)

    if (result.status !== "success") {
        return null
    }

    const login = result.logins.find(x => x.type === "github")

    return login

        ? <div className="flex flex-row items-center">
            <Image src={login.provider_avatar_url} height={128} width={128} alt="GitHub Avatar" className="h-6 w-6 mr-1" />
            <span className="text-bright font-semibold mr-3">{login.provider_username}</span>
            Last used {DateTime.fromISO(login.used_at).toRelativeCalendar()}.
        </div>

        : <div className="flex flex-row items-center justify-between">
            {error
                ? <span className="text-negative">{error.description ?? "Failed to link GitHub account."}</span>
                : <span>No account linked.</span>
            }

            <form action={async () => {
                "use server"
                await linkProvider("github")
            }}>
                <Button type="submit" className="text-base">Add</Button>
            </form>
        </div>
}
