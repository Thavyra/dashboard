import User from "@/models/User"
import { env } from "next-runtime-env"

export function decodeUriUsername(param: string): {
    isValid: true
    username: string
} | {
    isValid: false
} {
    const decoded = decodeURIComponent(param)

    if (!decoded.startsWith("@")) {
        return {isValid: false}
    }

    const username = decoded.slice(1)

    return {
        isValid: true,
        username
    }
}

export async function fetchUserByName(username: string): Promise<User | "NotFound"> {
    const response = await fetch(`${env("THAVYRA_API_URL")}/users/@${username}`, {
        cache: 'no-cache'
    })

    if (response.ok) {
        return await response.json() as User
    }

    return "NotFound"
}
