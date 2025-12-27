import { getAllProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import Project from "@/components/global/Projects";
import { sampleProjects } from "@/lib/testing";
import { Projects } from "@/lib/types";

const DashboardPage=async()=>{
    const allProjects = await getAllProjects();
    // const sampleProject:Projects = sampleProjects;
    return (
        <>
        <div className="w-full flex flex-col relative gap-6 p-4">
            <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-start">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-semibold dark:text-primary-backdrop-blur-lg">Projects</h1> 
                    <p className="text-base font-normal dark:text-secondary">All of your work in one place</p>
                </div>
            </div>
            {/* {allProjects} */}
            {/* <NotFound/> */}
            {/* <Project projects={allProjects.data} /> */}
        </div>
        </>
    )
}
export default DashboardPage;