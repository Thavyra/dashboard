import Image from "next/image";
import LoginInfo from "./LoginInfo";

import discordLogo from "./discord-logo-blue.png"
import { Suspense } from "react";
import { auth } from "@/auth";
import { fetchLoginsByUser } from "@/data/account";
import { DateTime } from "luxon";
import { linkProvider } from "@/actions/account/linkProvider";
import Button from "@/components/Button";

export interface DiscordInfoProps {
    error?: {
        description?: string
    }
}

export default function DiscordInfo({ error }: DiscordInfoProps) {
    return (
        <LoginInfo className="border-[#5865F2]" header={
            <h4 className="text-[#5865F2] text-lg font-bold">
                <Image src={discordLogo} alt="Discord" className="h-6 w-auto" />
            </h4>
        }>
            <Suspense>
                <DiscordInfo_ error={error} />
            </Suspense>
        </LoginInfo>
    )
}

async function DiscordInfo_({ error }: DiscordInfoProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchLoginsByUser(session)

    if (result.status !== "success") {
        return null
    }

    const login = result.logins.find(x => x.type === "discord")

    return login
    
        ? <div className="flex flex-row items-center">
            <Image src={login.provider_avatar_url} height={128} width={128} alt="Discord Avatar" className="h-6 w-6 mr-1" />
            <span className="text-bright font-semibold mr-3">{login.provider_username}</span>
            Last used {DateTime.fromISO(login.used_at).toRelativeCalendar()}.
        </div>

        : <div className="flex flex-row items-center justify-between">
            <div>
                {error
                    ? <span className="text-negative">{error.description ?? "Failed to link Discord account."}</span>
                    : <span>No account linked.</span>
                }
            </div>
            <form action={async () => {
                "use server"
                await linkProvider("discord")
            }}>
                <Button type="submit" className="text-base">Add</Button>
            </form>
        </div>
}