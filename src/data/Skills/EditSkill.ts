'use server'

import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditSkill(prevState: any, formData: FormData) {
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
        const idSkill = formData.get('itemId') as string
        if (!idSkill || idSkill.length === 0) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Id Category Is Not Valid'
            }
        }
        const skill = await prisma.skills.findUnique({
            where: {
                id: idSkill,
                adminId: admin.id,
            }
        })
        if (!skill) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Skill Is Not Exist'
            }
        }
        const titleSkill = formData.get('skillName') as string
        const skillCategoryId = formData.get('skillCategoryId') as string
        const categoryDetails = skillCategoryId && await prisma.categorySkill.findUnique({
            where: {
                id: skillCategoryId
            }
        })
        await prisma.skills.update({
            where: {
                id: idSkill,
                adminId: admin.id
            },
            data: {
                title: titleSkill && titleSkill.length > 0 ? titleSkill : skill.title,
                categorySkillId: categoryDetails && categoryDetails.id ? categoryDetails.id : skill.categorySkillId,
            }
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Category Is Updated'
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