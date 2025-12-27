import Image from "next/image"
import UploadImage from "./UploadImage"

type Props ={
    src:string 
    alt:string 
    className?:string 
    isPreview?:boolean 
    contentId:string 
    onContentChange:(
        contentId:string,
        newContent:string | string[] | string[][],
    )=>void
    isEditable?:boolean
}
const CustomImage=({src,alt,className,onContentChange,contentId,isEditable=true,isPreview=false}:Props)=>{

    return (<>
    <div className="w-full h-full relative group rounded-lg">
        {/* <Image src={src} alt={alt} width={isPreview?48:100} height={isPreview?48:800} className={`object-cover w-full h-full rounded-lg ${className }`}/> */}
        <img src={src} alt={alt} className={`object-cover w-full h-full rounded-lg ${className }`}/>

        {!isPreview && isEditable && (<div className="absolute top-0 left-0 hidden group-hover:block">
            <UploadImage onContentChange={onContentChange} contentId={contentId}/>
        </div>)}
    </div>
    </>)
}
export default CustomImage