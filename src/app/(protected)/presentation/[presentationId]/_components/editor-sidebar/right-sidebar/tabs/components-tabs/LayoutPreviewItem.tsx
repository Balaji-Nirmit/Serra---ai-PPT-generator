import { Button } from "@/components/ui/button"
import { LayoutSlides } from "@/lib/types"
import { cn } from "@/lib/utils"
import React from "react"

type Props = {
    name: string
    Icon: React.FC
    onClick?: () => void
    isSelected?: boolean
    type: string
    component?: LayoutSlides
}
const LayoutPreviewItem = ({ name, Icon, onClick, isSelected, type, component }: Props) => {
    return (
        <>
            <div
            className={cn(
                "w-full transition-opacity duration-200",
                "cursor-grab active:cursor-grabbing",
            )}
        >
            <button
                onClick={onClick}
                className={cn(
                    'w-full flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 group focus:outline-none',
                    'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/80',
                    'border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md',
                    'active:scale-[0.98]', 
                    isSelected 
                        ? 'ring-2 ring-offset-2 ring-blue-500 ring-offset-white dark:ring-offset-gray-800' 
                        : 'hover:border-blue-400 dark:hover:border-blue-500' 
                )}
            >
                <div className="w-full aspect-[16/9] rounded-md border border-dashed border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 p-3 flex items-center justify-center transition-all duration-300">
                    <Icon />
                </div>
                <span className={cn(
                    "text-sm font-medium mt-1",
                    isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                )}>
                    {name}
                </span>

            </button>
        </div>
        </>
    )
}
export default LayoutPreviewItem 