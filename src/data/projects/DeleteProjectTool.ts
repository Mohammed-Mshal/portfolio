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
export default async function DeleteProjectTool(prevState: any, formData: FormData): Promise<ResponseType> {
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
        const toolId = formData.get('itemId') as string
        if (!toolId || toolId.length === 0) {
            return {
                message: 'Id Project Is Required',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const toolInfo = await prisma.tool.findUnique({
            where: {
                id: toolId,
            }
        })
        if (!toolInfo) {
            return {
                message: 'Tool Is Not Found',
                status: 400,
                statusText: 'ERROR'
            }
        }
        await prisma.tool.delete({
            where: {
                id: toolId
            },
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Delete Link Is Complete',
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