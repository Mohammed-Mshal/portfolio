'use server'

import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CreateToolProject(prevState: any, formData: FormData) {
    try {
        const session = await verifySession()
        if (!session || typeof session.userID !== 'string') {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Unauthorized'
            }
        }
        const admin = await prisma.admin.findUnique({
            where: {
                id: session.userID
            }
        })
        if (!admin) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Admin Not Found'
            }
        }
        const titleTool = formData.get('titleTool') as string
        const projectId = formData.get('projectId') as string
        if (!titleTool || titleTool.length === 0 || !projectId || projectId.length === 0) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Missing Field'
            }
        }
        const projectDetail = await prisma.projects.findUnique({
            where: {
                id: projectId
            }
        })
        if (!projectDetail) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Category Not Found'
            }
        }
        await prisma.tool.create({
            data: {
                title: titleTool,
                projectsId: projectDetail.id,
                adminId: admin.id
            }
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Created Tool Is Completed'
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Database connection error:', error);

        if (error.code === 'P2021' || error.message.includes('No available servers')) {
            return {
                message: 'connection error. Please try again later.',
                status: 503,
                statusText: 'FAIL',
            };
        }

        return {
            message: 'An unexpected error occurred. Please try again later.',
            status: 500,
            statusText: 'FAIL',
        };
    }
    finally {
        await prisma.$disconnect()
    }
}