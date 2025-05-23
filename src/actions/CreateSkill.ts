'use server'

import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CreateSkill(prevState: any, formData: FormData) {
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
        const titleSkill = formData.get('skillName') as string
        const skillCategoryId = formData.get('skillCategoryId') as string
        if (!titleSkill || titleSkill.length === 0 || !skillCategoryId || skillCategoryId.length === 0) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Some Fields Is Missing'
            }
        }
        const categoryDetails = await prisma.categorySkill.findUnique({
            where: {
                id: skillCategoryId
            }
        })
        if (!categoryDetails) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Category Not Found'
            }
        }
        await prisma.skills.create({
            data: {
                title: titleSkill,
                categorySkillId: categoryDetails.id,
                adminId: admin.id
            }
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Created Category Is Completed'
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