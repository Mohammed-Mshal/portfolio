'use server'

import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditTechnology(prevState: any, formData: FormData) {
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
        const itemId = formData.get('itemId') as string
        if (!itemId) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Id Technology Is Missing'
            }
        }
        const technologyDetail = await prisma.technologies.findUnique({
            where: {
                id: itemId
            }
        })
        if (!technologyDetail) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Technology Not Is Found'
            }
        }
        const idExperience = formData.get('idExperience') as string
        const title = formData.get('title') as string
        const experienceDetails = await prisma.experience.findUnique({
            where: {
                id: idExperience ? idExperience : technologyDetail.experienceId as string
            }
        })
        if (!experienceDetails) {
            return {
                status: 400,
                statusText: 'ERROR',
                message: 'Experience Not Found'
            }
        }
        await prisma.technologies.update(
            {
                where: {
                    id: itemId
                },
                data: {
                    title: title,
                    experienceId: experienceDetails.id
                }
            })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Technology Updated Successfully'
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