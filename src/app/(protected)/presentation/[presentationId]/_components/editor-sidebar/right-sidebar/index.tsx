'use client'

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useSlideStore } from "@/store/useSlideStore"
import { LayoutTemplate, Palette, Type } from "lucide-react"
import LayoutChooser from "./tabs/LayoutChooser"
import { ScrollArea } from "@/components/ui/scroll-area"
import { component } from "@/lib/constants"
import ComponentType from "./tabs/ComponentType"
import ThemeChooser from "./tabs/ThemeChooser"

const EditorSidebar = () => {
    const { currentTheme } = useSlideStore()
    return (
        <>
            <div className="fixed top-1/2 right-0 tranform -translate-y-1/2 z-10">
                <div className="rounded-xl border-r-0 border border-background-70 shadow-lg p-2 flex flex-col items-center space-y-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="h-10 w-10 rounded-full" variant={'ghost'} size={'icon'}>
                                <LayoutTemplate className="w-5 h-5" />
                                <span className="sr-only">Choose Layout</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent side="left" align="center" className="w-[480px] p-0"
                            style={{
                                backgroundColor: currentTheme.backgroundColor,
                                color: currentTheme.fontColor
                            }}>
                            <LayoutChooser />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="h-10 w-10 rounded-full" variant={'ghost'} size={'icon'}>
                                <Type className="w-5 h-5" />
                                <span className="sr-only">Choose Type</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent side="left" align="center" className="w-[480px] p-0"
                            style={{
                                backgroundColor: currentTheme.backgroundColor,
                                color: currentTheme.fontColor
                            }}
                        >
                            <ComponentType />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="h-10 w-10 rounded-full" variant={'ghost'} size={'icon'}>
                                <Palette className="w-5 h-5" />
                                <span className="sr-only">Change Style</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent side="left" align="center" className="w-80">
                            <ThemeChooser/>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </>
    )
}
export default EditorSidebar