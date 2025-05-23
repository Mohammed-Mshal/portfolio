'use server'

import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditProjectTool(prevState: any, formData: FormData) {
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
        const idTool = formData.get('itemId') as string
        if (!idTool || idTool.length === 0) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Id Tool Is Not Valid'
            }
        }
        const tool = await prisma.tool.findUnique({
            where: {
                id: idTool,
                adminId: admin.id,
            }
        })
        if (!tool) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Tool Is Not Exist'
            }
        }
        const titleSkill = formData.get('titleTool') as string
        const projectId = formData.get('projectId') as string
        const projectDetails = await prisma.categorySkill.findUnique({
            where: {
                id: projectId
            }
        })
        await prisma.tool.update({
            where: {
                id: idTool,
                adminId: admin.id
            },
            data: {
                title: titleSkill,
                projectsId: projectDetails?.id
            }
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Tool Updated Successfully'
        }

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            statusText: 'FAIL',
            message: error instanceof Error ? error.message : 'An unexpected error occurred'
        }
    } finally {
        await prisma.$disconnect()
    }
}