import { getApplications } from "@/actions/applications"
import Link from "next/link"

export default async function ApplicationList() {
    const applications = await getApplications()

    return (
        <div className="columns-1 sm:columns-5 sm:gap-8">
            {applications.map(application => {
                return (
                    <Link key={application.id} href={`/dev/applications/${application.id}`} 
                    className="block w-auto rounded bg-dark-700 text-center  transition 
                    hover:bg-dark-600 hover:shadow-lg">
                        <h4>{application.name}</h4>
                    </Link>
                )
            })}
        </div>
    )
}