'use client'

import { Button } from "@/components/ui/button";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ArrowLeft, Sparkles, LayoutPanelTop, Palette, Zap, Globe } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeCard from "./ThemeCard";
import ThemePicker from "./ThemePicker";
import { themes, containerVariants, itemVariants } from "@/lib/constants";

const ThemePreview = () => {
    const params = useParams();
    const router = useRouter();
    const controls = useAnimation();
    const { currentTheme, setCurrentTheme, project } = useSlideStore();
    const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

    useEffect(() => {
        if (project?.slides) {
            redirect(`/presentation/${params.presentationId}`)
        }
    }, [project])

    useEffect(() => {
        controls.start('visible')
    }, [controls, selectedTheme])

    const applyTheme = (theme: Theme) => {
        setSelectedTheme(theme);
        setCurrentTheme(theme); 
    }

    // Dynamic High-End Card Content
    const leftCardContent = (
        <div className="space-y-8">
            <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40" style={{ color: selectedTheme.accentColor }}>Step 01</span>
                <h3 className="text-2xl font-bold tracking-tight" style={{ color: selectedTheme.accentColor }}>Identity.</h3>
            </div>
            <div className="p-6 rounded-[2rem] border border-white/10 backdrop-blur-md" style={{ backgroundColor: selectedTheme.accentColor + '08' }}>
                <ul className="space-y-4 text-xs font-bold uppercase tracking-widest opacity-70" style={{ color: selectedTheme.accentColor }}>
                    <li className="flex items-center gap-3"><Zap className="h-3 w-3" /> Visual Cohesion</li>
                    <li className="flex items-center gap-3"><Globe className="h-3 w-3" /> Global Scales</li>
                </ul>
            </div>
            <Button className="w-full h-14 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:brightness-110 active:scale-95" 
                    style={{ color: selectedTheme.fontColor, backgroundColor: selectedTheme.accentColor }}>
                Initialize
            </Button>
        </div>
    )

    const mainCardContent = (
        <div className="space-y-12">
            <div className="flex justify-between items-center px-4">
                <div className="h-px flex-grow bg-current opacity-10" style={{ color: selectedTheme.accentColor }} />
                <span className="px-4 text-[10px] font-black uppercase tracking-[0.5em] opacity-30" style={{ color: selectedTheme.accentColor }}>The Stage</span>
                <div className="h-px flex-grow bg-current opacity-10" style={{ color: selectedTheme.accentColor }} />
            </div>
            <div className="grid grid-cols-2 gap-8 px-4">
                <div className="space-y-3">
                   <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner">
                        <LayoutPanelTop className="h-5 w-5 opacity-50" style={{ color: selectedTheme.accentColor }} />
                   </div>
                   <p className="text-sm font-bold leading-relaxed" style={{ color: selectedTheme.accentColor }}>Modular Architecture</p>
                </div>
                <div className="space-y-3 text-right flex flex-col items-end">
                   <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner">
                        <Sparkles className="h-5 w-5 opacity-50" style={{ color: selectedTheme.accentColor }} />
                   </div>
                   <p className="text-sm font-bold leading-relaxed" style={{ color: selectedTheme.accentColor }}>Neural Refinement</p>
                </div>
            </div>
            <div className="bg-white/5 p-1 rounded-full border border-white/10 flex items-center overflow-hidden">
                <Button className="flex-1 h-12 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl" 
                        style={{ color: selectedTheme.fontColor, backgroundColor: selectedTheme.accentColor }}>
                    Primary Action
                </Button>
                <Button variant="ghost" className="flex-1 h-12 rounded-full text-[10px] font-black uppercase tracking-widest opacity-50" 
                        style={{ color: selectedTheme.accentColor }}>
                    Secondary
                </Button>
            </div>
        </div>
    )

    const rightCardContent = (
        <div className="space-y-6">
            <div className="rounded-[2rem] p-8 border border-white/10 backdrop-blur-xl" style={{ backgroundColor: selectedTheme.accentColor + '05' }}>
                <div className="flex flex-col gap-8">
                    {['Performance', 'Adaptive', 'Editorial'].map((t, i) => (
                        <div key={t} className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-30" style={{ color: selectedTheme.accentColor }}>0{i+1}</span>
                            <span className="text-sm font-bold" style={{ color: selectedTheme.accentColor }}>{t}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <div className="h-screen w-full flex overflow-hidden transition-all duration-1000 ease-in-out" 
             style={{ backgroundColor: selectedTheme.backgroundColor, color: selectedTheme.accentColor, fontFamily: selectedTheme.fontFamily }}>
            
            <div className="hidden sm:flex flex-col flex-grow relative overflow-hidden">
                {/* Immersive Background Mask */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden whitespace-nowrap opacity-[0.03]">
                    <h1 className="text-[25vw] font-black uppercase leading-none tracking-tighter" style={{ color: selectedTheme.accentColor }}>
                        {selectedTheme.name}
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="absolute top-0 left-0 w-full p-10 z-50 flex items-center justify-between pointer-events-none">
                    <Button 
                        variant="ghost" 
                        className="pointer-events-auto h-14 w-14 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl hover:bg-white/10 hover:scale-110 transition-all duration-500"
                        style={{ color: selectedTheme.accentColor }}
                        onClick={() => router.push('/create-page')}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <div className="pointer-events-auto flex items-center gap-4 bg-white/5 backdrop-blur-3xl px-8 py-3 rounded-full border border-white/10 shadow-2xl">
                        <Palette className="h-4 w-4 opacity-40" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">Theme Laboratory</span>
                    </div>
                </nav>

                {/* Main Visualization Stage */}
                <motion.div 
                    className="flex-grow flex flex-col items-center justify-center p-12 z-10"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="w-full max-w-6xl flex justify-center items-center relative perspective-[3000px]">
                        {/* 3D Transform Layer */}
                        <motion.div 
                            className="w-full flex justify-center items-center relative"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <ThemeCard title="Genesis" description="Standard" content={leftCardContent} variant="left" theme={selectedTheme} controls={controls} />
                            <ThemeCard title="Master" description="Core Visuals" content={mainCardContent} variant="main" theme={selectedTheme} controls={controls} />
                            <ThemeCard title="Specs" description="Details" content={rightCardContent} variant="right" theme={selectedTheme} controls={controls} />
                        </motion.div>
                    </div>

                    <footer className="mt-20 text-center space-y-2 opacity-40">
                        <p className="text-[10px] font-black uppercase tracking-[0.6em]">Powered by Apple Design Intelligence</p>
                    </footer>
                </motion.div>
                
                {/* Dynamic Light Diffusion */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-black/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
            </div>

            {/* Sidebar Controller */}
            <aside className="w-[420px] h-full border-l border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-[80px] z-[60] shadow-[-40px_0_80px_rgba(0,0,0,0.1)]">
                <ThemePicker selectedTheme={selectedTheme} themes={themes} onThemeSelect={applyTheme}/>
            </aside>
        </div>
    )
}

export default ThemePreview;