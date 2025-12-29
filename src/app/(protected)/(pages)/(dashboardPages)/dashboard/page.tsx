import { getAllProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import Project from "@/components/global/Projects";
import { Button } from "@/components/ui/button";
import { sampleProjects } from "@/lib/testing";
import { Projects } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
    const allProjects = await getAllProjects();
    // const sampleProject:Projects = sampleProjects;
    return (
        <>
            <div className="w-full flex flex-col relative gap-6 p-4">
                <div className="group relative flex w-full items-center justify-center py-12">
                    {/* Ambient Background Glow */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500/20 to-blue-500/20 opacity-0 blur-2xl transition duration-1000 group-hover:opacity-100" />

                    <Link
                        href="/create-page"
                        className="relative flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:bg-zinc-800 hover:shadow-primary-500/20 hover:-translate-y-1 active:scale-95 dark:bg-white dark:text-zinc-950"
                    >
                        <span className="relative z-10">Start Building</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

                        {/* Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    </Link>
                </div>
                <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-start">
                    <div className="flex flex-col items-start">
                        <h1 className="text-3xl font-bold dark:text-primary-backdrop-blur-lg">Projects</h1>
                        <p className="text-xl font-semibold dark:text-secondary">All of your work in one place</p>
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