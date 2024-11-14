import Application from "@/models/Application";
import Image from "next/image";
import Link from "next/link";

export default function ApplicationListItem({ application }: { application: Application }) {
    return (
        <Link href={`/dashboard/dev/applications/${application.id}`}
            className="block p-3 rounded border border-dark-700 text-center text-bright transition hover:bg-dark-700 hover:shadow-lg active:bg-dark-750">
                <Image src={`/application_icons/${application.id}`} alt={`${application.name} Icon`} 
                width={500} height={500} className="rounded-full w-32 h-32 mx-auto" />
                <h4 className="mt-3">{application.name}</h4>
        </Link>
    )
}