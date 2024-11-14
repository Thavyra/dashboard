import ApplicationNav from "@/components/dashboard/dev/applications/sidebar/ApplicationNav";
import Link from "next/link";
import { ReactNode } from "react";

export default function ApplicationSidebar({ children, params }: { children: ReactNode, params: { id: string } }) {
    return (
        <>
            <Link href="/dashboard/dev/applications"
                className="block p-3 text-lg text-center transition text-bright hover:text-light">
                Back to Applications
            </Link>

            <ApplicationNav applicationId={params.id} />

            {children}
        </>
    )
}
