import { auth, signIn } from "@/auth";
import Button from "@/components/Button";
import InputText from "@/components/forms/InputText";
import InputTextArea from "@/components/forms/InputTextArea";
import { fetchApplicationById } from "@/data/application";
import Application from "@/models/Application";
import { notFound } from "next/navigation";
import DetailsForm from "./DetailsForm";
import { DeleteButton } from "./DeleteButton";

export function DetailsSkeleton() {
    return (
        <>
            <div className="mb-3">
                <label className="block mb-1.5">Name</label>
                <InputText disabled className="animate-pulse" />
            </div>

            <div className="mb-3">
                <label className="block mb-1.5">Description</label>
                <InputTextArea disabled rows={4} className="animate-pulse" />
            </div>

            <Button disabled className="w-full mb-3 sm:w-auto">Save</Button>

            <div className="flex flex-row justify-end">
                <Button disabled className="w-full sm:w-auto" design="negative">Delete</Button>
            </div>
        </>
    )
}

export async function Details({ applicationId }: { applicationId: string }) {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchApplicationById(session, applicationId)

    switch (result.status) {
        case "success":
            return <Loaded application={result.application} />
        case "notfound":
            notFound()
        default:
            throw new Error()
    }
}

function Loaded({ application }: { application: Application }) {
    

    return (
        <>
            <DetailsForm application={application} />

            <DeleteButton application={application} />
        </>
    )
}

