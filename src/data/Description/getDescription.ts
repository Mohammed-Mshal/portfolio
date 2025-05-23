'use server'
import { Description, PrismaClient } from "@prisma/client"
interface ResponseType {
    status: number;
    statusText: string;
    message?: string;
    data?: {
        descriptions: Description[];
    };
}
const prisma = new PrismaClient()

export default async function GetDescription(): Promise<ResponseType> {
    try {

        const description = await prisma.description.findMany({
            where: {},
        })
        return {
            status: 200,
            statusText: 'SUCCESS',
            data: {
                descriptions: description
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