'use client'

import { Button } from "@/components/ui/button";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useAnimation } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeCard from "./ThemeCard";
import ThemePicker from "./ThemePicker";
import { themes } from "@/lib/constants";

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

    const leftCardContent = (
        <div className="space-y-4">
            <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: selectedTheme.accentColor }}>
                    Quick Start Guide
                    <ol className="list-decimal list-inside space-y-2" style={{ color: selectedTheme.accentColor }}>
                        <li>Choose a theme that fits your presentation style.</li>
                        <li>Customize colors and fonts to match your brand.</li>
                        <li>Add your content and images to the slides.</li>
                        <li>Review and finalize your presentation.</li>
                    </ol>
                </h3>
            </div>
            <Button className="w-full h-12 text-lg font-medium" style={{ color: selectedTheme.accentColor, backgroundColor: selectedTheme.accentColor }}>
                Get Started
            </Button>
        </div>
    )
    const mainCardContent = (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
                    <p style={{ color: selectedTheme.accentColor }}>
                        This is a smart layout: it acts as a text box
                    </p>
                </div>
                <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
                    <p style={{ color: selectedTheme.accentColor }}>You can get these by typing /smart</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                <Button className="h-12 p-6 text-lg font-medium" style={{ color: selectedTheme.fontColor, backgroundColor: selectedTheme.accentColor }}>
                    Primary Button
                </Button>
                <Button variant={'outline'} className="h-12 p-6 text-lg font-medium" style={{ color: selectedTheme.fontColor, backgroundColor: selectedTheme.accentColor }}>
                    Primary Button
                </Button>
            </div>
        </div>
    )

    const rightCardContent = (
        <div className="space-y-4">
            <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: selectedTheme.accentColor }}>
                    Theme Features
                    <ol className="list-decimal list-inside space-y-2" style={{ color: selectedTheme.accentColor }}>
                        <li>Responsive Design</li>
                        <li>Customizable Layouts</li>
                        <li>High-Quality Graphics</li>
                        <li>Easy Integration</li>
                    </ol>
                </h3>
            </div>
            <Button variant={'outline'} className="h-12 p-6 text-lg font-medium" style={{ color: selectedTheme.fontColor, backgroundColor: selectedTheme.accentColor }}>
                Explore Features
            </Button>
        </div>
    )

    const applyTheme = (theme: Theme) => {
        setSelectedTheme(theme);
        setCurrentTheme(theme); 
    }
    return (
        <div className="h-screen w-full flex" style={{ backgroundColor: selectedTheme.backgroundColor, color: selectedTheme.accentColor, fontFamily: selectedTheme.fontFamily }}>
            <div className="hidden sm:block flex-grow overflow-hidden">
                <div className="p-12 flex flex-col items-center min-h-screen">
                    <Button variant={"outline"} className="mb-12 self-start" size="lg"
                        style={{ color: selectedTheme.accentColor, borderColor: selectedTheme.accentColor + '20', backgroundColor: selectedTheme.accentColor + '10' }}
                        onClick={() => router.push('/create-page')}
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                    </Button>
                    <div className="w-full flex justify-center items-center relative flex-grow">
                        <ThemeCard title="Quick Start" description="Get up and running in no time" content={leftCardContent} variant="left" theme={selectedTheme} controls={controls} />
                        <ThemeCard title="Main Preview" description="Get up and running in no time" content={mainCardContent} variant="main" theme={selectedTheme} controls={controls} />
                        <ThemeCard title="Theme Features" description="Get up and running in no time" content={rightCardContent} variant="right" theme={selectedTheme} controls={controls} />
                    </div>
                </div>
            </div>
            <ThemePicker selectedTheme={selectedTheme} themes={themes} onThemeSelect={applyTheme}/>
        </div>
    )
}
export default ThemePreview;