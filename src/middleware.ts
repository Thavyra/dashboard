import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((request) => {

    const { pathname } = request.nextUrl

    if (!pathname.startsWith("/dashboard")) {
        return NextResponse.next()
    }

    if (!request.auth) {
        const url = new URL("/auth/login", request.nextUrl.origin)
        return Response.redirect(url)
    }

    if (request.auth.error === "RefreshTokenError") {
        const url = new URL("/auth/login", request.nextUrl.origin)

        url.searchParams.set("prompt", "none")

        return Response.redirect(url)
    }
})