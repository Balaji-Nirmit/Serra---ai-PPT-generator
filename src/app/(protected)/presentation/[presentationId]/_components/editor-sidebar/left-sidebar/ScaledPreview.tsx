'use client'
import { Slide } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useSlideStore } from "@/store/useSlideStore"
import { MasterRecursiveComponent } from "../../editor/MasterRecursiveComponent"

type Props={
    slide:Slide 
    isActive:boolean 
    index: number
}
const ScaledPreview = ({slide,isActive,index}:Props)=>{
    const {currentTheme} = useSlideStore()
    const THUMBNAIL_WIDTH = '200px'; // Adjust this as needed
    const THUMBNAIL_HEIGHT = '112.5px';
    return (
        <div 
            style={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT }}
            className={cn(
                'relative rounded-lg ring-2', // Ensure ring appears correctly
                isActive ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-200 hover:ring-offset-2',
                'ring-offset-2 overflow-hidden'
            )}
        >
             <div className='absolute top-0 left-0 scale-[0.2] origin-top-left w-[500%] h-[500%] pointer-events-none rounded-lg'>
                 <div className="w-full h-full rounded-lg p-4"> 
                     <MasterRecursiveComponent 
                         slideId={slide.id}
                         content={slide.content}
                         onContentChange={()=>{}}
                         isPreview={true}
                         isEditable={false}
                     />
                 </div>
             </div>
        </div>
     )
}
export default ScaledPreview 