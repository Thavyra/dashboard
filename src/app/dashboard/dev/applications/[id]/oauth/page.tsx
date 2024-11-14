import ClientDetails from "@/components/dashboard/dev/applications/oauth/ClientDetails";
import PermissionsInfo from "@/components/dashboard/dev/applications/oauth/PermissionsInfo";
import RedirectList from "@/components/dashboard/dev/applications/oauth/RedirectList";

export default function OAuthSettingsPage({ params }: { params: { id: string } }) {
    return (
        <>
            <h2 className="text-3xl font-light">OAuth Settings</h2>
            <hr className="border-dark-700 my-5" />

            <div className="flex flex-col gap-7">
                <div className="p-5 rounded border border-dark-700">
                    <ClientDetails applicationId={params.id} />
                </div>

                <div className="p-5 rounded border border-dark-700">
                    <RedirectList applicationId={params.id} />
                </div>


                <div className="p-5 rounded border border-dark-700">
                    <PermissionsInfo applicationId={params.id} />
                </div>
            </div>

        </>
    )
}
