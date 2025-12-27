import { getRecentProjects } from "@/actions/project";
import AppSidebar from "@/components/global/app-sidebar";
import UpperInfoBar from "@/components/global/upper-info-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = { children: React.ReactNode }
const Layout = async ({ children }: Props) => {
    const recentProjects = await getRecentProjects();
    // check authentications and redirect to signin

    return (
        <>
            <SidebarProvider>
                <AppSidebar user="user" recentProjects={recentProjects.data || []} />
                <SidebarInset>
                    <UpperInfoBar user="user" />
                    <div className="p-4">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
export default Layout; 