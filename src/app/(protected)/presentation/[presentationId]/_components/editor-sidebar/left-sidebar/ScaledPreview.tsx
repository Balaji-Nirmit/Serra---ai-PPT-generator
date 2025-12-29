'use client'
import { Slide } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useSlideStore } from "@/store/useSlideStore"
import { motion } from "framer-motion"
import { MasterRecursiveComponent } from "../../editor/MasterRecursiveComponent"

type Props={
    slide: Slide 
    isActive: boolean 
    index: number
}

const ScaledPreview = ({ slide, isActive, index }: Props) => {
    const { currentTheme } = useSlideStore()
    
    // Apple Pro-Cute Proportions: 16:9 Aspect Ratio
    const THUMBNAIL_WIDTH = '210px'; 
    const THUMBNAIL_HEIGHT = '118px';

    return (
        <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT }}
            className={cn(
                'relative rounded-[1.5rem] transition-all duration-500 ease-in-out',
                'cursor-pointer select-none',
                isActive 
                    ? 'shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] z-10' 
                    : 'shadow-sm opacity-60 hover:opacity-100'
            )}
        >
            {/* The Outer Marshmallow Frame */}
            <div 
                className={cn(
                    'absolute inset-0 rounded-[1.5rem] border-[3px] transition-all duration-500',
                    isActive 
                        ? 'border-current scale-100' 
                        : 'border-transparent scale-95'
                )}
                style={{ color: currentTheme.accentColor }}
            />

            {/* The Internal Slide Canvas */}
            <div className='absolute inset-[4px] rounded-[1.2rem] overflow-hidden bg-white/5 backdrop-blur-sm'>
                <div 
                    className='absolute top-0 left-0 scale-[0.21] origin-top-left w-[480%] h-[480%] pointer-events-none'
                >
                    <div 
                        className="w-full h-full p-10"
                        style={{ backgroundColor: currentTheme.slideBackgroundColor || currentTheme.backgroundColor }}
                    > 
                        <MasterRecursiveComponent 
                            slideId={slide.id}
                            content={slide.content}
                            onContentChange={() => {}}
                            isPreview={true}
                            isEditable={false}
                        />
                    </div>
                </div>

                {/* Glassy Finish Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent rounded-[1.2rem]" />
            </div>

            {/* Active Indicator Bubble */}
            {isActive && (
                <motion.div 
                    layoutId="active-pill"
                    className="absolute -right-1 -top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: currentTheme.accentColor }}
                />
            )}
        </motion.div>
    )
}

export default ScaledPreview