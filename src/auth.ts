import NextAuth, { type DefaultSession } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";

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
    basePath: "/auth",
    pages: {
        signIn: "/signin"
    },
    providers: [{
        id: "thavyra",
        name: "Thavyra",
        type: "oidc",

        authorization: {
            params: {
                scope: "openid account.profile applications"
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

            } else if (Date.now() < token.expires_at * 1000) {

                return token

            } else {

                token.error = "RefreshTokenError"
                    return token

            }

        },

        async session({ session, token }) {

            session.access_token = token.access_token
            session.error = token.error

            session.user.id = token.id,
            session.user.username = token.username

            return session
        },

    }
})