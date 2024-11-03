import { auth } from "@/auth"
import { fetchCurrentUser } from "@/data/account"
import User from "@/models/User"
import { signIn } from "next-auth/react"
import UsernameForm from "./UsernameForm"
import DescriptionForm from "./DescriptionForm"
import InputText from "@/components/forms/InputText"
import Button from "@/components/Button"
import InputTextArea from "@/components/forms/InputTextArea"

export async function Details() {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchCurrentUser(session)

    switch (result.status) {
        case "success":
            return <Loaded user={result.user} />
        default:
            throw new Error()
    }
}

function Loaded({ user }: { user: User }) {
    return (
        <div className="lg:w-3/4 xl:w-1/2">
            <div className="mb-3">
                <UsernameForm username={user.username ?? ""} />
            </div>
            <div className="mb-3">
                <DescriptionForm description={user.description} />
            </div>
        </div>
    )
}

export function DetailsSkeleton() {
    return (
        <div className="lg:w-3/4 xl:w-1/2">
            <div className="mb-3">
                <label>Username</label>
                <div className="sm:flex sm:flex-row">
                    <InputText disabled className="mb-3 sm:mb-0" />
                    <Button disabled className="w-full sm:w-auto sm:ml-3">Change</Button>
                </div>
            </div>
            <div className="mb-3">
                <div className="mb-3">
                    <label>Description</label>
                    <InputTextArea disabled rows={4} />
                </div>
                <Button disabled className="w-full sm:w-auto">Save</Button>
            </div>
        </div>
    )
}