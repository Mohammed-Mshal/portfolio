'use server'

import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditExperience(prevState: any, formData: FormData) {
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
        const dateFrom = formData.get('dateFrom') ?new Date(formData.get('dateFrom') as string):null
        const dateTo = formData.get('dateTo')?new Date(formData.get('dateTo') as string):null
        const positionName = formData.get('positionName') as string
        const workplace = formData.get('workplace') as string
        const description = formData.get('description') as string
        const untilNow = formData.get('untilNow') as string
        const itemId = formData.get('itemId') as string
        const experience = await prisma.experience.findUnique({
            where: {
                id: itemId,
            }
        })
        if (!experience) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Experience Is Not Exist'
            }
        }
        await prisma.experience.update({
            where: {
                id: itemId,
            },
            data: {
                companyName:companyName?companyName:experience.companyName,
                dateFrom:dateFrom?dateFrom:experience.dateFrom,
                dateTo:untilNow?new Date(Date.now()):dateTo?dateTo:experience.dateTo,
                untilNow:untilNow?true:false,
                position:positionName?positionName:experience.position,
                workplace:workplace?workplace:experience.workplace,
                description:description?description:experience.description,
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