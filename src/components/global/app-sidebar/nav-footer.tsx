'use client'

import { Button } from "@/components/ui/button";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

const NavFooter = () => {
    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
                        <div className="felx flex-col items-start p-2 pb-3 gap-4 bg-background-80">
                            <div className="flex flex-col items-start gap-1">
                                <p className="text-base font-bold">Get <span className="text-vivids">Creative AI</span></p>
                                <span className="text-sm dark:text-secondary">Unlock all features of the AI</span>
                            </div>
                            <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                                <Button className="w-full border-vivid bg-background-80 hover:bg-background-90 text-primary rounded-full font-bold">Upgrade</Button>
                            </div>
                        </div>
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        </>
    );
}
export default NavFooter;