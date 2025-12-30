'use client'

import { cn } from "@/lib/utils"
import { useSlideStore } from "@/store/useSlideStore"
import React, { KeyboardEvent, useCallback } from "react"
import { ChevronRight, Play, ArrowRight, Star, Aperture, Cpu, Compass, RefreshCcw, GitPullRequest, ArrowDown, Share2, Milestone } from "lucide-react"

type ListProps = {
    items: string[]
    onChange: (newItems: string[]) => void
    className?: string
    isEditable?: boolean
}

type ListItemProps = {
    item: string
    index: number
    onChange: (index: number, value: string) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void
    isEditable: boolean
    fontColor: string
}

const ListItem: React.FC<ListItemProps> = ({ item, index, onChange, onKeyDown, fontColor, isEditable }) => (
    <input type="text"
        value={item}
        onChange={(e) => onChange(index, e.target.value)}
        onKeyDown={(e) => onKeyDown(e, index)}
        className="bg-transparent outline-none w-full py-1"
        style={{ color: fontColor }}
        readOnly={!isEditable}
    />
)

/**
 * SHARED LOGIC FOR ALL LIST TYPES
 */
const useListHandlers = (items: string[], onChange: (newItems: string[]) => void, isEditable: boolean) => {
    const handleChange = useCallback((index: number, value: string) => {
        if (isEditable) {
            const newItems = [...items]
            newItems[index] = value
            onChange(newItems)
        }
    }, [items, onChange, isEditable])

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const newItems = [...items]
            newItems.splice(index + 1, 0, '')
            onChange(newItems)
            setTimeout(() => {
                const inputs = document.querySelectorAll('input[type="text"]')
                const nextInput = inputs[index + 1] as HTMLInputElement
                if (nextInput) nextInput.focus()
            }, 0)
        } else if (e.key === 'Backspace' && items[index] === "" && items.length > 1) {
            e.preventDefault()
            const newItems = [...items]
            newItems.splice(index, 1)
            onChange(newItems)
            setTimeout(() => {
                const inputs = document.querySelectorAll('input[type="text"]')
                const prevInput = inputs[index - 1] as HTMLInputElement
                if (prevInput) prevInput.focus()
            }, 0)
        }
    }, [items, onChange])

    return { handleChange, handleKeyDown }
}

/* -------------------------------------------------------------------------- */
/* ORIGINAL LIST TYPES                             */
/* -------------------------------------------------------------------------- */

export const NumberedList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)
    return (
        <ol className={cn('list-decimal list-inside space-y-1', className)} style={{ color: currentTheme.fontColor }}>
            {items.map((item, index) => (
                <li key={index}>
                    <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                </li>
            ))}
        </ol>
    )
}

export const BulletList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)
    return (
        <ul className={cn('list-disc pl-5 space-y-1', className)} style={{ color: currentTheme.fontColor }}>
            {items.map((item, index) => (
                <li key={index}>
                    <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                </li>
            ))}
        </ul>
    )
}

export const TodoList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleKeyDown } = useListHandlers(items, onChange, isEditable)

    const toggleCheckbox = (index: number) => {
        const newItems = [...items]
        newItems[index] = newItems[index].startsWith('[x] ') ? newItems[index].replace('[x] ', '[ ] ') : newItems[index].replace('[ ] ', '[x] ')
        onChange(newItems)
    }

    return (
        <ul className={cn('space-y-1', className)} style={{ color: currentTheme.fontColor }}>
            {items.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                    <input type="checkbox" checked={item.startsWith('[x] ')} onChange={() => toggleCheckbox(index)} className="form-checkbox" disabled={!isEditable} />
                    <ListItem
                        item={item.replace(/^\[[ x]\] /, '')}
                        index={index}
                        onChange={(idx, val) => {
                            const prefix = item.startsWith('[x] ') ? '[x] ' : '[ ] '
                            const newItems = [...items]
                            newItems[idx] = `${prefix}${val}`
                            onChange(newItems)
                        }}
                        onKeyDown={handleKeyDown}
                        isEditable={isEditable}
                        fontColor={currentTheme.fontColor}
                    />
                </li>
            ))}
        </ul>
    )
}

/* -------------------------------------------------------------------------- */
/* DESIGNER LIST TYPES                             */
/* -------------------------------------------------------------------------- */

