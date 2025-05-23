'use server'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export default async function GetSkills() {
    try {
        const skills = await prisma.skills.findMany({
            where: {},
            include:{
                CategorySkill:true
            }
        })
        return {
            status: 200,
            statusText: 'SUCCESS',
            data: {
                skills
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