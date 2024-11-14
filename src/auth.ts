import NextAuth, { type DefaultSession } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { env } from "next-runtime-env";
import { NextResponse } from "next/server";

declare module "next-auth" {
    interface User {
    }

    interface Session {
        error?: "RefreshTokenError",
        access_token: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accountId: string
        access_token: string
        expires_at: number
        refresh_token?: string
        error?: "RefreshTokenError"
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: env("AUTH_SECRET"),

    basePath: "/auth/internal",
    
    pages: {
        signIn: "/auth/login"
    },
    
    providers: [{
        id: "thavyra",
        name: "Thavyra",
        type: "oidc",

        issuer: env("AUTH_THAVYRA_ISSUER"),
        clientId: env("AUTH_THAVYRA_ID"),
        clientSecret: env("AUTH_THAVYRA_SECRET"),

        authorization: {
            params: {
                scope: "openid sudo account applications authorizations"
            }
        }
    }],

    callbacks: {

        async jwt({ token, account, profile }) {

            if (account) { // First time login

                return {
                    ...token,

                    accountId: account.providerAccountId,
                    sub: account.providerAccountId,
                    name: profile?.name,
                    picture: profile?.picture,

                    access_token: account.access_token!,
                    expires_at: account.expires_at!
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

            session.user.id = token.accountId
            session.user.name = token.name
            session.user.image = token.picture

            return session
        },

    }
})