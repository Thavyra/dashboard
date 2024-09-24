import { auth } from "@/auth";

export async function fetchWithAuth(path: string, init?: RequestInit) {
    const session = await auth()

    return await fetch(`${process.env.THAVYRA_API_URL}${path}`, {
        ...init,
        headers: {
            ...init?.headers,
            "Authorization": `Bearer ${session?.access_token}`
        }
    })
}