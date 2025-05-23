'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function GetProjectTools() {
    try {
        const projectTools = await prisma.tool.findMany({
            where: {},
            include: {
                Projects: true
            }
        })
        return {
            status: 200,
            statusText: 'SUCCESS',
            data: {
                projectTools
            }
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