export const ArrowList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)
    return (
        <ul className={cn('space-y-3', className)}>
            {items.map((item, index) => (
                <li key={index} className="flex items-center group">
                    <ArrowRight className="w-5 h-5 mr-3 shrink-0" style={{ color: currentTheme.fontColor }} />
                    <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                </li>
            ))}
        </ul>
    )
}

export const StepList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)
    return (
        <div className={cn('space-y-6 relative border-l-2 ml-4 pl-8', className)} style={{ borderColor: `${currentTheme.fontColor}44` }}>
            {items.map((item, index) => (
                <div key={index} className="relative">
                    <div className="absolute -left-[43px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-background" style={{ color: currentTheme.fontColor, borderColor: currentTheme.fontColor }}>
                        {index + 1}
                    </div>
                    <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                </div>
            ))}
        </div>
    )
}

export const PyramidList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)
    return (
        <div className={cn('flex flex-col items-center space-y-2', className)}>
            {items.map((item, index) => (
                <div key={index} className="px-6 py-2 rounded-md border text-center transition-all" style={{ width: `${40 + (index * 15)}%`, maxWidth: '100%', borderColor: `${currentTheme.fontColor}66`, backgroundColor: `${currentTheme.fontColor}11` }}>
                    <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                </div>
            ))}
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/* INFOGRAPHIC-STYLE LISTS                                                    */
/* -------------------------------------------------------------------------- */

export const CardFormList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)

    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col p-4 rounded-lg shadow-md border-t-4 transition-all hover:shadow-lg"
                    style={{ borderColor: currentTheme.fontColor, backgroundColor: `${currentTheme.fontColor}05` }}
                >
                    <div className="text-lg font-semibold mb-2" style={{ color: currentTheme.fontColor }}>
                        {index + 1}.
                    </div>
                    <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                </div>
            ))}
        </div>
    )
}

// export const HighlightList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
//     const { currentTheme } = useSlideStore()
//     const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)

//     return (
//         <ul className={cn('space-y-4', className)}>
//             {items.map((item, index) => (
//                 <li key={index} className="flex items-center group">
//                     <div className="w-2 h-6 mr-4 rounded-sm transition-all group-hover:h-8" style={{ backgroundColor: currentTheme.fontColor }}></div>
//                     <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
//                 </li>
//             ))}
//         </ul>
//     )
// }

