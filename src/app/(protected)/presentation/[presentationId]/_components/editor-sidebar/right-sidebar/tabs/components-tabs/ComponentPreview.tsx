'use client'

import { ContentItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import React from "react"
import { useDrag } from "react-dnd"

type Props = {
    type: string
    componentType: string
    name: string
    component: ContentItem
    icon: string
}
const ComponentPreview = ({ item }: { item: Props }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "CONTENT_ITEM",
        item: item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })
    return (
        <>
            <div ref={drag as unknown as React.LegacyRef<HTMLDivElement>} className={cn(isDragging ? 'opacity-50' : 'opacity-100')}>
                <button className={cn(
                    'w-full flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 group focus:outline-none',
                    'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/80',
                    'border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md',
                    'active:scale-[0.98] hover:border-blue-400 dark:hover:border-blue-500'
                )}>
                    <div className="w-full aspect-[16/9] rounded-md border bg-gray-100 dark:bg-gray-700 p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center flex-col gap-2">
                            <span className="text-2xl text-primary">{item.icon}</span>
                        </div>
                    </div>
                    <span className="text-sm text-gray-500 font-medium dark:text-gray-300">
                        {item.name}
                    </span>
                </button>
            </div>
        </>
    )
}
export default ComponentPreview