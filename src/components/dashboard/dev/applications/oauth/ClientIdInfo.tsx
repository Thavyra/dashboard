import Button from "@/components/Button";
import CopyButton from "@/components/CopyButton";
import Application from "@/models/Application";

export default function ClientIdInfo({ application }: { application: Application | null }) {
    return (
        <div className="basis-full md:basis-1/2 xl:basis-1/3 lg:border-r lg:border-dark-700">
            <h4 className="text-lg">Client ID</h4>
            <div className="font-mono">{application?.client_id}</div>
            {application?.client_id
                ? <CopyButton className="text-sm mt-1" text={application.client_id} />
                : <Button disabled className="text-sm mt-1">Copy</Button>
            }

        </div>
    )
}
