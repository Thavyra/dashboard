import SidebarNav from "@/components/dashboard/SidebarNav";
import SidebarNavLink from "@/components/dashboard/SidebarNavLink";

export default function ApplicationsSidebar() {
    return (
        <SidebarNav>
            <SidebarNavLink href="/dashboard/dev/applications" match="all">
                Applications
            </SidebarNavLink>
        </SidebarNav>
    )
}
