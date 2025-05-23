'use server'
import {  Experience, PrismaClient, Technologies } from "@prisma/client"
interface ResponseType {
    status: number;
    statusText: string;
    message?: string;
    data?: {
        experiences:({technologies: Technologies[]}&Experience)[];
    };
}
const prisma = new PrismaClient()

export default async function GetExperience(): Promise<ResponseType> {
    try {

        const experiences = await prisma.experience.findMany({
            where: {},
            include:{
                technologies:true
            }
        }
    )
        return {
            status: 200,
            statusText: 'SUCCESS',
            data: {
                experiences
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