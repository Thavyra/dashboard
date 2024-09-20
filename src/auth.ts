import NextAuth, { type DefaultSession } from "next-auth";
import { type JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        username: string
    }

    interface Session {
        error?: "RefreshTokenError",
        access_token: string,
        user: {
            username: string
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        username: string
        access_token: string
        expires_at: number
        refresh_token?: string
        error?: "RefreshTokenError"
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [{
        id: "thavyra",
        name: "Thavyra",
        type: "oidc",

        issuer: process.env.OIDC_ISSUER,
        clientId: process.env.OIDC_CLIENT_ID,
        clientSecret: process.env.OIDC_CLIENT_SECRET,

        authorization: {
            params: {
                scope: "openid offline_access account"
            }
        },

        async profile(profile) {
            return {
                ...profile,
                id: profile.sub,
                username: profile.username
            }
        }
    }],

    callbacks: {

        async jwt({ token, account, user }) {

            if (account) { // First time login

                return {
                    ...token,

                    id: user.id!,
                    username: user.username,

                    access_token: account.access_token!,
                    expires_at: account.expires_at!,
                    refresh_token: account.refresh_token
                }
 
            } else if (Date.now() < token.expires_at) {

                return token

            } else {

                if (!token.refresh_token) {
                    throw new TypeError("Missing refresh_token")
                }

                try {

                    const response = await fetch(process.env.OIDC_TOKEN_URL!, {
                        method: "POST",
                        body: new URLSearchParams({
                            client_id: process.env.OIDC_CLIENT_ID!,
                            client_secret: process.env.OIDC_CLIENT_SECRET!,
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token
                        }),
                    })

                    const resultOrError = await response.json()

                    if (!response.ok) {
                        throw resultOrError
                    }

                    const refresh = resultOrError as {
                        access_token: string
                        expires_in: number
                        refresh_token?: string
                    }

                    token.access_token = refresh.access_token
                    token.expires_at = Math.floor(Date.now() / 1000 + refresh.expires_in)

                    if (refresh.refresh_token) {
                        token.refresh_token = refresh.refresh_token
                    }

                    return token

                } catch (error) {

                    console.error("Error refreshing access_token", error)

                    token.error = "RefreshTokenError"
                    return token

                }

            }

        },

        async session({ session, token }) {

            session.access_token = token.access_token
            session.error = token.error

            session.user.id = token.id,
            session.user.username = token.username

            return session
        }

    }
})