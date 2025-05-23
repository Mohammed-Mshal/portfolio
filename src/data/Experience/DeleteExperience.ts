'use server'
import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface ResponseType {
    status: number | null;
    statusText: string;
    message: string;
}
const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DeleteExperience(prevState: any, formData: FormData): Promise<ResponseType> {
    try {
        const session = await verifySession()
        if (!session || !session.userID) {
            return {
                message: 'Unauthorize',
                status: 400,
                statusText: 'ERROR'
            }
        }
        if (typeof session.userID !== 'string') {
            return {
                message: 'Admin Id Is Not Valid',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const experienceId = formData.get('itemId') as string
        if (!experienceId || experienceId.length === 0) {
            return {
                message: 'Id Skill Is Required',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const experience = await prisma.experience.findUnique({
            where: {
                id: experienceId,
            }
        })
        if (!experience) {
            return {
                message: 'Experience Is Not Found',
                status: 400,
                statusText: 'ERROR'
            }
        }
        await prisma.technologies.deleteMany({
            where: {
                experienceId: experience.id
            }
        })
        await prisma.experience.delete({
            where: {
                id: experienceId,
            }
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Delete Experience Is Complete',
        }

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            statusText: 'FAIL',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        }
    } finally {
        await prisma.$disconnect()
    }
}