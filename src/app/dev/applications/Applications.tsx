import { auth, signIn } from "@/auth";
import { fetchApplicationsByUser } from "@/data/application";
import Application from "@/models/Application";
import Image from "next/image";
import Link from "next/link";

export async function Applications() {
    const session = await auth()

    if (!session) {
        return await signIn()
    }

    const result = await fetchApplicationsByUser(session)

    switch (result.status) {
        case "success":
            return <Loaded applications={result.applications} />
        default:
            throw new Error()
    }
}

function Loaded({ applications }: { applications: Application[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-3">
            {applications.map(application => {
                return (
                    <Link key={application.id} href={`/dev/applications/${application.id}`}
                        className={"block w-auto p-3 rounded text-center text-bright transition border border-dark-700 " +
                            "hover:bg-dark-700 hover:shadow-lg active:bg-dark-750"}>
                        <Image src={`${process.env.THAVYRA_API_URL}/applications/${application.id}/icon.png?size=128`} alt="Icon" width={128} height={128} className="mx-auto" />
                        <h4 className="mt-3">{application.name}</h4>
                    </Link>
                )
            })}
        </div>
    )
}

export function ApplicationsSkeleton() {
    return (
        <div>Loading applications...</div>
    )
}