'use server'
import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */
const prisma = new PrismaClient()
export default async function addDescription(prevState: any, formData: FormData) {
    try {
        const session = await verifySession()
        if (!session || !session.userID) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Admin Is Unauthorized'
            }
        }
        const admin = await prisma.admin.findUnique({
            where: {
                id: session.userID as string
            },
            include: {
                Description: true
            }
        })
        if (!admin) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Admin Is Exist'
            }
        }
        const description = formData.get('description') as string
        if (!description || description.trim() === '') {
            return {
                statusText: 'Bad Request',
                status: 400,
                message: 'Description is required'
            };
        }
        await prisma.description.create({
            data: {
                adminId: admin.id,
                description
            }
        })
        revalidatePath('/');
        return {
            statusText: 'SUCCESS',
            status: 200,
            message: 'Description Added Successfully'
        }

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