export const ZigZagList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)

    return (
        <div className={cn('relative py-4', className)}>
            {items.map((item, index) => (
                <div key={index} className={cn(
                    'flex items-center w-full my-4',
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                )}>
                    <div
                        className={cn(
                            'relative w-1/2 p-4 rounded-lg shadow-sm group border',
                            index % 2 === 0 ? 'mr-auto text-left' : 'ml-auto text-right'
                        )}
                        style={{ borderColor: currentTheme.fontColor, backgroundColor: `${currentTheme.fontColor}05` }}
                    >
                        <span className="absolute -top-3 px-2 rounded-full text-xs font-bold" style={{ backgroundColor: currentTheme.fontColor, color: currentTheme.backgroundColor }}>
                            Step {index + 1}
                        </span>
                        <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                        {index < items.length - 1 && (
                            <div
                                className={cn(
                                    'absolute w-8 h-8 rounded-full flex items-center justify-center -bottom-10 border-2',
                                    index % 2 === 0 ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2',
                                    'z-10 bg-background'
                                )}
                                style={{ borderColor: currentTheme.fontColor }}
                            >
                                <ArrowRight className="w-4 h-4" style={{ color: currentTheme.fontColor }} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export const ConnectorList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)

    return (
        <div className={cn('space-y-8 relative', className)}>
            {items.map((item, index) => (
                <div key={index} className="flex items-start group">
                    <div className="flex flex-col items-center mr-6 shrink-0">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all group-hover:scale-110"
                            style={{ backgroundColor: currentTheme.fontColor, color: currentTheme.backgroundColor, borderColor: currentTheme.fontColor }}>
                            {index + 1}
                        </div>
                        {index < items.length - 1 && (
                            <div className="w-0.5 h-12 my-1" style={{ backgroundColor: `${currentTheme.fontColor}66` }}></div>
                        )}
                    </div>
                    <div className="flex-1 pt-1"> {/* Aligns ListItem content vertically */}
                        <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export const HighlightList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)

    return (
        <div className={cn('flex flex-wrap gap-4 justify-center', className)}>
            {items.map((item, index) => (
                <div key={index} 
                    className="px-6 py-3 rounded-full border-2 flex items-center gap-2 transition-all hover:rotate-2"
                    style={{ 
                        borderColor: currentTheme.fontColor, 
                        backgroundColor: `${currentTheme.fontColor}10`,
                        boxShadow: `4px 4px 0px ${currentTheme.fontColor}`
                    }}
                >
                    <Star size={14} style={{ color: currentTheme.fontColor }} fill={currentTheme.fontColor} />
                    <div className="min-w-[80px]">
                        <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export const NeonTimeline: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)

    return (
        <div className={cn('relative pl-10 space-y-8', className)}>
            <div className="absolute left-4 top-2 bottom-2 w-0.5" style={{ background: `linear-gradient(to bottom, ${currentTheme.fontColor}, transparent)` }} />
            {items.map((item, index) => (
                <div key={index} className="relative group">
                    <div className="absolute -left-[34px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 bg-background z-10 transition-transform group-hover:scale-125"
                         style={{ borderColor: currentTheme.fontColor }} />
                    <div className="p-4 rounded-r-3xl rounded-bl-3xl border-l-4 transition-all"
                         style={{ backgroundColor: `${currentTheme.fontColor}05`, borderLeftColor: currentTheme.fontColor }}>
                        <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export const ZigZagTimelineList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)

    return (
        <div className={cn('relative max-w-4xl mx-auto py-10', className)}>
            {/* Central Spine */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 opacity-20" 
                 style={{ backgroundColor: currentTheme.fontColor }} />

            {items.map((item, index) => {
                const isEven = index % 2 === 0
                return (
                    <div key={index} className={cn(
                        'relative flex items-center mb-12 w-full',
                        isEven ? 'flex-row' : 'flex-row-reverse'
                    )}>
                        {/* Content Card */}
                        <div className={cn('w-[45%] group', isEven ? 'text-right pr-8' : 'text-left pl-8')}>
                            <div className="inline-block p-4 rounded-2xl border-2 transition-transform hover:scale-105 shadow-xl bg-background"
                                 style={{ borderColor: currentTheme.fontColor }}>
                                <div className="text-xs font-black uppercase tracking-tighter mb-1" style={{ color: currentTheme.fontColor }}>
                                    Phase {String(index + 1).padStart(2, '0')}
                                </div>
                                <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                            </div>
                        </div>

                        {/* Central Node */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 flex items-center justify-center bg-background z-10"
                             style={{ borderColor: currentTheme.fontColor, color: currentTheme.fontColor }}>
                            <Milestone size={18} />
                        </div>

                        {/* Spacer for layout */}
                        <div className="w-[45%]" />
                    </div>
                )
            })}
        </div>
    )
}

export const FlowchartList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)

    return (
        <div className={cn('flex flex-wrap items-center justify-center gap-y-8 gap-x-2 md:gap-x-4 p-4', className)}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {/* Horizontal Flow Node */}
                    <div className="relative group min-w-[200px] max-w-[280px] flex-shrink-0">
                        <div className="flex items-center p-4 rounded-xl border-t-[6px] shadow-lg transition-all group-hover:-translate-y-1 bg-background"
                             style={{ 
                                borderColor: currentTheme.fontColor, 
                                backgroundColor: `${currentTheme.fontColor}08` 
                             }}>
                            <div className="shrink-0 mr-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" 
                                     style={{ backgroundColor: currentTheme.fontColor, color: currentTheme.backgroundColor }}>
                                    {index + 1}
                                </div>
                            </div>
                            <div className="flex-1">
                                <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                            </div>
                        </div>
                    </div>

                    {/* Adaptive Arrow Connector */}
                    {index < items.length - 1 && (
                        <div className="flex items-center justify-center opacity-40" style={{ color: currentTheme.fontColor }}>
                            {/* Arrow points Right on desktop, becomes a spacer/break hint on small screens */}
                            <ArrowRight size={24} strokeWidth={3} className="hidden md:block animate-pulse-horizontal" />
                            <ArrowDown size={24} strokeWidth={3} className="block md:hidden animate-bounce" />
                        </div>
                    )}
                </React.Fragment>
            ))}
            
            {/* Terminal Node - Responsive Wrap */}
            <div className="flex-shrink-0 mt-2 md:mt-0 px-6 py-2 rounded-full border-2 border-dashed flex items-center gap-2 opacity-60"
                 style={{ borderColor: currentTheme.fontColor, color: currentTheme.fontColor }}>
                <GitPullRequest size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">End Process</span>
            </div>
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/* RADIAL & CIRCULAR INFOGRAPHIC LISTS                                         */
/* -------------------------------------------------------------------------- */

// 1. Circular List (Max 6 Items) - Core with satellite items
export const CircularList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)
    
    // Constraint: Max 6 items
    const limitedItems = items.slice(0, 6)
    const radius = 160 // Distance from center

    return (
        <div className={cn('relative w-[450px] h-[450px] flex items-center justify-center mx-auto', className)}>
            {/* Center Hub */}
            <div className="absolute w-24 h-24 rounded-full flex items-center justify-center shadow-xl border-4 z-20 bg-background"
                 style={{ borderColor: currentTheme.fontColor, color: currentTheme.fontColor }}>
                <Aperture size={40} className="animate-spin-slow" />
            </div>

            {/* Satellite Items */}
            {limitedItems.map((item, index) => {
                const angle = (index * (360 / limitedItems.length)) - 90
                const x = radius * Math.cos(angle * (Math.PI / 180))
                const y = radius * Math.sin(angle * (Math.PI / 180))

                return (
                    <div key={index} className="absolute transition-all duration-500 flex flex-col items-center"
                         style={{ transform: `translate(${x}px, ${y}px)` }}>
                        <div className="w-32 p-2 rounded-xl border-2 backdrop-blur-sm bg-background/80 shadow-lg group hover:scale-110"
                             style={{ borderColor: `${currentTheme.fontColor}44` }}>
                            <div className="w-6 h-6 -mt-5 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold shadow-md"
                                 style={{ backgroundColor: currentTheme.fontColor, color: currentTheme.backgroundColor }}>
                                {index + 1}
                            </div>
                            <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                        </div>
                        {/* Connector Line */}
                        <div className="absolute top-1/2 left-1/2 -z-10 h-0.5 origin-left"
                             style={{ 
                                width: `${radius}px`, 
                                background: `linear-gradient(to right, ${currentTheme.fontColor}88, transparent)`,
                                transform: `rotate(${angle + 180}deg) translate(0, -50%)`,
                                left: '50%'
                             }} />
                    </div>
                )
            })}
        </div>
    )
}

export const SegmentedPieList: React.FC<ListProps> = ({ items, onChange, className, isEditable = true }) => {
    const { currentTheme } = useSlideStore()
    const { handleChange, handleKeyDown } = useListHandlers(items, onChange, isEditable)
    const limitedItems = items.slice(0, 6)

    return (
        <div className={cn('relative w-96 h-96 mx-auto flex items-center justify-center', className)}>
            <div className="absolute inset-0 rounded-full border-[30px] opacity-10" style={{ borderColor: currentTheme.fontColor }} />
            {limitedItems.map((item, index) => {
                const angle = (index * (360 / limitedItems.length))
                return (
                    <div key={index} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${angle}deg)` }}>
                        <div className="h-full w-1 opacity-40" style={{ backgroundColor: currentTheme.backgroundColor }} />
                        <div className="absolute top-0 -translate-y-8 flex flex-col items-center" style={{ transform: `rotate(-${angle}deg)` }}>
                            <div className="px-4 py-2 rounded-lg border-2 bg-background shadow-lg min-w-[120px]" style={{ borderColor: currentTheme.fontColor }}>
                                <ListItem item={item} index={index} onChange={handleChange} onKeyDown={handleKeyDown} isEditable={isEditable} fontColor={currentTheme.fontColor} />
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="z-10 text-center flex flex-col items-center">
                <Cpu size={32} style={{ color: currentTheme.fontColor }} className="animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest mt-1" style={{ color: currentTheme.fontColor }}>Core</span>
            </div>
        </div>
    )
}
export default NumberedList