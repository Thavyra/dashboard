import { auth } from "@/auth";
import { fetchCurrentUser } from "@/data/account";
import { Suspense } from "react";
import UsernameForm from "./UsernameForm";
import DescriptionForm from "./DescriptionForm";

export default function ProfileInfo() {
    return (
        <Suspense>
            <ProfileInfo_ />
        </Suspense>
    )
}

async function ProfileInfo_() {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchCurrentUser(session)

    if (result.status !== "success") {
        return null
    }

    const user = result.user

    return (
        <div className="grow">
            <div className="mb-3">
                <UsernameForm username={user.username ?? ""} />
            </div>
            <div>
                <DescriptionForm description={user.description} />
            </div>
        </div>
    )
}