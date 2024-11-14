import ApplicationList from "@/components/dashboard/dev/applications/ApplicationList";
import CreateApplicationButton from "@/components/dashboard/dev/applications/create/CreateApplicationButton";

export default function Applications() {
    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row">
                <h2 className="font-light text-3xl text-center md:text-left">Applications</h2>
                <div className="md:relative md:grow">
                    <CreateApplicationButton className="w-full sm:w-auto mx-auto md:absolute md:right-0 md:bottom-0" />
                </div>
            </div>

            <hr className="border-dark-700 my-5" />
            <ApplicationList />
        </>
    )
}