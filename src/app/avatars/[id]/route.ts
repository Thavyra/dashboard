import { env } from "next-runtime-env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const cacheVersion = request.nextUrl.searchParams.get("v")

    const response = await fetch(`${env("THAVYRA_API_URL")}/users/${params.id}/avatar.png`, {
        next: { tags: [`avatars:${params.id}${(cacheVersion ? `:${cacheVersion}` : "")}`] }
    })

    const blob = await response.blob()

    return new NextResponse(blob, { headers: new Headers({ "Content-Type": "image/png" }) })
}