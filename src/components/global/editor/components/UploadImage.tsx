type Props={
    contentId:string 
    onContentChange:(
        contentId:string,
        newContent: string | string[] | string[][]
    )=>void
}
const UploadImage = ({contentId,onContentChange }:Props) => {
    return (
        <>Upload Image</>
    )
}
export default UploadImage;