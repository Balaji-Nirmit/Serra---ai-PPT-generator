import { Button } from "@/components/ui/button"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Projects } from "@/lib/types"
import Link from "next/link"
type Props = {
    recentProjects: Projects[]
}
const RecentOpen = ({ recentProjects }: Props) => {
    return (
        <>
            <SidebarGroup>
                <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
                <SidebarMenu>
                    {recentProjects.length > 0 ? (
                        recentProjects.map((item, index) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton asChild tooltip={item.title} className={`hover:bg-primary-80`}>
                                    <Button variant={'link'}
                                        className={`text-xs items-center justify-start`}
                                    >
                                        <Link href={`/presentation/${item.id}`}><span>{item.title}</span></Link>
                                    </Button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-xs text-secondary">
                            No recent projects
                        </div>
                    )}
                </SidebarMenu>
            </SidebarGroup>
        </>
    )
}
export default RecentOpen;