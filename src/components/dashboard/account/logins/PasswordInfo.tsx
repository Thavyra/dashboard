import { Suspense } from "react";
import LoginInfo from "./LoginInfo";
import { auth } from "@/auth";
import { fetchLoginsByUser } from "@/data/account";
import ChangePasswordForm from "./ChangePasswordForm";
import CreatePasswordForm from "./CreatePasswordForm";

export default function PasswordInfo() {
    return (
        <LoginInfo color="cautious" header={
            <h4 className="text-cautious text-lg font-bold">Password</h4>
        }>
            <Suspense>
                <PasswordInfo_ />
            </Suspense>
        </LoginInfo>
    )
}

async function PasswordInfo_() {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchLoginsByUser(session)

    if (result.status !== "success") {
        return null
    }

    const password = result.logins.find(x => x.type === "password")

    return password
        ? <ChangePasswordForm password={password} />
        : <CreatePasswordForm />
}
