import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export async function linkProvider(provider: "discord" | "github") {
    const url = new URL(await signIn("thavyra", { redirect: false }, {
        response_type: "none",
        scope: "link_provider",
        provider
    }))

    const redirectUri = new URL(url.searchParams.get("redirect_uri") ?? "")
    redirectUri.pathname = "/dashboard/account"
    url.searchParams.set("redirect_uri", redirectUri.href)

    url.searchParams.delete("code_challenge")
    url.searchParams.delete("code_challenge_method")

    return redirect(url.href)
}