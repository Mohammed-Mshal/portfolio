'use server'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export default async function GetCategorySkills() {
    try {
        const listCategory = await prisma.categorySkill.findMany({
            where: {},
            include: {
                listSkill: true
            }
        })
        return {
            status: 200,
            statusText: 'SUCCESS',
            data: {
                CategorySkills: listCategory
            }
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