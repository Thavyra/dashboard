import { auth, signIn } from "@/auth";
import { fetchLoginsByUser } from "@/data/account";
import { Login } from "@/models/Login";
import Image from "next/image";

import discordLogo from "./discord-logo-blue.png"
import githubLogo from "./GitHub_Logo_White.png"
import githubMark from "./github-mark-white.png"
import Button from "@/components/Button";
import { linkProvider } from "@/actions/account/linkProvider";
import { DateTime, Zone } from "luxon";
import Password from "./Password";
import CreatePassword from "./CreatePassword";

export async function Providers({ errors }: {
    errors: {
        error?: "link_discord_error" | "link_github_error" | "access_denied"
        error_description?: string
    }
}) {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchLoginsByUser(session)

    switch (result.status) {
        case "success":
            return <Loaded logins={result.logins} errors={errors} />
        default:
            throw new Error()
    }
}

function Loaded({ logins, errors }: {
    logins: Login[], errors: {
        error?: "link_discord_error" | "link_github_error" | "access_denied"
        error_description?: string
    }
}) {
    var password = logins.find(x => x.type === "password")
    var discord = logins.find(x => x.type === "discord")
    var github = logins.find(x => x.type === "github")

    return (
        <section className="flex flex-col gap-3 lg:w-3/4 xl:w-1/2">
            <div className="rounded border border-neutral">
                <div className="p-3 border-b border-dark-700">
                    <h4 className="text-neutral text-lg font-bold">Password</h4>
                </div>
                <div className="p-2">
                    {password
                        ? <Password login={password} />
                        : <CreatePassword />
                    }
                </div>
            </div>

            <div className="rounded border border-[#5865F2]">
                <div className="p-3 border-b border-dark-700">
                    <h4 className="text-[#5865F2] text-lg font-bold">
                        <Image src={discordLogo} alt="Discord" className="h-6 w-auto"></Image>
                    </h4>
                </div>
                <div className="p-2">
                    {discord
                        ? <div className="flex flex-row items-center gap-1">
                            <Image src={discord.provider_avatar_url} height={128} width={128} alt="Discord Avatar"
                                className="h-6 w-6"></Image>
                            <span>
                                <span className="text-bright font-semibold mr-3">{discord.provider_username}</span>
                                Last used {DateTime.fromISO(discord.used_at).toRelativeCalendar()}.
                            </span>

                        </div>
                        : <div className="flex flex-row items-center justify-between">
                            <div>
                                {errors.error === "link_discord_error"
                                    ? <span className="text-negative">{errors.error_description ?? "Failed to link Discord account."}</span>
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
                </div>
            </div>

            <div className="rounded border border-bright">
                <div className="p-3 border-b border-dark-700">
                    <h4 className="flex flex-row items-center gap-1 text-bright text-lg font-bold">
                        <Image src={githubMark} alt="GitHub Logo" className="inline h-6 w-6"></Image>
                        <Image src={githubLogo} alt="GitHub" className="inline h-7 w-auto"></Image>
                    </h4>
                </div>
                <div className="p-2">
                    {github
                        ? <div className="flex flex-row items-center gap-1">
                            <Image src={github.provider_avatar_url} height={128} width={128} alt="GitHub Avatar"
                                className="h-6 w-6"></Image>
                            <span>
                                <span className="text-bright font-semibold mr-3">{github.provider_username}</span>
                                Last used {DateTime.fromISO(github.used_at).toRelativeCalendar()}.
                            </span>
                        </div>
                        : <div className="flex flex-row items-center justify-between">
                            {errors.error === "link_github_error"
                                ? <span className="text-negative">{errors.error_description ?? "Failed to link GitHub account."}</span>
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
                </div>
            </div>
        </section>
    )
}