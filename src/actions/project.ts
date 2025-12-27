"use server"

import { db } from "@/db/drizzle"
import { projectsTable } from "@/db/schema"
import { OutlineCard } from "@/lib/types"
import { desc, eq } from "drizzle-orm"

export const getAllProjects = async () => {
    try{
        const projects = await db.select().from(projectsTable).orderBy(desc(projectsTable.updatedAt));
        if (projects.length==0){
            return {status: 404, error: "No projects found"}
        }
        return {status: 200, data: projects}
    }catch(error){
        return {status:500}
    }
}

export const getRecentProjects = async ()=>{
    try{
        const projects = await db.select().from(projectsTable).orderBy(desc(projectsTable.updatedAt)).limit(3);
        if (projects.length==0){
            return {status: 404, error: "No recent projects found"}
        }
        return {status: 200, data: projects}
    }catch(error){
        return {status:500}
    }
}

export const createProject = async(title:string,outlines:OutlineCard[])=>{
    try{
        if(!title || !outlines || outlines.length===0){
            return {status:400,error:"Title and outlines are required to create a project."}
        }
        const allOutlines = outlines.map((outline)=>outline.title)
        const project=await db.insert(projectsTable).values({
            userId:"a281763a-f6ec-4ea5-b788-03be56c51083",
            title:title,
            outlines:allOutlines,
        }).returning()
        return {status:200,data:project[0]}
    }catch(error){
        return {status:500,error:`Internal server error while creating project.`}
    }
}

export const getProjectById = async(projectId:string)=>{
    try{
        const project = await db.select().from(projectsTable).where(eq(projectsTable.id,projectId))
        if(!project){
            return {status:404,error:"Project not found."}
        }
        return {status:200,data:project[0]}
    }catch(error){
        return {status:500,error:"Internal server error while fetching project."}
    }
}

export const updateSlides=async(projectId:string,slides: any)=>{
    try{
        const updatedProject = await db.update(projectsTable).set({slides:slides}).where(eq(projectsTable.id,projectId)).returning()
        return {status:200,data:updatedProject}
    }catch(error){
        return { status: 500, error: "Internal server error while generating layouts.", data: [] }
    }
}

export const updateTheme = async (projectId:string,theme:string)=>{
    try{
        const updatedProject = await db.update(projectsTable).set({themeName:theme}).where(eq(projectsTable.id,projectId)).returning()
        return {status:200,data:updatedProject}
    }catch(error){
        return { status: 500, error: "Internal server error.", data: [] }
    }
}