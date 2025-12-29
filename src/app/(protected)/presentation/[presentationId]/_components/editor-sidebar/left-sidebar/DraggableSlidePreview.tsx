'use client'

import { Slide } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useSlideStore } from "@/store/useSlideStore"
import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { motion, AnimatePresence } from "framer-motion"
import ScaledPreview from "./ScaledPreview"

type Props = {
    slide: Slide
    index: number 
    moveSlide: (dragIndex: number, hoverIndex: number) => void 
}

const DraggableSlidePreview = ({ slide, index, moveSlide }: Props) => {
    const { currentSlide, setCurrentSlide, currentTheme } = useSlideStore()
    const ref = useRef<HTMLDivElement>(null) 
    
    const [{ isDragging }, drag] = useDrag({
        type: 'SLIDE',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, drop] = useDrop({
        accept: 'SLIDE',
        hover(item: { index: number }) {
            if (!ref.current) return
            const dragIndex = item.index 
            const hoverIndex = index
            if (dragIndex === hoverIndex) return 
            moveSlide(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    // Binding the drag and drop refs
    drag(drop(ref))

    const isActive = index === currentSlide

    return (
        <motion.div
            ref={ref}
            layout // Framer Motion handles the reordering animation automatically
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
                opacity: isDragging ? 0.4 : 1, 
                scale: isDragging ? 1.05 : 1,
                rotate: isDragging ? -2 : 0, // Slight tilt when picked up
                zIndex: isDragging ? 50 : 1
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
                'relative cursor-grab active:cursor-grabbing group px-2',
                isDragging ? 'z-50' : 'z-0'
            )}
            onClick={() => setCurrentSlide(index)}
        >
            {/* Visual Indicator: The "Candy Bar" on the left */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-12 flex flex-col gap-1 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-1 h-1 rounded-full bg-current opacity-20" />
                 <div className="w-1 h-1 rounded-full bg-current opacity-20" />
                 <div className="w-1 h-1 rounded-full bg-current opacity-20" />
            </div>

            {/* Slide Number: Floating Glass Circle */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span 
                    className={cn(
                        "text-[10px] font-black transition-all duration-500",
                        isActive ? "opacity-100 scale-125" : "opacity-20 scale-100"
                    )}
                    style={{ color: currentTheme.accentColor }}
                >
                    {index + 1}
                </span>
            </div>

            {/* The Preview Component */}
            <div className={cn(
                "transition-transform duration-500",
                isActive ? "translate-x-1" : "hover:translate-x-1"
            )}>
                <ScaledPreview 
                    slide={slide} 
                    isActive={isActive} 
                    index={index} 
                />
            </div>

            {/* Subtle Drop Shadow Glow when dragging */}
            <AnimatePresence>
                {isDragging && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-current/5 blur-2xl rounded-[2rem] -z-10"
                        style={{ color: currentTheme.accentColor }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default DraggableSlidePreview;