import User from "@/models/User";
import { Session } from "next-auth";
import { getBackend } from "./fetch";
import { Transaction, Transfer } from "@/models/Transaction";
import { Authorization } from "@/models/Authorization";
import { Login } from "@/models/Login";
import { Scope } from "@/models/Scope";

export async function fetchUserById(session: Session, userId?: string): Promise<{
    status: "success"
    user: User
} | {
    status: "failed"
}> {
    const response = await getBackend<User>(session, `/users/${userId ?? session.user?.id}`)

    switch (response.status) {
        case 200:
            return { status: "success", user: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchUserByName(username: string): Promise<User | "NotFound"> {
    const response = await fetch(`${process.env.THAVYRA_API_URL}/users/@${username}`, {
        cache: 'no-cache'
    })

    if (response.ok) {
        return await response.json() as User
    }

    return "NotFound"
}

export async function fetchLoginsByUser(session: Session): Promise<{
    status: "success"
    logins: Login[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Login[]>(session, `/users/${session.user?.id}/logins`)

    switch (response.status) {
        case 200:
            return { status: "success", logins: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchTransactionsByUser(session: Session): Promise<{
    status: "success"
    transactions: (Transaction | Transfer)[]
} | {
    status: "failed"
}> {
    const response = await getBackend<(Transaction | Transfer)[]>(session, `/users/${session.user?.id}/transactions`)

    switch (response.status) {
        case 200:
            return { status: "success", transactions: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchAuthorizationsByUser(session: Session): Promise<{
    status: "success"
    authorizations: Authorization[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Authorization[]>(session, `/users/${session.user?.id}/authorizations`, {
        next: {
            tags: [`users:${session.user?.id}:authorizations`]
        }
    })

    switch (response.status) {
        case 200:
            return { status: "success", authorizations: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchScopesByAuthorization(session: Session, authorization: Authorization): Promise<{
    status: "success"
    scopes: Scope[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Scope[]>(session, `/authorizations/${authorization.id}/scopes`)

    switch (response.status) {
        case 200:
            return { status: "success", scopes: response.data }
        default:
            return { status: "failed" }
    }
}
