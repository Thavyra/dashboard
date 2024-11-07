import SidebarNav from "@/components/dashboard/SidebarNav";
import SidebarNavLink from "@/components/dashboard/SidebarNavLink";
import ApplicationSelector from "../ApplicationSelector";

export interface ApplicationNavProps {
    applicationId: string
}

export default function ApplicationNav({ applicationId }: ApplicationNavProps) {
    return (
        <>
            <div className="mt-3 mb-5">
                <ApplicationSelector currentApplication={applicationId} />
            </div>

            <SidebarNav>

                <SidebarNavLink href={`/dashboard/dev/applications/${applicationId}`} match="all">Details</SidebarNavLink>
                <SidebarNavLink href={`/dashboard/dev/applications/${applicationId}/oauth`} match="all">OAuth2</SidebarNavLink>
                <SidebarNavLink href={`/dashboard/dev/applications/${applicationId}/scoreboard`} match="all">Scoreboard</SidebarNavLink>

            </SidebarNav>
        </>

    )
}
