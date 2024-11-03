import User from "@/models/User";
import { Session } from "next-auth";
import { getBackend } from "./fetch";
import { Transaction } from "@/models/Transaction";
import { Authorization } from "@/models/Authorization";
import { Login } from "@/models/Login";

export async function fetchCurrentUser(session: Session): Promise<{
    status: "success"
    user: User
} | {
    status: "failed"
}> {
    const response = await getBackend<User>(session, `/users/${session.user.accountId}`)

    switch (response.status) {
        case 200:
            return { status: "success", user: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchLoginsByUser(session: Session): Promise<{
    status: "success"
    logins: Login[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Login[]>(session, `/users/${session.user.accountId}/logins`)

    switch (response.status) {
        case 200:
            return { status: "success", logins: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchTransactionsByUser(session: Session): Promise<{
    status: "success"
    transactions: Transaction[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Transaction[]>(session, `/users/${session.user.accountId}/transactions`)

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
    const response = await getBackend<Authorization[]>(session, `/users/${session.user.accountId}/authorizations`, {
        next: {
            tags: [`users:${session.user.accountId}:authorizations`]
        }
    })

    switch (response.status) {
        case 200:
            return { status: "success", authorizations: response.data }
        default:
            return { status: "failed" }
    }
}
