import User from "@/models/User";
import { Session } from "next-auth";
import { getBackend } from "./fetch";

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
