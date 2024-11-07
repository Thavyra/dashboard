import ApplicationList from "@/components/dashboard/dev/applications/ApplicationList";
import CreateApplicationButton from "@/components/dashboard/dev/applications/create/CreateApplicationButton";

export default function Applications() {
    return (
        <>
            <div className="flex flex-row">
                <h2 className="font-light text-3xl">Applications</h2>
                <div className="relative grow">
                    <CreateApplicationButton className="absolute right-0 bottom-0" />
                </div>
            </div>

            <hr className="border-dark-700 my-5" />
            <ApplicationList />
        </>
    )
}