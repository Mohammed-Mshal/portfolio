'use server'

import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CreateTechnology(prevState: any, formData: FormData) {
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
        const idExperience = formData.get('idExperience') as string
        const title = formData.get('title') as string
        if (!title || title.length === 0 || !title || title.length === 0) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Some Fields Is Missing'
            }
        }
        const experienceDetails = await prisma.experience.findUnique({
            where: {
                id: idExperience
            }
        })
        if (!experienceDetails) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Experience Not Found'
            }
        }
        await prisma.technologies.create({
            data: {
                title: title,
                experienceId:idExperience
            }
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Technology Created Successfully'
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