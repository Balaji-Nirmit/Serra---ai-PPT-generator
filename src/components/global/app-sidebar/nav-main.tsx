'use client'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {

}
const NavMain = ({ items }: {
    items: {
        title: string
        url: string
        icon: React.FC<React.SVGProps<SVGSVGElement>>
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) => {
    const pathname = usePathname();
    return (
        <>
            <SidebarGroup className="p-0">
                <SidebarMenu>
                    {items.map((item, index) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild tooltip={item.title}
                                    className={`${pathname.includes(item.url) && 'bg-muted'}`}
                                >
                                    <Link href={item.url} className={`text-xl ${pathname.includes(item.url) && 'font-extrabold'}`}>
                                        <item.icon className="font-extrabold"/>
                                        <span className="font-extrabold">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </>
    )
}
export default NavMain;