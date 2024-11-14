export type Login = PasswordLogin | DiscordLogin | GitHubLogin

export type PasswordLogin = {
    type: "password"
    id: string
    used_at: string
    changed_at: string
}

export type DiscordLogin = {
    type: "discord"
    id: string
    provider_username: string
    provider_avatar_url: string 
    used_at: string
}

export type GitHubLogin = {
    type: "github"
    id: string
    provider_username: string
    provider_avatar_url: string
    used_at: string
}