'use server'

import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditCategorySkills(prevState: any, formData: FormData) {
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
        const idCategory = formData.get('itemId') as string
        if (!idCategory || idCategory.length === 0) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Id Category Is Not Valid'
            }
        }
        const category = await prisma.categorySkill.findUnique({
            where: {
                id: idCategory,
                adminId: admin.id,
            }
        })
        if (!category) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Category Is Not Exist'
            }
        }
        const titleCategory = formData.get('categoryName') as string
        if (!titleCategory || titleCategory.length === 0) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Title Is Missing'
            }
        }
        await prisma.categorySkill.update({
            where: {
                id: category.id,
                adminId: admin.id,
            },
            data: {
                title: titleCategory,
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