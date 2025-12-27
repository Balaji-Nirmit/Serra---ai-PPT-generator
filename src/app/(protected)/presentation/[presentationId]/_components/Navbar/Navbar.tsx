'use client'

import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/store/useSlideStore";
import { Download, Home, Play, Share2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import PresentationMode from "./PresentationMode";

type Props = {
    presentationId?: string;
}
const Navbar = ({
    presentationId
}: Props) => {
    const { currentTheme , project } = useSlideStore()
    const [isPresentationMode, setIsPresentationMode] = useState(false)
    const handleCopy=()=>{
        navigator.clipboard.writeText(`${window.location.origin}/share/${presentationId}`);
        toast.success('Success',{
            description:"Presentation link copied to clipboard"
        })
    }
    const [startExporting,setStartExporting] = useState(false)
    const exportToPPT = () =>{
        try{
            setStartExporting(true)
            // WORK IN PROGRESS
            toast.success('Success',{
                description:'Exported success.'
            })
        }catch(error){
            toast.error('Error',{
                description:'Failed to Download.'
            })
        }finally{
            setStartExporting(false)
        }
    }
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center px-7 py-4 border-b gap-8"
                style={{
                    backgroundColor: currentTheme.navbarColor || currentTheme.backgroundColor,
                    color: currentTheme.accentColor
                }}>
                <Link href={'/dashboard'} passHref>
                    <Button variant={'outline'} className="flex items-center gap-2" style={{ backgroundColor: currentTheme.backgroundColor }}>
                        <Home className="w-4 h-4" /> <span className="hidden sm:inline">Home</span>
                    </Button>
                </Link>
                <h3 className="text-lg font-semibold hidden sm:block truncate">{project?.title}</h3>
                <div className="flex items-center gap-4">
                    <Button style={{
                        backgroundColor:currentTheme.backgroundColor
                    }} variant={'outline'} onClick={handleCopy}>
                        <Share2Icon className="w-4 h-4"/>
                    </Button>
                    <Button variant={'outline'} className="flex items-center gap-2" onClick={()=>exportToPPT()}>
                        <Download className="w-4 h-4" /> <span className="hidden sm:inline">Download</span>
                    </Button>
                    <Button variant={'default'} className="flex items-center gap-2" onClick={()=>setIsPresentationMode(true)}>
                        <Play className="w-4 h-4" /> <span className="hidden sm:inline">Present</span>
                    </Button>
                </div>
                {isPresentationMode && <PresentationMode onClose={()=>setIsPresentationMode(false)}/>}
            </nav>
        </>
    )
}
export default Navbar;