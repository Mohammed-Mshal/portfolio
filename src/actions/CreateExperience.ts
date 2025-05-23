'use server'

import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CreateExperience(prevState: any, formData: FormData) {
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
        const companyName = formData.get('companyName') as string
        const dateFrom = formData.get('dateFrom') && new Date(formData.get('dateFrom') as string)
        const dateTo = formData.get('dateTo') ? new Date(formData.get('dateTo') as string) : null
        const positionName = formData.get('positionName') as string
        const workplace = formData.get('workplace') as string
        const description = formData.get('description') as string
        const untilNow = formData.get('untilNow') as string
        if (!companyName || !dateFrom || dateFrom === null || !positionName || !workplace || !description) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Some Fields Is Missing'
            }
        }
        if (!untilNow || untilNow !== 'on') {
            if (!dateTo || dateTo === null) {
                return {
                    status: 400,
                    statusText: 'ERROR',
                    message: 'Some Fields Is Missing'
                }
            }
        }
        await prisma.experience.create({
            data: {
                companyName,
                dateFrom,
                dateTo: dateTo && dateTo !== null ? dateTo : new Date(Date.now()),
                untilNow: untilNow ? true : false,
                position: positionName,
                workplace,
                description,
            }
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Created Experience Is Completed'
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