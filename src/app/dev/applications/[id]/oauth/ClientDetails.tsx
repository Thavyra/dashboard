import { getApplicationById } from "@/actions/applications";
import CopyButton from "@/components/CopyButton";
import { redirect } from "next/navigation";
import ClientSecret from "./ClientSecret";

export default async function ClientDetails({ id }: { id: string }) {
    const application = await getApplicationById(id)

    if (application === null) {
        redirect("/dev/applications")
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <div className="md:border-r md:border-dark-700">
                <h4 className="text-lg">Client ID</h4>
                <code className="py-0.5 px-1 rounded bg-dark-900">{application.client_id}</code>
                <CopyButton className="text-sm mt-1" text={application.client_id} />
            </div>
            <ClientSecret application={application} />
        </div>
    )
}