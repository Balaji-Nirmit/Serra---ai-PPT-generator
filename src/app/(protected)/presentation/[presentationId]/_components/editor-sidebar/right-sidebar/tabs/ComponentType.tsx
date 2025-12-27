'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { component } from "@/lib/constants"
import { useSlideStore } from "@/store/useSlideStore"
import ComponentPreview from "./components-tabs/ComponentPreview"

const ComponentType = () => {
    const { currentTheme } = useSlideStore()
    return (
        <>
            <ScrollArea className="h-[400px]" style={{
                backgroundColor: currentTheme.slideBackgroundColor
            }}>
                <div className="p-4 flex flex-col space-y-6">
                    {
                        component.map((group, index) => (
                            <div
                                className="space-y-2"
                                key={index}
                            >
                                <h3 className="text-sm font-medium text-muted-foreground px-1">
                                    {group.name}
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {group.components.map((item) => (<ComponentPreview key={item.componentType} item={item} />))}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </ScrollArea>
        </>
    )
}
export default ComponentType;