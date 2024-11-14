import DiscordInfo from "@/components/dashboard/account/logins/DiscordInfo"
import GitHubInfo from "@/components/dashboard/account/logins/GitHubInfo"
import PasswordInfo from "@/components/dashboard/account/logins/PasswordInfo"

export default function Page({ searchParams }: {
    searchParams: {
        error?: "link_discord_error" | "link_github_error" | "access_denied"
        error_description?: string
    }
}) {
    return (
        <div>
            <h2 className="text-3xl font-light">Logins</h2>

            <hr className="border-dark-700 my-5" />

            <section className="flex flex-col gap-3">

                <PasswordInfo />

                <DiscordInfo error={searchParams.error === "link_discord_error"
                    ? { description: searchParams.error_description } : undefined} />

                <GitHubInfo error={searchParams.error === "link_github_error"
                    ? { description: searchParams.error_description } : undefined} />

            </section>
        </div>

    )
}