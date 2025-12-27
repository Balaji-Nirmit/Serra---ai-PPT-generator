export const dynamic = 'force-dynamic';
// why above because layout pages do not refresh unless they are told to
type Props = { children: React.ReactNode}
const Layout = async (props:Props)=>{
    // authentication and other logic can go here
    return (
        <>
        <div className="w-full min-h-screen">{props.children}</div>
        </>
    )
}
export default Layout; 