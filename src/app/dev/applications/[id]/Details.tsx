import { auth, signIn } from "@/auth";
import Button from "@/components/Button";
import InputText from "@/components/forms/InputText";
import InputTextArea from "@/components/forms/InputTextArea";
import { fetchApplicationById, fetchPermissionsByApplication } from "@/data/application";
import Application from "@/models/Application";
import { notFound, redirect } from "next/navigation";
import DetailsForm from "./DetailsForm";
import Permission from "@/models/Permission";
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
        </>
    )
}

export async function Details({ applicationId }: { applicationId: string }) {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const applicationResult = await fetchApplicationById(session, applicationId)
    const permissionResult = await fetchPermissionsByApplication(session, applicationId)

    if (applicationResult.status === "success") {
        if (applicationResult.application.owner_id !== session.user?.id
            || permissionResult.status !== "success"
        ) {
            redirect("/dev/applications")
        }

        return <Loaded application={applicationResult.application} permissions={permissionResult.permissions} />
    }

    if (applicationResult.status === "notfound") {
        notFound()
    }

    throw new Error()
}

function Loaded({ application, permissions }: { application: Application, permissions: Permission[] }) {
    return (
        <>
            <DetailsForm application={application} permissions={permissions} />
            <DeleteButton application={application} />
        </>
    )
}

