'use client'

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useSlideStore } from "@/store/useSlideStore"
import { LayoutTemplate, Palette, Type, Sparkles } from "lucide-react"
import LayoutChooser from "./tabs/LayoutChooser"
import { ScrollArea } from "@/components/ui/scroll-area"
import ComponentType from "./tabs/ComponentType"
import ThemeChooser from "./tabs/ThemeChooser"
import { motion } from "framer-motion"

const EditorSidebar = () => {
    const { currentTheme } = useSlideStore()
    
    // Marshmallow Popover Style
    const popoverContentStyle = {
        backgroundColor: `${currentTheme.backgroundColor}ef`,
        color: currentTheme.accentColor,
        borderColor: `${currentTheme.accentColor}15`,
        borderRadius: '2.5rem',
        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2)',
    }

    return (
        <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-5">
            <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="rounded-full border-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] backdrop-blur-3xl p-2.5 flex flex-col items-center space-y-4"
                style={{
                    backgroundColor: `${currentTheme.backgroundColor}cc`,
                    borderColor: `${currentTheme.accentColor}10`,
                    color: currentTheme.accentColor
                }}
            >
                {/* Decorative Magic Top */}
                <div className="p-2 opacity-20">
                    <Sparkles className="w-4 h-4" />
                </div>

                <div className="w-8 h-px bg-current opacity-10" />

                {/* Tool 1: Layout */}
                <Popover>
                    <PopoverTrigger asChild>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button 
                                className="h-12 w-12 rounded-full hover:bg-current/5 transition-colors" 
                                variant="ghost" 
                                size="icon"
                            >
                                <LayoutTemplate className="w-5 h-5 stroke-[2.5]" />
                                <span className="sr-only">Choose Layout</span>
                            </Button>
                        </motion.div>
                    </PopoverTrigger>
                    <PopoverContent 
                        side="left" 
                        sideOffset={20} 
                        align="center" 
                        className="w-[480px] p-2 backdrop-blur-2xl border-2"
                        style={popoverContentStyle}
                    >
                        <div className="p-4">
                            <LayoutChooser />
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Tool 2: Component Type */}
                <Popover>
                    <PopoverTrigger asChild>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button 
                                className="h-12 w-12 rounded-full hover:bg-current/5 transition-colors" 
                                variant="ghost" 
                                size="icon"
                            >
                                <Type className="w-5 h-5 stroke-[2.5]" />
                                <span className="sr-only">Choose Type</span>
                            </Button>
                        </motion.div>
                    </PopoverTrigger>
                    <PopoverContent 
                        side="left" 
                        sideOffset={20} 
                        align="center" 
                        className="w-[480px] p-2 backdrop-blur-2xl border-2"
                        style={popoverContentStyle}
                    >
                        <div className="p-4">
                            <ComponentType />
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Tool 3: Styling */}
                <Popover>
                    <PopoverTrigger asChild>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button 
                                className="h-12 w-12 rounded-full hover:bg-current/5 transition-colors" 
                                variant="ghost" 
                                size="icon"
                            >
                                <Palette className="w-5 h-5 stroke-[2.5]" />
                                <span className="sr-only">Change Style</span>
                            </Button>
                        </motion.div>
                    </PopoverTrigger>
                    <PopoverContent 
                        side="left" 
                        sideOffset={20} 
                        align="center" 
                        className="w-80 p-2 backdrop-blur-2xl border-2"
                        style={popoverContentStyle}
                    >
                        <div className="p-4">
                            <ThemeChooser/>
                        </div>
                    </PopoverContent>
                </Popover>

                <div className="w-8 h-px bg-current opacity-10" />
                
                {/* Decorative Bottom */}
                <div className="pb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />
                </div>
            </motion.div>
        </div>
    )
}

export default EditorSidebar;