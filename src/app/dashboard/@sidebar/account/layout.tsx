import SidebarNav from "@/components/dashboard/SidebarNav";
import SidebarNavLink from "@/components/dashboard/SidebarNavLink";

export default function Layout() {
    return (
        <SidebarNav>
            <SidebarNavLink href="/dashboard/account" match="all">
                Profile
            </SidebarNavLink>
            <SidebarNavLink href="/dashboard/account/logins" match="all">
                Logins
            </SidebarNavLink>
            <SidebarNavLink href="/dashboard/account/transactions" match="all">
                Transactions
            </SidebarNavLink>
            <SidebarNavLink href="/dashboard/account/connections" match="all">
                Connections
            </SidebarNavLink>
        </SidebarNav>
    )
}