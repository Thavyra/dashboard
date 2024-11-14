import ApplicationInfo from "@/components/dashboard/dev/applications/details/ApplicationInfo";
import IconForm from "@/components/dashboard/dev/applications/details/IconForm";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <h2 className="text-3xl font-light">Details</h2>
            <hr className="border-dark-700 my-5" />

            <div className="lg:flex lg:flex-row">
                <div className="mb-3 mr-3">
                    <IconForm applicationId={params.id} />
                </div>

                <ApplicationInfo applicationId={params.id} />
            </div>
        </>
    )
}